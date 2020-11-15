import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ReanimatedArc from './ReanimatedArc';

const spaceBetweenArcs = 20;
const generateValues = () => {
  const firstSecondRatio = Math.random() * 75;
  const first = Math.random() * 50 + firstSecondRatio;
  const second = Math.random() * 50 + (150 - firstSecondRatio);
  return [first, second];
};

const getRotation = () => {
  return Math.random() * 120 - 60;
};

const Donut = () => {
  const initialValues = generateValues();
  const alpha = useSharedValue(initialValues[0]);
  const beta = useSharedValue(initialValues[1]);
  const gamma = useDerivedValue(
    () => 360 - alpha.value - beta.value - 3 * spaceBetweenArcs
  );
  const rotation = useSharedValue(getRotation());

  const setNewDonut = () => {
    const values = generateValues();
    const animationConfig = {
      duration: 800,
    };
    alpha.value = withTiming(values[0], animationConfig);
    beta.value = withTiming(values[1], animationConfig);
    rotation.value = withTiming(getRotation(), animationConfig);
  };

  return (
    <View>
      <ReanimatedArc
        color="#8EA604"
        diameter={200}
        width={20}
        arcSweepAngle={alpha}
        lineCap="round"
        rotation={rotation}
        style={{ paddingBottom: 20 }}
      />
      <ReanimatedArc
        color="#FB6107"
        diameter={200}
        width={20}
        arcSweepAngle={beta}
        lineCap="round"
        rotation={useDerivedValue(
          () => rotation.value + alpha.value + spaceBetweenArcs
        )}
        style={styles.absolute}
      />
      <ReanimatedArc
        color="#FEC601"
        diameter={200}
        width={20}
        arcSweepAngle={gamma}
        lineCap="round"
        rotation={useDerivedValue(
          () => rotation.value + alpha.value + beta.value + 2 * spaceBetweenArcs
        )}
        style={styles.absolute}
      />
      <Button title="Animate Arc!" onPress={setNewDonut} />
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
});

export default Donut;
