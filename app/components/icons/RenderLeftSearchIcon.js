import React from 'react';

import {Icon} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    color: '#000000',
  },
});
const RenderLeftSearchIcon = (props) => {
  return <Icon style={styles.icon} fill="#aaaaaa" name="search-outline" />;
};

export default RenderLeftSearchIcon;
