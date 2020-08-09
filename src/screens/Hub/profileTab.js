import React from 'react';

import {
  Content,
  ListItem,
  Input,
  Icon,
  Text,
  Picker,
  Left,
  Body,
  Button,
} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class ProfileTab extends React.Component {
  constructor(props) {
    const {currentUser} = auth();
    super(props);
    this.state = {
      currentUser,

      isLoading: false,
      first_name: '',
      last_name: '',
      phone: '',
      gender: '',
      address: '',
      password: '0000000000000',
      results: {
        items: [],
      },
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
            this.setState({first_name: doc.data().personal.first_name});
            this.setState({last_name: doc.data().personal.last_name});
            this.setState({phone: doc.data().personal.phone});
            this.setState({gender: doc.data().personal.gender});
            this.setState({address: doc.data().personal.address});
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
        personal: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone: this.state.phone,
          gender: this.state.gender,
          address: this.state.address,
          password: this.state.password,
        },
      })
      .then(() => {
        console.log('User updated!');
      });
  }

  render() {
    if (this.state.isLoading) {
      return;
    }
    return (
      <Content>
        <ListItem icon>
          <Left>
            <Text>First Name</Text>
          </Left>
          <Body>
            <Input
              value={this.state.first_name}
              onChangeText={(text) => this.setState({first_name: text})}
            />
          </Body>
        </ListItem>

        <ListItem icon>
          <Left>
            <Text>Last Name</Text>
          </Left>
          <Body>
            <Input
              value={this.state.last_name}
              onChangeText={(text) => this.setState({last_name: text})}
            />
          </Body>
        </ListItem>

        <ListItem icon>
          <Left>
            <Button>
              <Icon name="mail" />
            </Button>
          </Left>
          <Body>
            <Input
              disabled
              placeholder="Email"
              value={this.state.currentUser.email}
            />
          </Body>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon
                active
                type={'MaterialCommunityIcons'}
                name="form-textbox-password"
              />
            </Button>
          </Left>
          <Body>
            <Input
              placeholder="PASSWORD"
              secureTextEntry
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}
            />
          </Body>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon active name="call" />
            </Button>
          </Left>
          <Body>
            <Input
              placeholder="PHONE"
              keyboardType="numeric"
              value={this.state.phone}
              onChangeText={(text) => this.setState({phone: text})}
            />
          </Body>
        </ListItem>

        <ListItem icon>
          <Left>
            <Button>
              <Icon active name="transgender" />
            </Button>
          </Left>
          <Body>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.gender}
              onChangeText={(text) => this.setState({gender: text})}>
              <ListItem label="Male" value="male" />
              <ListItem label="Female" value="female" />
              <ListItem label="Other" value="other" />
            </Picker>
          </Body>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon name="compass" />
            </Button>
          </Left>
          <Body>
            <Input
              placeholder="Address"
              value={this.state.address}
              onChangeText={(text) => this.setState({address: text})}
            />
          </Body>
        </ListItem>
      </Content>
    );
  }
}

export default ProfileTab;
