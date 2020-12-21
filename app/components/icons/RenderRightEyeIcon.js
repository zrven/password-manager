import React from 'react';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Icon} from '@ui-kitten/components';

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    color: '#000000',
  },
});

const RenderRightEyeIcon = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress();
      }}>
      <Icon
        style={styles.icon}
        fill="#aaaaaa"
        name={props.eye ? 'eye-outline' : 'eye-off-outline'}
      />
    </TouchableWithoutFeedback>
  );
};

export default RenderRightEyeIcon;
