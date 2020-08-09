import React from 'react';
import {Text, TextInput, View} from 'react-native';
import Button from 'react-native-button';
import {AppStyles} from '../../AppStyles';
import styles from '../SignUp/styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      email: '',
      password: '',
      car_id: '',
    };
  }

  componentDidMount() {
    this.authSubscription = auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  do_after_register = () => {
    let user_uid = auth().currentUser.uid;

    firestore()
      .collection('users')
      .doc(user_uid)
      .set({
        car: {
          id: this.state.car_id,
          type: '',
          gps: false,
          steal: false,
          shock: false,
          tire: false,
          lock: false,
          emergency: false,
          emergency_number: '',
        },
        personal: {
          first_name: '',
          last_name: '',
          phone: '',
          gender: '',
          address: '',
        },
        notifications: [],
      })
      .then(
        function () {
          console.log('Document successfully written!');
          this.props.navigation.navigate('Hub', {
            user_uid: user_uid,
            vehicle_id: this.state.car_id,
          });
        }.bind(this),
      )
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };
  onRegister = () => {
    const {email, password} = this.state;
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.do_after_register())
      .catch((error) => this.setState({errorMessage: error.message}));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red', fontSize: 10}}>
            {this.state.errorMessage}
          </Text>
        )}
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Car ID"
            onChangeText={(text) => this.setState({car_id: text})}
            value={this.state.car_id}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="E-mail Address"
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>

        <Button
          containerStyle={[styles.facebookContainer, {marginTop: 50}]}
          style={styles.facebookText}
          onPress={() => this.onRegister()}>
          Sign Up
        </Button>
      </View>
    );
  }
}

export default SignUpScreen;
