import { useCallback } from 'react';
import { Pressable, type PressableProps, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING = { damping: 18, stiffness: 260, mass: 0.6 } as const;

export type PressableScaleProps = PressableProps & {
  /** How far the element shrinks while held. */
  scaleTo?: number;
  style?: ViewStyle | ViewStyle[];
};

/**
 * Wraps `Pressable` with a spring scale-down on touch. Used for every tappable
 * card and button so the whole app responds physically to touch.
 */
export function PressableScale({
  scaleTo = 0.97,
  style,
  onPressIn,
  onPressOut,
  disabled,
  ...rest
}: PressableScaleProps) {
  const scale = useSharedValue(1);

  const handlePressIn = useCallback<NonNullable<PressableProps['onPressIn']>>(
    (event) => {
      scale.value = withSpring(scaleTo, SPRING);
      onPressIn?.(event);
    },
    [onPressIn, scale, scaleTo],
  );

  const handlePressOut = useCallback<NonNullable<PressableProps['onPressOut']>>(
    (event) => {
      scale.value = withSpring(1, SPRING);
      onPressOut?.(event);
    },
    [onPressOut, scale],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, animatedStyle, disabled && { opacity: 0.5 }]}
      {...rest}
    />
  );
}
