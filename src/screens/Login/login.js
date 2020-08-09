import React from 'react';
import {TextInput, View, Text} from 'react-native';
import Button from 'react-native-button';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import {AppStyles} from '../../AppStyles';
import firestore from '@react-native-firebase/firestore';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      errorMessage: null,
    };
  }

  _onSucssesLogin = () => {
    let user_uid = auth().currentUser.uid;
    let vehicle_id = '';
    firestore()
      .collection('users')
      .doc(user_uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          vehicle_id = doc.data().car.id;
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
    this.props.navigation.navigate('Hub', {
      user_uid: user_uid,
      vehicle_id: vehicle_id,
    });
  };
  _onPressLoginButton = () => {
    auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(() => this._onSucssesLogin())
      .catch((error) => {
        this.setState({errorMessage: error.message});
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red', fontSize: 10}}>
            {this.state.errorMessage}
          </Text>
        )}
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Type username"
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.body}
            placeholder="Type password"
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
        </View>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={this._onPressLoginButton}>
          Sign In
        </Button>
      </View>
    );
  }
}

export default LoginScreen;

//
// import React, {Component} from 'react';
//
// import styles from './style';
// import {
//   Keyboard,
//   Text,
//   View,
//   TextInput,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView, Button, TouchableOpacity,
// } from 'react-native';
//
// export default class LoginScreen extends Component {
//   render() {
//     return (
//       <KeyboardAvoidingView style={styles.containerView} behavior="padding">
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.loginScreenContainer}>
//             <View style={styles.loginFormView}>
//               <Text style={styles.logoText}>Instamobile</Text>
//               <TextInput
//                 placeholder="Username"
//                 placeholderColor="#c4c3cb"
//                 style={styles.loginFormTextInput}
//               />
//               <TextInput
//                 placeholder="Password"
//                 placeholderColor="#c4c3cb"
//                 style={styles.loginFormTextInput}
//                 secureTextEntry={true}
//               />
//               <Button
//                 buttonStyle={styles.loginButton}
//                 onPress={() => this.onLoginPress()}
//                 title="Login"
//               />
//               <TouchableOpacity
//                 buttonStyle={styles.fbLoginButton}
//                 onPress={() => this.onFbLoginPress()}
//                 title="Login with Facebook"
//                 color="#3897f1"
//               />
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     );
//   }
//
//   componentDidMount() {}
//
//   componentWillUnmount() {}
//
//   onLoginPress() {}
//
//   async onFbLoginPress() {
//     // const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
//     //   appId,
//     //   {
//     //     permissions: ['public_profile', 'email'],
//     //   },
//     // );
//     // if (type === 'success') {
//     //   const response = await fetch(
//     //     `https://graph.facebook.com/me?access_token=${token}`,
//     //   );
//     //   Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
//     // }
//   }
// }
