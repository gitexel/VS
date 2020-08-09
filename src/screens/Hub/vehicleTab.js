import React from 'react';

import {
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Icon,
  Text,
  Button,
  Left,
  Right,
  View,
  Body,
  Switch,
  CardItem,
  Container,
  Header,
  Fab,
  Accordion,
} from 'native-base';
import VehicleTabSettings from './vehicleSettingsTab';

class VehicleTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      haveCar: true,
      selectedItem: undefined,
      cards: [
        {
          text: 'Card One',
          name: 'One',
          image: '',
        },
      ],
    };
    // this.tryToLoginFirst();
  }

  onValueChange(value: string) {
    this.setState({
      selected1: value,
    });
  }

  openVehicleSettings(value: string) {
    this.props.navigation.navigate('carSettings');
  }
  render() {
    if (this.state.isLoading) {
      return;
    }
    return (
      <Content>
        <VehicleTabSettings />
      </Content>
    );
  }
}

export default VehicleTab;
