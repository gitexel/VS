import React from 'react';
import styles from './styles';
import {View} from 'react-native';
import {Button, Icon} from 'native-base';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

class HomeTab extends React.Component {
  constructor(props) {
    super(props);
    const {currentUser} = auth();

    this.state = {
      currentUser,
      vehicle_id: '',
      user_doc: {},
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
    };
  }

  componentDidMount() {
    firestore()
      .collection('users')
      .doc(this.state.currentUser.uid)
      .get()
      .then(
        function (doc) {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            this.setState({user_doc: doc.data()});
            this.setState({vehicle_id: doc.data().car.id});
            this.onPressFindCar();
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        }.bind(this),
      )
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }

  onPressFindCar = () => {
    database()
      .ref('/' + this.state.vehicle_id + '/location/')
      .once('value')
      .then(
        function (snapshot) {
          let value = snapshot.val();
          if (value.latitude && value.longitude) {
            this.setState({
              region: {
                latitude: parseFloat(value.latitude),
                longitude: parseFloat(value.longitude),
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0421,
              },
            });
          } else {
            // eslint-disable-next-line no-alert
            alert('try again!');
          }
        }.bind(this),
      );
  };

  render() {
    if (this.state.isLoading) {
      return;
    }
    return (
      <View style={{flex: 1, flexGrow: 1}}>
        <MapView style={styles.map_view} region={this.state.region}>
          <Marker coordinate={this.state.region}>
            <Button transparent>
              <Icon
                type={'MaterialCommunityIcons'}
                name="google-maps"
                style={styles.map_icon}
              />
            </Button>
          </Marker>
        </MapView>

        <Button
          style={styles.lock_button}
          transparent
          onPress={() => {
            this.onPressFindCar();
          }}>
          <Icon
            type={'MaterialIcons'}
            name="gps-fixed"
            style={styles.map_icon}
          />
        </Button>
      </View>
    );
  }
}

export default HomeTab;
