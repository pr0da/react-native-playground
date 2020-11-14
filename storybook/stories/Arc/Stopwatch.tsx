import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import ArcBase from './ArcBase';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
  },
  time: {
    fontSize: 40,
  },
});

const Stopwatch = () => {
  const progress = useSharedValue(0);

  const progressText = useDerivedValue(
    () => `00:${progress.value < 10 ? '0' : ''}${Math.floor(progress.value)}`
  );

  const arcSweepAngle = useDerivedValue(() =>
    withTiming(Math.floor(progress.value) * 6, {
      duration: 150,
    })
  );

  return (
    <View>
      <View style={[styles.container]}>
        <ArcBase
          color="lightgrey"
          diameter={195}
          width={10}
          arcSweepAngle={360}
          lineCap="round"
        />
        <ArcBase
          color="#8EA604"
          diameter={200}
          width={16}
          arcSweepAngle={arcSweepAngle}
          lineCap="round"
          style={styles.absolute}
        />
        <ReText
          style={[styles.absolute, styles.time]}
          text={progressText}
        ></ReText>
      </View>
      <View style={{ paddingTop: 20 }}>
        <Button
          title="Start stopwatch"
          onPress={() => {
            progress.value = 30;
            progress.value = withTiming(0, {
              duration: 30 * 1000,
              easing: Easing.linear,
            });
          }}
        />
      </View>
    </View>
  );
};

export default Stopwatch;
