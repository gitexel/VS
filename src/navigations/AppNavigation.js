import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import HomeScreen from '../screens/Home/homeScreen';
import LoginScreen from '../screens/Login/login';
import WelcomeScreen from '../screens/Welcome/welcome';
import SignUpScreen from '../screens/SignUp/signUp';
import DrawerContainer from '../screens/DrawerContainer/drawerContainer';

const MainNavigator = createStackNavigator(
  {
    Welcome: {screen: WelcomeScreen},
    Login: {screen: LoginScreen},
    SignUp: {screen: SignUpScreen},
    Home: {screen: HomeScreen},
  },
  {
    initialRouteName: 'Welcome',
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
