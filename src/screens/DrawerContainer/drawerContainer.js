import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/menuButton';

export default class DrawerContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={require('../../../assets/icons2/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              // this.props.CloseDrawer();
            }}
          />
          <MenuButton
            title="MY CARS"
            source={require('../../../assets/icons2/category.png')}
            onPress={() => {
              navigation.CloseDrawer();
            }}
          />
          <MenuButton
            title="Notifications"
            source={require('../../../assets/icons2/ingredients.png')}
            onPress={() => {
              // navigate('Search');
              navigation.closeDrawer();
            }}
          />
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
