import React, { forwardRef } from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";

export interface CellValueProps extends ViewProps {
  label: string;
  value: React.ReactNode;
  isPrimary?: boolean;
}

/**
 * A simple key-value row with a label on the left and the value on the right.
 */
const CellValue = forwardRef<View, CellValueProps>(
  ({ label, value, isPrimary, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          isPrimary ? styles.primaryTextContainer : styles.container,
          style,
        ]}
        {...props}
      >
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  }
);

CellValue.displayName = "CellValue";

export default CellValue;

const styles = StyleSheet.create({
  primaryTextContainer: {
    flexDirection: "column",
    gap: 5,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8, // matches py-2 from Tailwind
  },
  label: {
    fontSize: 14,
    color: "#9CA3AF", // a Tailwind-like "text-default-500"
  },
  value: {
    fontSize: 14,
    fontWeight: "600", // "font-medium"
  },
});
