import React from 'react';
import {Right, Content, Left, Icon, List, ListItem, Text} from 'native-base';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

class NotificationTab extends React.Component {
  constructor(props) {
    const {currentUser} = auth();
    super(props);
    this.state = {
      currentUser,
      isLoading: false,
      selectedItem: undefined,
      basic: true,
      notification_items: [],
    };
  }

  componentDidMount() {
    firestore()
      .collection('users')
      .doc(this.state.currentUser.uid)
      .onSnapshot((documentSnapshot) => {
        console.log('User data: ', documentSnapshot.data());
        this.setState({
          notification_items: documentSnapshot.data().notifications,
        });
      });
  }

  componentWillUnmount() {
    firestore()
      .collection('users')
      .doc(this.state.currentUser.uid)
      .update({
        notifications: this.state.notification_items,
      })
      .then(() => {
        console.log('User updated!');
      });
  }

  removeNotification = (item_id) => {
    const filteredData = this.state.notification_items.filter(
      (item) => item.id !== item_id,
    );
    this.setState({notification_items: filteredData});
    firestore()
      .collection('users')
      .doc(this.state.currentUser.uid)
      .update({
        notifications: filteredData,
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  render() {
    if (this.state.isLoading) {
      return;
    }

    return (
      <Content>
        <List
          dataArray={this.state.notification_items}
          renderRow={(item) => (
            <ListItem selected>
              <Left>
                <Text>{item.content}</Text>
              </Left>
              <Right>
                <Icon
                  name="trash"
                  onPress={() => this.removeNotification(item.id)}
                />
              </Right>
            </ListItem>
          )}
        />
      </Content>
    );
  }
}

export default NotificationTab;
