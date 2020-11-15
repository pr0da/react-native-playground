import * as React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';
import Animated, {
  useDerivedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedPath = Animated.createAnimatedComponent(Path);

export type Props = {
  diameter: number;
  width: number;
  arcSweepAngle?: number | Animated.SharedValue<number>;
  rotation?: number | Animated.SharedValue<number>;
  color?: string | Animated.SharedValue<number>;
  lineCap?: 'round' | 'butt' | 'square';
  hideSmallAngle?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function ReanimatedArc(props: Props) {
  const {
    diameter,
    width,
    color = 'black',
    style,
    lineCap = 'round',
    rotation,
    arcSweepAngle,
    hideSmallAngle = true,
  } = props;

  const outerRadius = diameter / 2;
  const pivot = outerRadius;
  const animatedStyle = useAnimatedStyle(() => {
    const r = typeof rotation === 'number' ? rotation : rotation?.value ?? 0;
    return {
      transform: [
        {
          rotate: `${r}deg`,
        },
      ],
    };
  });
  const innerRadius = diameter / 2 - width / 2;

  const circlePath = useDerivedValue(() => {
    const polarToCartesian = (
      centerX: number,
      centerY: number,
      radius: number,
      angleInDegrees: number
    ) => {
      var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    };

    const endAngle = Math.min(
      typeof arcSweepAngle === 'number'
        ? arcSweepAngle
        : arcSweepAngle?.value ?? 360,
      360
    );
    const radius = innerRadius;
    const startAngle = 0;
    const start = polarToCartesian(
      outerRadius,
      outerRadius,
      radius,
      endAngle * 0.9999
    );

    if (hideSmallAngle && endAngle + startAngle <= 1) {
      return '';
    }

    const end = polarToCartesian(outerRadius, outerRadius, radius, startAngle);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    const path = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    return path;
  });

  const animatedProps = useAnimatedProps(() => ({
    d: circlePath.value,
    stroke: typeof color === 'string' ? color : color?.value,
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      <Svg
        width={diameter}
        height={diameter}
        viewBox={`${-pivot} ${-pivot} ${diameter} ${diameter}`}
      >
        <AnimatedG>
          <AnimatedPath
            animatedProps={animatedProps}
            strokeWidth={width}
            strokeLinecap={lineCap}
            fill="transparent"
            transform={`translate(${-pivot} ${-pivot})`}
          />
        </AnimatedG>
      </Svg>
    </Animated.View>
  );
}
