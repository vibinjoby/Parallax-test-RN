import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { StackScreenProps } from '@react-navigation/stack';

import MovableTitle from './components/MovableTitle';

type RootStackParamList = {
  Home: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: Props) => {
  const [scrollY] = useState(new Animated.Value(0));
  const dataSource = [
    'Dummy',
    'data',
    'Dummy',
    'data',
    'Dummy',
    'data',
    'Dummy',
    'data',
    'Dummy',
    'data',
    'Dummy',
    'data',
    'Dummy',
  ];

  var headerOpacity = scrollY.interpolate({
    inputRange: [0, 70, 71],
    outputRange: [0, 0, 1],
  });
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        opacity: headerOpacity,
      },
      headerLeft: () => <HeaderBackButton />,
      headerBackground: () => (
        <Animated.View style={[styles.headerBg, { opacity: headerOpacity }]} />
      ),
      headerTransparent: true,
    });
  }, [headerOpacity, navigation]);

  const renderRow = (rowData: string) => (
    <View style={styles.rowStyle}>
      <Text>{rowData}</Text>
    </View>
  );

  const renderScroll = (props: any) => (
    <Animated.ScrollView
      {...props}
      bounces={false}
      scrollEventThrottle={16}
      contentContainerStyle={{
        paddingTop: Platform.OS === 'ios' ? 100 : 70,
      }}
      onScroll={Animated.event(
        [
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ],
        {
          useNativeDriver: true,
        },
      )}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dataSource}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={(_, index) => index.toString()}
        renderScrollComponent={renderScroll}
      />
      <MovableTitle title={'Invoices'} scrollY={scrollY} />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerBg: {
    backgroundColor: 'white',
    ...StyleSheet.absoluteFillObject,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  rowStyle: {
    height: 60,
    borderWidth: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
