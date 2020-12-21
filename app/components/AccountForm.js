import {Input, Text} from '@ui-kitten/components';
import React, {useRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import {generatePassword} from '../utils';
import RenderRightEyeIcon from './icons/RenderRightEyeIcon';

const AccountForm = (props) => {
  const {postState, dispatch, styles} = props;
  const [flag, setFlag] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const onPress = (status) => {
    setFlag(!flag);
  };
  return (
    <>
      <View style={styles.inputView}>
        <Text category="label">{'Institution Name'}</Text>
        <Input
          placeholder={'Bank of America'}
          status="basic"
          style={styles.input}
          name={'name'}
          maxLength={40}
          multiline={false}
          secureTextEntry={false}
          autoCompleteType={'off'}
          returnKeyType="next"
          underlineColorAndroid="transparent"
          value={postState.req.name}
          ref={ref1}
          onChangeText={(text) => {
            dispatch({type: `name`, payload: text});
          }}
          onSubmitEditing={(event) => {
            ref2.current.focus();
          }}
        />
      </View>
      <View style={styles.inputView}>
        <Text category="label">{'Type'}</Text>
        <Input
          placeholder={'Type'}
          status="basic"
          style={styles.input}
          name={'Bank'}
          maxLength={40}
          multiline={false}
          secureTextEntry={false}
          autoCompleteType={'off'}
          returnKeyType="next"
          underlineColorAndroid="transparent"
          value={postState.req.type}
          ref={ref2}
          onChangeText={(text) => {
            dispatch({type: `type`, payload: text});
          }}
          onSubmitEditing={(event) => {
            ref3.current.focus();
          }}
        />
      </View>
      <View style={styles.inputView}>
        <Text category="label">{'User Name'}</Text>
        <Input
          placeholder={'john11'}
          status="basic"
          style={styles.input}
          name={'username'}
          maxLength={40}
          multiline={false}
          secureTextEntry={false}
          autoCompleteType={'off'}
          autoCapitalize="none"
          returnKeyType="next"
          underlineColorAndroid="transparent"
          value={postState.req.username}
          ref={ref3}
          onChangeText={(text) => {
            dispatch({type: `username`, payload: text});
          }}
          onSubmitEditing={(event) => {
            ref4.current.focus();
          }}
        />
      </View>
      <View style={styles.inputView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text category="label">{`Password`}</Text>
          <Pressable
            onPress={() => {
              const password = generatePassword(12);
              dispatch({type: 'password', payload: password});
            }}>
            <Text category="s1">{'Generate password'}</Text>
          </Pressable>
        </View>
        <Input
          placeholder={'********"'}
          status="basic"
          style={styles.input}
          name={'password'}
          maxLength={40}
          multiline={false}
          secureTextEntry={true}
          autoCompleteType={'off'}
          autoCapitalize="none"
          returnKeyType="next"
          underlineColorAndroid="transparent"
          value={postState.req.password}
          ref={ref4}
          onChangeText={(text) => {
            dispatch({type: `password`, payload: text});
          }}
          onSubmitEditing={(event) => {
            ref5.current.focus();
          }}
          accessoryRight={(imgProps) => (
            <>
              <RenderRightEyeIcon
                {...imgProps}
                {...props}
                eye={!flag}
                onPress={onPress}
              />
            </>
          )}
        />
        <BarPasswordStrengthDisplay
          barContainerStyle={styles.bar}
          password={postState.req.password}
        />
      </View>
      <View style={styles.inputView}>
        <Text category="label">{'Website'}</Text>
        <Input
          placeholder={'john11'}
          status="basic"
          style={styles.input}
          name={'website'}
          maxLength={40}
          multiline={false}
          secureTextEntry={false}
          autoCompleteType={'off'}
          autoCapitalize="none"
          returnKeyType="next"
          underlineColorAndroid="transparent"
          value={postState.req.website}
          ref={ref5}
          onChangeText={(text) => {
            dispatch({type: `website`, payload: text});
          }}
          onSubmitEditing={(event) => {
            ref6.current.focus();
          }}
        />
      </View>
      <View style={styles.inputView}>
        <Text category="label">{'Notes'}</Text>
        <Input
          placeholder={'john11'}
          status="basic"
          style={styles.input}
          name={'notes'}
          maxLength={40}
          multiline={true}
          secureTextEntry={false}
          autoCompleteType={'off'}
          autoCapitalize="none"
          returnKeyType="default"
          underlineColorAndroid="transparent"
          value={postState.req.notes}
          ref={ref6}
          onChangeText={(text) => {
            dispatch({type: `notes`, payload: text});
          }}
          onSubmitEditing={(event) => {
            //ref6.current.focus();
          }}
        />
      </View>
    </>
  );
};

export default AccountForm;
