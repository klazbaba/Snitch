import React, { Component, createRef, RefObject } from 'react';
import { Form, FormItem, submitForm } from 'react-native-form-component';
import { TextInput, Alert } from 'react-native';

import Screen from 'screens/_components/Screen';
import { colors } from 'screens/colors';
import Loader from 'screens/_components/Loader';

import { styles } from './styles';
import { signup } from './backendCalls/signup';
import { NavigationContext } from 'App';

interface State {
  firstname: string;
  lastName: string;
  email: string;
  isLoading: boolean;
  password: string;
}

export default class SignupScreen extends Component<null, State> {
  static contextType = NavigationContext;
  state = {
    firstname: '',
    lastName: '',
    email: '',
    isLoading: false,
    password: '',
  };
  firstNameInput: RefObject<TextInput> = createRef();
  lastNameInput: RefObject<TextInput> = createRef();
  emailInput: RefObject<TextInput> = createRef();
  passwordInput: RefObject<TextInput> = createRef();

  handleSignup = async () => {
    const { email, firstname, lastName, password } = this.state;
    try {
      this.setState({ isLoading: true });
      await signup({
        email,
        firstname,
        lastName,
        password,
      });
      Alert.alert(
        `Sign up successful. Go to ${email} to verify your email.`,
        '',
        [{ onPress: () => this.context.toggleIsFirstTime() }],
      );
    } catch (error) {
      console.error(JSON.stringify(error));
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { firstname, lastName, email, isLoading, password } = this.state;
    return (
      <Screen contentContainerStyle={styles.container}>
        <Loader showLoader={isLoading} message="Please Wait" />

        <Form
          onButtonPress={this.handleSignup}
          buttonStyle={{ backgroundColor: colors.green }}>
          <FormItem
            value={firstname}
            label="Firstname"
            isRequired
            ref={this.firstNameInput}
            onChangeText={firstname => this.setState({ firstname })}
            blurOnSubmit={false}
            onSubmitEditing={() => this.lastNameInput.current.focus()}
          />

          <FormItem
            value={lastName}
            label="Last Name"
            isRequired
            ref={this.lastNameInput}
            onChangeText={lastName => this.setState({ lastName })}
            blurOnSubmit={false}
            onSubmitEditing={() => this.emailInput.current.focus()}
          />

          <FormItem
            value={email}
            label="Email"
            isRequired
            ref={this.emailInput}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            blurOnSubmit={false}
            onSubmitEditing={() => this.passwordInput.current.focus()}
          />

          <FormItem
            value={password}
            label="Password"
            isRequired
            ref={this.passwordInput}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
            onSubmitEditing={() => submitForm()}
          />
        </Form>
      </Screen>
    );
  }
}
