import React, { Component, createRef } from 'react';
import { Form, FormItem } from 'react-native-form-component';

import Screen from 'screens/_components/Screen';

import { styles } from './styles';
import { colors } from 'screens/colors';

interface State {
  firstname: string;
  lastName: string;
}

export default class SignupScreen extends Component<null, State> {
  state = {
    firstname: '',
    lastName: '',
    email: '',
  };
  firstNameInput = createRef();
  lastNameInput = createRef();
  emailInput = createRef();

  render() {
    const { firstname, lastName, email } = this.state;
    return (
      <Screen contentContainerStyle={styles.container}>
        <Form
          onButtonPress={() => {}}
          buttonStyle={{ backgroundColor: colors.green }}>
          <FormItem
            value={firstname}
            label="Firstname"
            isRequired
            ref={this.firstNameInput}
          />
          <FormItem
            value={lastName}
            label="Last Name"
            isRequired
            ref={this.lastNameInput}
          />
          <FormItem
            value={email}
            label="Email"
            isRequired
            ref={this.emailInput}
            keyboardType="email-address"
          />
        </Form>
      </Screen>
    );
  }
}
