import React from 'react';
import Button from 'react-native-button';
import {ActivityIndicator, Text, View} from 'react-native';
import {AppStyles} from '../../AppStyles';
import styles from '../Welcome/styles';

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Welcome',
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    // this.tryToLoginFirst();
  }

  render() {
    const {navigate} = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color={AppStyles.color.tint}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Car Safe</Text>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => navigate('Login', {name: 'Jane'})}>
          Log In
        </Button>
        <Button
          containerStyle={styles.signUpContainer}
          style={styles.signUpText}
          onPress={() => navigate('SignUp', {name: 'Jane'})}>
          Sign Up
        </Button>
      </View>
    );
  }
}

export default WelcomeScreen;
