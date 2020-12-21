import React from 'react';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Icon} from '@ui-kitten/components';

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    color: '#000000',
  },
});

const RenderRightCloseIcon = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.onPress()}>
      <Icon style={styles.icon} fill="#aaaaaa" name="close-outline" />
    </TouchableWithoutFeedback>
  );
};

export default RenderRightCloseIcon;
