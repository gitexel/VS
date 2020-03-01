import React from 'react';
import styles from './styles';
import {View} from 'react-native';
import {Button, Icon} from 'native-base';
import MapView from 'react-native-maps';

class HomeTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    // this.tryToLoginFirst();
  }

  render() {
    if (this.state.isLoading) {
      return;
    }
    return (
      <View style={{flex: 1, flexGrow: 1}}>
        <MapView
          style={styles.map_view}
          region={{
            latitude: 27.1875747,
            longitude: 31.169968,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
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
        <Button
          style={styles.location_button}
          transparent
          onPress={() => {
            this.onPressFindCar();
          }}>
          <Icon name="pin" style={styles.map_icon} />
        </Button>
      </View>
    );
  }
}

export default HomeTab;
