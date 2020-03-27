import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Hub from '../screens/Hub/Hub';
import LoginScreen from '../screens/Login/login';
import WelcomeScreen from '../screens/Welcome/welcome';
import SignUpScreen from '../screens/SignUp/signUp';

const MainNavigator = createStackNavigator(
  {
    Welcome: {screen: WelcomeScreen},
    Login: {screen: LoginScreen},
    SignUp: {screen: SignUpScreen},
    Hub: {screen: Hub},
  },
  {
    initialRouteName: 'Hub',
    headerMode: 'float',
    defaultNavigationOptions: ({navigation}) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        fontFamily: 'FallingSkyCond',
      },
    }),
  },
);
//
// const DrawerStack = createDrawerNavigator(
//   {
//     Main: MainNavigator,
//   },
//   {
//     drawerPosition: 'bottom',
//     initialRouteName: 'Main',
//     drawerWidth: 200,
//     contentComponent: DrawerContainer,
//   },
// );

// const AppContainer = createAppContainer(DrawerStack);
const AppContainer = createAppContainer(MainNavigator);
export default AppContainer;
console.disableYellowBox = true;
