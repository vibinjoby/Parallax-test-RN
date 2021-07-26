import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Platform, Dimensions } from 'react-native';
import { HeaderBackButton, StackScreenProps } from '@react-navigation/stack';

import MovableTitle from '../MovableTitle';

type ComponentProps = {
  title: string;
  children?: React.ReactNode;
};

type RootStackParamList = {
  Home: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Home'>;
const screenHeight = Dimensions.get('screen').height;

const Component = ({ title, navigation, children }: Props & ComponentProps) => {
  const [scrollY] = useState(new Animated.Value(0));
  const [contentHeight, setContentHeight] = useState(0);
  var headerOpacity = scrollY.interpolate({
    inputRange: [0, 70, 71],
    outputRange: [0, 0, 1],
  });

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        opacity: contentHeight > screenHeight + 50 ? headerOpacity : 1,
      },
      headerLeft: () => <HeaderBackButton />,
      headerBackground: () => (
        <Animated.View
          style={[
            styles.headerBg,
            { opacity: contentHeight > screenHeight + 50 ? headerOpacity : 1 },
          ]}
        />
      ),
      headerTransparent: true,
    });
  }, [headerOpacity, navigation]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: Platform.OS === 'ios' ? 100 : 70,
        }}
        onContentSizeChange={(_, h) => setContentHeight(h)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}>
        {children}
      </Animated.ScrollView>
      {contentHeight > screenHeight + 50 && (
        <MovableTitle title={title} scrollY={scrollY} />
      )}
    </View>
  );
};

export default Component;

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
