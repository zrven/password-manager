import {Input} from '@ui-kitten/components';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import {generatePassword} from '../utils/generate';
import RenderRightEyeIcon from './icons/RenderRightEyeIcon';

const ComponentInput = (props) => {
  const {styles} = props;
  const [flag, setFlag] = useState(props.secureTextEntry);
  const onPress = (status) => {
    setFlag(!flag);
  };
  return (
    <View style={styles.inputView}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text category="label">{props.text}</Text>
        {props.generatePassword && props.name === 'password' && (
          <Pressable
            onPress={() => {
              const password = generatePassword(12);
              props.dispatch({type: 'password', payload: password});
            }}>
            <Text category="s1">{'Generate password'}</Text>
          </Pressable>
        )}
      </View>
      <Input
        placeholder={props.placeholder}
        status="basic"
        style={styles.input}
        name={props.name}
        maxLength={40}
        multiline={props.multiline || false}
        secureTextEntry={flag}
        autoCompleteType={props.autoCompleteType || 'off'}
        returnKeyType="next"
        underlineColorAndroid="transparent"
        value={props.value}
        autoCapitalize={props.autoCapitalize || 'words'}
        ref={props.ref}
        onChangeText={(text) => {
          props.dispatch({type: `${props.name}`, payload: text});
        }}
        onSubmitEditing={(event) => {
          props.nextRef.current.focus();
        }}
        accessoryRight={(imgProps) => (
          <>
            {props.name === 'password' && (
              <RenderRightEyeIcon
                {...imgProps}
                {...props}
                eye={!flag}
                onPress={onPress}
              />
            )}
          </>
        )}
      />
      {props.name === 'password' && (
        <BarPasswordStrengthDisplay
          barContainerStyle={styles.bar}
          password={props.value}
        />
      )}
    </View>
  );
};

export default ComponentInput;
