import React, { Component, createRef, RefObject } from 'react';
import { Form, FormItem } from 'react-native-form-component';
import { TextInput } from 'react-native';

import Screen from 'screens/_components/Screen';
import { colors } from 'screens/colors';
import Loader from 'screens/_components/Loader';

import { styles } from './styles';
import { signup } from './backendCalls/signup';

interface State {
  firstname: string;
  lastName: string;
  email: string;
  isLoading: boolean;
}

export default class SignupScreen extends Component<null, State> {
  state = {
    firstname: '',
    lastName: '',
    email: '',
    isLoading: false,
  };
  firstNameInput: RefObject<TextInput> = createRef();
  lastNameInput: RefObject<TextInput> = createRef();
  emailInput: RefObject<TextInput> = createRef();

  handleSignup = async () => {
    const { email, firstname, lastName } = this.state;
    try {
      this.setState({ isLoading: true });
      const response = await signup({ email, firstname, lastName });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { firstname, lastName, email, isLoading } = this.state;
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
          />
        </Form>
      </Screen>
    );
  }
}
