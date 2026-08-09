import { useCallback } from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
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
  /**
   * `StyleProp` rather than `ViewStyle | ViewStyle[]`: callers compose these
   * arrays from conditionals and from `elevation()`, both of which introduce
   * `false`/`null` entries that the narrower type rejects even though React
   * Native accepts them.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Whether `disabled` should also fade the element out. On by default, which
   * is right for a *control* — an action you cannot take has to look like one.
   *
   * Off for something disabled because it has become **content**. Open
   * practice locks its answer rows once the question is answered, so the
   * learner cannot keep guessing; that is the same `disabled` flag, but those
   * rows are then the thing they are meant to read, and the revealed correct
   * answer was being drawn at half opacity — against a `successSoft` fill, and
   * in an app that checks every other text pair to 4.5:1. Interaction and
   * legibility are separate questions and this is what keeps them apart.
   */
  dimWhenDisabled?: boolean;
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
  dimWhenDisabled = true,
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
      style={[style, animatedStyle, disabled && dimWhenDisabled && { opacity: 0.5 }]}
      {...rest}
    />
  );
}
