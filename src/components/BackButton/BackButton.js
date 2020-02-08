import React from 'react';
import {TouchableHighlight, Image} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class BackButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.btnContainer}>
        <Image
          source={require('../../../assets/icons2/backArrow.png')}
          style={styles.btnIcon}
        />
      </TouchableHighlight>
    );
  }
}

BackButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
