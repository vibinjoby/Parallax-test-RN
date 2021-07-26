import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import ScrollableContent from './components/ScrollableContent';

type RootStackParamList = {
  Home: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation, route }: Props) => {
  const Render = () => (
    <>
      <View style={styles.rowStyle}>
        <Text>Data</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Data</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Data</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Data</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Data</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Data</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Data</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Data</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Data</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Data</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Data</Text>
      </View>
    </>
  );

  return (
    <ScrollableContent
      title="Invoices"
      navigation={navigation}
      route={route}
      children={<Render />}
    />
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    height: 60,
    borderWidth: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
