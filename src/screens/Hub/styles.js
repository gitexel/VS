import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  map_view: {flex: 1, flexGrow: 1},
  lock_button: {
    position: 'absolute',
    bottom: '5%',
    right: '1.9%',
    width: 70,
    height: 50,
  },
  locate_button: {
    position: 'absolute',
    bottom: '15%',
    right: '1.9%',
    width: 70,
    height: 50,
  },
  location_button: {
    position: 'absolute',
    bottom: '65%',
    right: '32%',
    width: 70,
    height: 50,
  },
  map_icon: {width: null, textAlign: 'center', fontSize: 35},
});

export default styles;
