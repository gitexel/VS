import React from 'react';
import {
  StyleProvider,
  Footer,
  FooterTab,
  Button,
  Container,
  Text,
  Icon,
  Header,
  Body,
  Title,
} from 'native-base';
import SmsAndroid from 'react-native-get-sms-android';

import getTheme from '../../../native-base-theme/components';
import custom from '../../../native-base-theme/variables/custom';
import HomeTab from './homeTab';
import ProfileTab from './profileTab';
import NotificationTab from './notificationsTab';
import VehicleTab from './vehicleTab';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {PermissionsAndroid, Alert} from 'react-native';

export default class Hub extends React.Component {
  static navigationOptions = {
    title: '',
    headerShown: false,
  };

  constructor(props) {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });

    const {currentUser} = auth();

    super(props);
    this.state = {
      currentUser,
      selectedTab: 'home',
      user_doc: {},
      user_id: '',
      vehicle_id: '',
      notification_items: [],
      location: {},
      gps: true,
      steal: true,
      shock: true,
      tire: true,
      lock: true,
      emergency: true,
    };
  }

  async componentDidMount() {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'Send SMS',
          message: 'Need access to send sms',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('SEND_SMS permissions granted', granted);
      } else {
        Alert.alert('SEND_SMS permissions denied');
        console.log('SEND_SMS permissions denied');
      }
    } catch (err) {
      Alert.alert(err);
    }
    firestore()
      .collection('users')
      .doc(this.state.currentUser.uid)
      .get()
      .then(
        function (doc) {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            this.setState({user_doc: doc.data()});
            this.setState({notification_items: doc.data().notifications});

            this.setState({vehicle_id: doc.data().car.id});
            database()
              .ref('/' + this.state.vehicle_id + '/sensors/')
              .on('value', (snapshot) => {
                let sensors_data = snapshot.val();
                console.log('sensors data: ', sensors_data);
                this.onSensorsChangeNotification(sensors_data);
              });
            database()
              .ref('/' + this.state.vehicle_id + '/location/')
              .on('value', (snapshot) => {
                let location_data = snapshot.val();
                this.setState({location: location_data});

                console.log('location data: ', location_data);
                this.onLocationChangeNotification(location_data);
              });
          } else {
            console.log('No such document!');
          }
        }.bind(this),
      )
      .catch(function (error) {
        console.log('Error getting document:', error);
      });

    firestore()
      .collection('users')
      .doc(this.state.currentUser.uid)
      .onSnapshot((doc) => {
        console.log('User data: ', doc.data());
        this.setState({gps: doc.data().car.gps});
        this.setState({steal: doc.data().car.steal});
        this.setState({shock: doc.data().car.shock});
        this.setState({tire: doc.data().car.tire});
        this.setState({lock: doc.data().car.lock});
        this.setState({emergency: doc.data().car.emergency});
        this.setState({emergency_number: doc.data().car.emergency_number});
        this.setState({vehicle_id: doc.data().car.id});
      });
  }
  SyncNotificationFirebase = () => {
    firestore()
      .collection('users')
      .doc(this.state.currentUser.uid)
      .get()
      .then(
        function (doc) {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            this.setState({notification_items: doc.data().notifications});
          } else {
            console.log('No such document!');
          }
        }.bind(this),
      )
      .catch(function (error) {
        console.log('Error getting document:', error);
      });

    firestore()
      .collection('users')
      .doc(this.state.currentUser.uid)
      .update({
        notifications: this.state.notification_items,
      })
      .then(() => {
        console.log('Notifications updated!');
      });
  };

  appendNotification = (content) => {
    this.setState({
      notification_items: this.state.notification_items.concat({
        id: this.random_id(),
        content: content,
      }),
    });
    this.SyncNotificationFirebase();
  };

  onLocationChangeNotification = (location) => {
    this.appendNotification('Location Changed!');
    PushNotification.localNotification({
      title: 'Location Notification', // (optional)
      message: 'Location Changed !', // (required)
    });
  };
  send_sms_message = () => {
    SmsAndroid.autoSend(
      this.state.user_doc.car.emergency_number,
      `Car accident happen to your friend at location: https://www.google.com/maps/search/?api=1&query=${this.state.location.latitude},${this.state.location.longitude}`,
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (success) => {
        console.log('SMS sent successfully');
      },
    );
  };
  onSensorsChangeNotification = (sensors) => {
    if (sensors != null) {
      let sensors_str = sensors.replace(/\s/g, '').trim();
      if (sensors_str.length >= 4) {
        if (sensors_str[0] === '1' && this.state.steal) {
          PushNotification.localNotification({
            title: 'Sensors Notification', // (optional)
            message: 'Car steal alert!', // (required)
          });
          this.appendNotification('Car steal alert!');
        }
        if (sensors_str[1] === '1' && this.state.shock) {
          PushNotification.localNotification({
            title: 'Sensors Notification', // (optional)
            message: 'Car Accident!', // (required)
          });
          this.appendNotification('Car Accident!');
          if (this.state.emergency) {
            this.send_sms_message();
          }
        }
        if (sensors_str[2] === '1' && this.state.lock) {
          PushNotification.localNotification({
            title: 'Sensors Notification', // (optional)
            message: 'Car Door Opened!', // (required)
          });
          this.appendNotification('Car Door Opened!');
        }
        if (sensors_str[3] === '1' && this.state.tire) {
          PushNotification.localNotification({
            title: 'Sensors Notification', // (optional)
            message: 'Car Tire level is low!', // (required)
          });
          this.appendNotification('Car Tire level is low!');
        }
      }
    }
  };

  random_id() {
    return Math.random().toString(36).substr(2, 9);
  }
  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case 'home':
        return <HomeTab vehicle_id={this.state.vehicle_id} />;
      case 'vehicle':
        return <VehicleTab vehicle_id={this.state.vehicle_id} />;
      case 'notifications':
        return <NotificationTab vehicle_id={this.state.vehicle_id} />;
      case 'profile':
        return <ProfileTab />;
      default:
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme(custom)}>
        <Container>
          <Header>
            <Body>
              <Title>
                {this.state.selectedTab.charAt(0).toUpperCase() +
                  this.state.selectedTab.slice(1)}
              </Title>
            </Body>
          </Header>
          {this.renderSelectedTab()}
          <Footer>
            <FooterTab>
              <Button
                active={this.state.selectedTab === 'home'}
                onPress={() => this.setState({selectedTab: 'home'})}
                vertical>
                <Icon active={this.state.selectedTab === 'home'} name="home" />
                <Text>Home</Text>
              </Button>
              <Button
                active={this.state.selectedTab === 'vehicle'}
                onPress={() => this.setState({selectedTab: 'vehicle'})}
                vertical>
                <Icon
                  active={this.state.selectedTab === 'vehicle'}
                  name="car"
                />
                <Text>Vehicle</Text>
              </Button>
              <Button
                active={this.state.selectedTab === 'notifications'}
                onPress={() => this.setState({selectedTab: 'notifications'})}
                vertical>
                <Icon
                  active={this.state.selectedTab === 'notifications'}
                  name="notifications"
                />
                <Text>alerts</Text>
              </Button>
              <Button
                active={this.state.selectedTab === 'profile'}
                onPress={() => this.setState({selectedTab: 'profile'})}
                vertical>
                <Icon
                  active={this.state.selectedTab === 'profile'}
                  name="person"
                />
                <Text>Profile</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}
