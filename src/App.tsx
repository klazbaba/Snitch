import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component, createContext } from 'react';
import { Root } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from 'screens/welcomeScreen';
import SetupScreen from 'screens/setupScreen';
import HomeScreen from 'screens/homeScreen';
import EditContactScreen, { Contact } from 'screens/editContactScreen';
import SignupScreen from './screens/signupScreen';

interface State {
  initialRender: boolean;
  notFirstTime: boolean;
}

export type AppStackParams = {
  WelcomeScreen: undefined;
  SignupScreen: undefined;
  HomeScreen: {
    contacts?: string | Contact;
    fromEdit?: boolean;
    showModal?: boolean;
  };
  EditContactScreen: undefined;
  SetupScreen: undefined;
};

interface Props {}

const AppStack = createNativeStackNavigator<AppStackParams>();

export const NavigationContext = createContext(null);

export default class Routes extends Component<Props, State> {
  notFirstTime: boolean;
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      initialRender: true,
      notFirstTime: false,
    };
  }

  componentDidMount = async () => {
    const contactDetails = await AsyncStorage.getItem('contactDetails');
    this.setState({
      notFirstTime: Boolean(contactDetails),
      initialRender: false,
    });
  };

  render() {
    const { initialRender, notFirstTime } = this.state;
    if (initialRender) return null;
    return (
      <Root>
        <NavigationContainer>
          <NavigationContext.Provider
            value={{
              isFirstTime: true,
              toggleIsFirstTime: () => {
                this.context = false;
                this.setState({ notFirstTime: true });
              },
            }}>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
              {!notFirstTime ? (
                <>
                  <AppStack.Screen
                    name="WelcomeScreen"
                    component={WelcomeScreen}
                  />
                  <AppStack.Screen
                    name="SignupScreen"
                    component={SignupScreen}
                  />
                </>
              ) : (
                <>
                  <AppStack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ header: () => null }}
                  />
                  <AppStack.Screen
                    component={EditContactScreen}
                    name="EditContactScreen"
                  />
                  <AppStack.Screen name="SetupScreen" component={SetupScreen} />
                </>
              )}
            </AppStack.Navigator>
          </NavigationContext.Provider>
        </NavigationContainer>
      </Root>
    );
  }
}
