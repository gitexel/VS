import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Hub from '../screens/Hub/Hub';
import LoginScreen from '../screens/Login/login';
import WelcomeScreen from '../screens/Welcome/welcome';
import SignUpScreen from '../screens/SignUp/signUp';
import VehicleTabSettings from '../screens/Hub/vehicleSettingsTab';

const MainNavigator = createStackNavigator(
  {
    Welcome: {screen: WelcomeScreen},
    Login: {screen: LoginScreen},
    SignUp: {screen: SignUpScreen},
    Hub: {screen: Hub},
    carSettings: {screen: VehicleTabSettings},
  },
  {
    initialRouteName: 'Hub',
    headerMode: 'flat',
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
