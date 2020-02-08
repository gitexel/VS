import React from 'react';
import {Text, TextInput, View} from 'react-native';
import Button from 'react-native-button';
import {AppStyles} from '../../AppStyles';
import styles from '../SignUp/styles';

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      full_name: '',
      phone: '',
      email: '',
      password: '',
    };
    this.navigate = this.props.navigation;
  }

  //
  // componentDidMount() {
  //     this.authSubscription = firebase.auth().onAuthStateChanged(user => {
  //         this.setState({
  //             loading: false,
  //             user
  //         });
  //     });
  // }
  //
  // componentWillUnmount() {
  //     this.authSubscription();
  // }

  onRegister = () => {
    // const {email, password} = this.state;
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(response => {
    //     const {navigation} = this.props;
    //     const {fullname, phone, email} = this.state;
    //     const data = {
    //       email: email,
    //       fullname: fullname,
    //       phone: phone,
    //       appIdentifier: 'rn-android-universal-listings',
    //     };
    //     user_uid = response.user._user.uid;
    //     firebase
    //       .firestore()
    //       .collection('users')
    //       .doc(user_uid)
    //       .set(data);
    //     firebase
    //       .firestore()
    //       .collection('users')
    //       .doc(user_uid)
    //       .get()
    //       .then(function(user) {
    //         navigation.dispatch({type: 'Login', user: user});
    //       })
    //       .catch(function(error) {
    //         const {code, message} = error;
    //         alert(message);
    //       });
    //   })
    //   .catch(error => {
    //     const {code, message} = error;
    //     alert(message);
    //   });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Full Name"
            onChangeText={text => this.setState({fullname: text})}
            value={this.state.fullname}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Phone Number"
            onChangeText={text => this.setState({phone: text})}
            value={this.state.phone}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="E-mail Address"
            onChangeText={text => this.setState({email: text})}
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
            onChangeText={text => this.setState({password: text})}
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
