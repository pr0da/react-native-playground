import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArcBase from './ArcBase';
import Animated, {
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { clamp } from 'react-native-redash';

const containerWidth = 200;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    width: 200,
    height: 90,
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
  },
});

const Slider: React.FC = () => {
  const touchX = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      touchX.value = event.x;
    },
  });
  const progress = useDerivedValue(() =>
    clamp(touchX.value / containerWidth, 0, 1)
  );
  const arcAngle = useDerivedValue(() => progress.value * 150);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0.4, 1]),
    };
  });

  return (
    <View>
      <View style={styles.container}>
        <ArcBase
          color="lightgrey"
          diameter={containerWidth}
          width={15}
          arcSweepAngle={150}
          lineCap="round"
          rotation={285}
          style={styles.absolute}
        />
        <Animated.View style={[styles.absolute, animatedStyle]}>
          <ArcBase
            color="yellow"
            diameter={containerWidth}
            width={15}
            arcSweepAngle={arcAngle}
            lineCap="round"
            rotation={285}
          />
        </Animated.View>
        <View style={[styles.absolute, { alignSelf: 'flex-start' }]}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
              style={{
                width: containerWidth - 10,
                height: 160,
              }}
            />
          </PanGestureHandler>
        </View>
      </View>
    </View>
  );
};

export default Slider;
