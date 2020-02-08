import {StyleSheet} from 'react-native';
import {AppStyles} from './../../AppStyles';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     ...StyleSheet.absoluteFillObject,
//     flexDirection: 'column',
//     alignItems: 'stretch',
//   },
//   map: {
//     alignItems: 'flex-start',
//     flex: 2,
//     ...StyleSheet.absoluteFillObject,
//     height: 420,
//   },
//   photo: RecipeCard.photo,
//   title: RecipeCard.title,
//   category: RecipeCard.category,
//   find_car_button: {flex: 1},
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  map: {
    flex: 1,
    flexDirection: 'column-reverse',
    direction: 'rtl',
    flexGrow: 9,
  },
  map_button: {
    flex: 1,
    width: 50,
    height: 50,
    minWidth: 50,
    minHeight: 50,
    maxWidth: 50,
    maxHeight: 50,
    margin: 10,
    flexGrow: 1,
    position: 'absolute', // top of map
  },
  back_container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
  },

  bottom_bar: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
  },
});

export default styles;
