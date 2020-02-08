import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import MapView from 'react-native-maps';
import {AppStyles} from '../../AppStyles';
import {RecipeCard} from '../../AppStyles';
import {Footer, FooterTab, Button, Icon} from 'native-base';
export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
    title: 'Vehicle Security',
  });
  onRegionChange(region) {
    this.setState({region});
  }

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onPressFindCar = () => {};

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.map}>
          <MapView
            style={{flex: 1, flexGrow: 1}}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
          <View style={styles.map_button}>
            <Button
              color={AppStyles.color.tint}
              title={'Find'}
              onPress={() => {
                this.onPressFindCar();
              }}>
              <Icon name="search" />
            </Button>
          </View>
        </View>
        <View style={styles.back_container}>
          <View style={styles.bottom_bar}>
            <FooterTab style={{backgroundColor: '#FFF'}}>
              <Button>
                <Icon name="rocket" />
              </Button>
              <Button>
                <Icon name="camera" />
              </Button>
              <Button>
                <Icon name="compass" />
              </Button>
              <Button>
                <Icon name="contact" />
              </Button>
            </FooterTab>
          </View>
        </View>
      </View>
    );
  }
}
