import { SafeAreaView, StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  children: ReactNode;
  contentContainerStyle: object | object[];
}

export default function Screen(props: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[styles.container, props.contentContainerStyle]}>
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
});
