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
  Thumbnail,
} from 'native-base';

class VehicleTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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
  render() {
    if (this.state.isLoading) {
      return;
    }

    return (
      <Content>
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
            <Text>Settings</Text>
            <Icon active name="arrow-forward" />
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
            <Switch value={true} />
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
            <Switch value={true} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon active name="thermometer" />
            </Button>
          </Left>
          <Body>
            <Text>Temperature Sensor</Text>
          </Body>
          <Right>
            <Switch value={true} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon active name="lock" />
            </Button>
          </Left>
          <Body>
            <Text>Auto Lock</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>
      </Content>
    );
  }
}

export default VehicleTab;
