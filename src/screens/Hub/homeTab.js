import React from 'react';
import styles from './styles';
import {View} from 'react-native';
import {Button, Icon} from 'native-base';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class HomeTab extends React.Component {
  constructor(props) {
    super(props);
    const {currentUser} = auth();
    this.state = {
      currentUser,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onPressFindCar = () => {
    this.setState({
      region: {
        latitude: 27.1886637,
        longitude: 31.1697235,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
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
              <Icon name="pin" style={styles.map_icon} />
            </Button>
          </Marker>
        </MapView>
        <Button
          style={styles.lock_button}
          transparent
          onPress={() => {
            this.onPressFindCar();
          }}>
          <Icon name="lock" style={styles.map_icon} />
        </Button>
        <Button
          style={styles.locate_button}
          transparent
          onPress={() => {
            this.onPressFindCar();
          }}>
          <Icon name="locate" style={styles.map_icon} />
        </Button>
      </View>
    );
  }
}

export default HomeTab;
