import React, { useCallback } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import ReanimatedArc from './ReanimatedArc';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  absolute: {
    position: 'absolute',
  },
  text: {
    transform: [{ translateY: -10 }],
    fontSize: 40,
  },
});

const Progress = () => {
  const arcAngle = useSharedValue(Math.random() * 240);
  const randomizeProgress = useCallback(() => {
    arcAngle.value = withTiming(Math.random() * 240, {
      easing: Easing.inOut(Easing.quad),
      duration: 1000,
    });
  }, []);
  const text = useDerivedValue(
    () => `${Math.round((arcAngle.value / 240) * 100)}%`
  );

  return (
    <View>
      <View style={styles.container}>
        <ReanimatedArc
          color="lightgrey"
          diameter={200}
          width={20}
          arcSweepAngle={240}
          lineCap="round"
          rotation={240}
          style={styles.absolute}
        />
        <ReanimatedArc
          color="purple"
          diameter={200}
          width={20}
          arcSweepAngle={arcAngle}
          lineCap="round"
          rotation={240}
          style={styles.absolute}
        />
        <ReText style={styles.text} text={text} />
      </View>
      <Button title="Randomize progress" onPress={randomizeProgress} />
    </View>
  );
};

export default Progress;
