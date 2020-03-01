import React from 'react';

import {Right, Content, Left, Icon, List, ListItem, Text} from 'native-base';

class NotificationTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedItem: undefined,
      basic: true,
      items: [
        'Vehicle1 location changed',
        'Vehicle1 temperature increases',
        'Vehicle1 door opened',
        'Vehicle1 has low gas',
        'Vehicle1 unlocked',
      ],
    };
    // this.tryToLoginFirst();
  }

  render() {
    if (this.state.isLoading) {
      return;
    }

    return (
      <Content>
        <List
          dataArray={this.state.items}
          renderRow={item => (
            <ListItem selected>
              <Left>
                <Text>{item}</Text>
              </Left>
              <Right>
                <Icon name="trash" />
              </Right>
            </ListItem>
          )}
        />
      </Content>
    );
  }
}

export default NotificationTab;
