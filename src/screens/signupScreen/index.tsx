import React, { Component, createRef } from 'react';
import { Form, FormItem } from 'react-native-form-component';

import Screen from 'screens/_components/Screen';
import { colors } from 'screens/colors';
import Loader from 'screens/_components/Loader';

import { styles } from './styles';

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
  firstNameInput = createRef();
  lastNameInput = createRef();
  emailInput = createRef();

  handleSignup = async () => {
    const { email, firstname, lastName } = this.state;
    try {
      this.setState({ isLoading: true });
    } catch (error) {
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
          />
          <FormItem
            value={lastName}
            label="Last Name"
            isRequired
            ref={this.lastNameInput}
            onChangeText={lastName => this.setState({ lastName })}
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
