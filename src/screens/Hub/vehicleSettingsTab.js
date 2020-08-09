import React from 'react';

import {
  List,
  ListItem,
  Input,
  Icon,
  Text,
  Button,
  Left,
  Right,
  Body,
  Switch,

} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class VehicleTabSettings extends React.Component {
  constructor(props) {
    super(props);
    const {currentUser} = auth();

    this.state = {
      currentUser,
      isLoading: false,
      vehicle_id: '',
      gps: true,
      steal: true,
      shock: true,
      tire: true,
      lock: true,
      emergency: true,
      emergency_number: '',
    };
    // this.tryToLoginFirst();
  }
  componentDidMount() {
    firestore()
      .collection('users')
      .doc(this.state.currentUser.uid)
      .get()
      .then(
        function (doc) {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            this.setState({gps: doc.data().car.gps});
            this.setState({steal: doc.data().car.steal});
            this.setState({shock: doc.data().car.shock});
            this.setState({tire: doc.data().car.tire});
            this.setState({lock: doc.data().car.lock});
            this.setState({emergency: doc.data().car.emergency});
            this.setState({emergency_number: doc.data().car.emergency_number});
            this.setState({vehicle_id: doc.data().car.id});
          } else {
            console.log('No such document!');
          }
        }.bind(this),
      )
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }

  componentWillUnmount() {
    firestore()
      .collection('users')
      .doc(this.state.currentUser.uid)
      .update({
        car: {
          id: this.state.vehicle_id,
          gps: this.state.gps,
          steal: this.state.steal,
          shock: this.state.shock,
          tire: this.state.tire,
          lock: this.state.lock,
          emergency: this.state.emergency,
          emergency_number: this.state.emergency_number,
        },
      })
      .then(() => {
        console.log('User updated!');
      });
  }

  onSwitchPress = (name) => {
    switch (name) {
      case 'gps':
        this.setState({gps: !this.state.gps});
        break;
      case 'steal':
        this.setState({steal: !this.state.steal});
        break;
      case 'shock':
        this.setState({shock: !this.state.shock});
        break;
      case 'tire':
        this.setState({tire: !this.state.tire});
        break;
      case 'lock':
        this.setState({lock: !this.state.lock});
        break;
      case 'emergency':
        this.setState({emergency: !this.state.emergency});
        break;
    }
  };
  render() {
    if (this.state.isLoading) {
      return;
    }

    return (
      <List>
        <ListItem icon>
          <Left>
            <Button>
              <Icon type={'AntDesign'} name="idcard" />
            </Button>
          </Left>
          <Body>
            <Text>{this.state.vehicle_id}</Text>
          </Body>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon active name="navigate" />
            </Button>
          </Left>
          <Body>
            <Text>GPS</Text>
          </Body>
          <Right>
            <Switch
              value={this.state.gps}
              onChange={() => this.onSwitchPress('gps')}
            />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon active name="key" />
            </Button>
          </Left>
          <Body>
            <Text>Steal Detection</Text>
          </Body>
          <Right>
            <Switch
              value={this.state.steal}
              onChange={() => this.onSwitchPress('steal')}
            />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon active name="move" />
            </Button>
          </Left>
          <Body>
            <Text>Shock Detection</Text>
          </Body>
          <Right>
            <Switch
              value={this.state.shock}
              onChange={() => this.onSwitchPress('shock')}
            />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon
                type={'MaterialCommunityIcons'}
                active
                name="car-tire-alert"
              />
            </Button>
          </Left>
          <Body>
            <Text>Tire level</Text>
          </Body>
          <Right>
            <Switch
              value={this.state.tire}
              onChange={() => this.onSwitchPress('tire')}
            />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon type={'Entypo'} active name="lock" />
            </Button>
          </Left>
          <Body>
            <Text>Auto Lock</Text>
          </Body>
          <Right>
            <Switch
              value={this.state.lock}
              onChange={() => this.onSwitchPress('lock')}
            />
          </Right>
        </ListItem>

        <ListItem icon>
          <Left>
            <Button>
              <Icon type={'Entypo'} active name="megaphone" />
            </Button>
          </Left>
          <Body>
            <Input
              placeholder="Emergency Phone Number"
              value={this.state.emergency_number}
              onChangeText={(text) => this.setState({emergency_number: text})}
            />
          </Body>
          <Right>
            <Switch
              value={this.state.emergency}
              onChange={() => this.onSwitchPress('emergency')}
            />
          </Right>
        </ListItem>
      </List>
    );
  }
}

export default VehicleTabSettings;
