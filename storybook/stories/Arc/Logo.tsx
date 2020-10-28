import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import ArcBase from './ArcBase';

const App = () => {
  const arcAngle = useSharedValue(-90);
  const rotations = [
    useDerivedValue(() => arcAngle.value + 10),
    useDerivedValue(() => -1 * (arcAngle.value - 185)),
    arcAngle,
  ];

  useEffect(() => {
    arcAngle.value = withTiming(270, {
      duration: 2000,
      easing: Easing.inOut(Easing.quad),
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <ArcBase
        color="#121330"
        diameter={200}
        width={20}
        lineCap="round"
        arcSweepAngle={160}
        rotation={rotations[0]}
        style={styles.arc1}
      />
      <ArcBase
        color="#3eefd8"
        diameter={140}
        width={20}
        lineCap="round"
        arcSweepAngle={170}
        rotation={rotations[1]}
        style={styles.arc2}
      />
      <ArcBase
        color="#121330"
        diameter={80}
        width={20}
        lineCap="round"
        arcSweepAngle={180.1}
        rotation={rotations[2]}
        style={styles.arc3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 200,
    height: 200,
  },
  arc1: {
    position: 'absolute',
  },
  arc2: {
    position: 'absolute',
    left: 30,
    top: 30,
  },
  arc3: {
    position: 'absolute',
    left: 60,
    top: 60,
  },
});

export default App;
