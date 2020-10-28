import React, { useEffect } from 'react';
import Reanimated, {
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ReanimatedArcBase, { Props as ReanimatedArcBaseProps } from './ArcBase';

type Props = Omit<ReanimatedArcBaseProps, 'arcSweepAngle' | 'rotation'> & {
  arcSweepAngle: number;
  rotation: number;
  initialAnimation: boolean;
  animationDuration: number;
  easing: Reanimated.EasingFunction;
};

function Arc(props: Props) {
  const {
    arcSweepAngle,
    rotation,
    initialAnimation,
    diameter,
    width,
    color,
    lineCap,
    hideSmallAngle,
    style,
  } = props;
  const arcSweepAngleValue = useSharedValue(0);
  const rotationValue = useSharedValue(0);

  useEffect(() => {
    arcSweepAngleValue.value = withTiming(arcSweepAngle);
  }, [arcSweepAngle]);

  useEffect(() => {
    rotationValue.value = withTiming(rotation, { duration: 800 });
  }, [rotation]);

  return (
    <ReanimatedArcBase
      arcSweepAngle={arcSweepAngleValue}
      rotation={rotationValue}
      diameter={diameter}
      width={width}
      color={color}
      lineCap={lineCap}
      hideSmallAngle={hideSmallAngle}
      style={style}
    />
  );
}

export default Arc;
