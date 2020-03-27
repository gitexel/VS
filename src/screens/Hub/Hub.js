import React from 'react';
import {
  StyleProvider,
  Footer,
  FooterTab,
  Button,
  Container,
  Badge,
  Text,
  Icon,
  Header,
  Left,
  Right,
  Body,
  Title,
} from 'native-base';

import getTheme from '../../../native-base-theme/components';
import custom from '../../../native-base-theme/variables/custom';
import HomeTab from './homeTab';
import ProfileTab from './profileTab';
import NotificationTab from './notificationsTab';
import VehicleTab from './vehicleTab';
export default class Hub extends React.Component {
  static navigationOptions = {
    title: '',
    header: null,
  };


  constructor(props) {
    super(props);
    this.state = {

      selectedTab: 'home',
    };
  }
  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case 'home':
        return <HomeTab />;
      case 'vehicle':
        return <VehicleTab />;
      case 'notifications':
        return <NotificationTab />;
      case 'profile':
        return <ProfileTab />;
      default:
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme(custom)}>
        <Container>
          <Header>
            <Body>
              <Title>
                {this.state.selectedTab.charAt(0).toUpperCase() +
                  this.state.selectedTab.slice(1)}
              </Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="menu" />
              </Button>
            </Right>
          </Header>
          {this.renderSelectedTab()}
          <Footer>
            <FooterTab>
              <Button
                active={this.state.selectedTab === 'home'}
                onPress={() => this.setState({selectedTab: 'home'})}
                vertical>
                <Icon active={this.state.selectedTab === 'home'} name="home" />
                <Text>Home</Text>
              </Button>
              <Button
                active={this.state.selectedTab === 'vehicle'}
                onPress={() => this.setState({selectedTab: 'vehicle'})}
                vertical>
                <Icon
                  active={this.state.selectedTab === 'vehicle'}
                  name="car"
                />
                <Text>Vehicle</Text>
              </Button>
              <Button
                active={this.state.selectedTab === 'notifications'}
                onPress={() => this.setState({selectedTab: 'notifications'})}
                badge
                vertical>
                <Badge>
                  <Text>6</Text>
                </Badge>
                <Icon
                  active={this.state.selectedTab === 'notifications'}
                  name="notifications"
                />
                <Text>alerts</Text>
              </Button>
              <Button
                active={this.state.selectedTab === 'profile'}
                onPress={() => this.setState({selectedTab: 'profile'})}
                vertical>
                <Icon
                  active={this.state.selectedTab === 'profile'}
                  name="person"
                />
                <Text>Profile</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}
