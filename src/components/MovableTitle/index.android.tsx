import React from 'react';
import { Text, Animated, Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

interface Props {
  scrollY: any;
  title: string;
}

const Component = ({ scrollY, title }: Props) => {
  var yVal = scrollY.interpolate({
    inputRange: [0, 70, 77],
    outputRange: [0, -15, -15],
  });
  var xVal = scrollY.interpolate({
    inputRange: [0, 70, 77],
    outputRange: [0, width / 2 - 50, width / 2 - 50],
  });
  return (
    <Animated.View
      style={[
        styles.title,
        { transform: [{ translateY: yVal }, { translateX: xVal }] },
      ]}>
      <Text style={styles.titleText}>{title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    top: -height + 80,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    marginLeft: 0,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Component;
