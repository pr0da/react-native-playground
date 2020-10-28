import React, { useRef, useEffect } from 'react';
import { Button, View } from 'react-native';
import ArcBase from './ArcBase';
import Reanimated, {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const RandomArc = () => {
  const arcAngle = useSharedValue(Math.random() * 360);
  const animate = () => {
    arcAngle.value = withTiming(Math.random() * 360, {
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    });
  };
  const rotation = useDerivedValue(() => arcAngle.value / 2);

  return (
    <>
      <ArcBase
        color="coral"
        diameter={200}
        width={20}
        arcSweepAngle={arcAngle}
        lineCap="round"
        rotation={rotation}
      />
      <View style={{ paddingTop: 20 }}>
        <Button title="Animate Arc!" onPress={animate} />
      </View>
    </>
  );
};

export default RandomArc;
