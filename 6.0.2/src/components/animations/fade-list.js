import React, {Component} from 'react';
import {Animated} from 'react-native';
import {IProps, IStates} from './type.d';

/**
 * FadeListAnimation component that animates the opacity of its children
 * when it mounts.
 */
export class FadeListAnimation extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {opacity: new Animated.Value(0)}; // Initialize opacity to 0
  }

  componentDidMount() {
    this.fadeIn(); // Start fade-in animation on mount
  }

  /**
   * Fade in the component by animating the opacity.
   */
  fadeIn = () => {
    const {delay = 0} = this.props;
    const timeout = (callback) => setTimeout(() => callback(), delay);

    timeout(() => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {}); // Start the animation
    });
  };

  render() {
    const {children} = this.props;
    const {opacity} = this.state;

    const contentOffsetY = opacity.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [15, 5, 0], // Adjust vertical position during fade
    });

    return (
      <Animated.View
        style={{
          opacity: opacity,
          transform: [{translateY: contentOffsetY}],
        }}
      >
        {children} // Render children with animated opacity
      </Animated.View>
    );
  }
}
