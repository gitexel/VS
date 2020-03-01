import React from 'react';

import {
  Content,
  Item,
  Input,
  Icon,
  Text,
  Picker,
  Label,
  Form,
} from 'native-base';

class ProfileTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedItem: undefined,
      selected1: 'key0',
      results: {
        items: [],
      },
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
        <Form>
          <Item inlineLabel>
            <Label>First Name</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Last Name</Label>
            <Input />
          </Item>

          <Item>
            <Icon active name="mail" />
            <Input placeholder="EMAIL" />
          </Item>
          <Item>
            <Icon active name="unlock" />
            <Input placeholder="PASSWORD" secureTextEntry />
          </Item>
          <Item>
            <Icon active name="call" />
            <Input placeholder="PHONE" keyboardType="numeric" />
          </Item>

          <Item iconLeft>
            <Icon active name="transgender" />
            <Text>GENDER</Text>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}>
              <Item label="Male" value="key0" />
              <Item label="Female" value="key1" />
              <Item label="Other" value="key2" />
            </Picker>
          </Item>

          <Item>
            <Icon name="compass" />
            <Input placeholder="Address" />
          </Item>
        </Form>
      </Content>
    );
  }
}

export default ProfileTab;
