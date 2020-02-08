/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppContainer from './src/navigations/AppNavigation';

const App: () => React$Node = () => {
  return <AppContainer />;
};

export default App;

// import React from 'react';
// import {Text, View, Button} from 'react-native';
// export default class test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {username: '', password: '', loading: false};
//   }
//
//   state = {
//     username: 'mina',
//     password: 'mina1995',
//     creditCard: '3928432759871398759843759843',
//   };
//   onPressChangePassword = () => {
//     alert('new password is ' + this.state.password);
//   };
//   render() {
//     return (
//       <View>
//         <Text>
//           hello {this.state.username} your password is {this.state.password}
//         </Text>
//         <Button
//           title="change Password"
//           onPress={() => this.onPressChangePassword()}
//         />
//       </View>
//     );
//   }
// }
