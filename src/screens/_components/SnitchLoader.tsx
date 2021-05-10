import React from "react";
import { Modal, View, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "screens/colors";
import CustomText from "./CustomText";

interface Props {
  showLoader: boolean;
  action: string;
}

export default function SnitchLoader(props: Props) {
  return (
    <Modal transparent visible={props.showLoader}>
      <View style={styles.wrapper}>
        <View style={styles.background} />
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator size="large" color={colors.brown} />
          <CustomText text={props.action + "..."} style={styles.action} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundColor: "rgba(0,0,0,0.4)",
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  indicatorWrapper: {
    backgroundColor: colors.white,
    padding: 16,
    minHeight: 80,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    borderRadius: 4,
    flexDirection: "row",
  },
  action: { marginLeft: 8, textTransform: "capitalize", fontSize: 16 },
});
