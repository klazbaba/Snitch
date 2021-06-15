import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from 'screens/colors';
import CustomText from './CustomText';

interface Props {
  showLoader: boolean;
  message: string;
}

export default function Loader(props: Props) {
  return (
    <Modal transparent visible={props.showLoader}>
      <View
        style={{
          backgroundColor: colors.modalBackground,
          ...StyleSheet.absoluteFillObject,
        }}
      />
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <ActivityIndicator
            size="large"
            color={colors.brown}
            style={{ marginRight: 8 }}
          />
          <CustomText text={props.message + ' ...'} style={{ fontSize: 16 }} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentWrapper: {
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 16,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
