import React, {Component} from 'react';
import {Animated} from 'react-native';
import {IProps, IStates} from './type.d';

/**
 * FadeAnimation component that animates the opacity of its children
 * when it mounts.
 */
export class FadeAnimation extends Component<IProps, IStates> {
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
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.props.duration ?? 200, // Use provided duration or default to 200ms
      useNativeDriver: true,
    }).start(() => {}); // Start the animation
  };

  render() {
    return (
      <Animated.View style={{flex: 1, opacity: this.state.opacity}}>
        {this.props.children} // Render children with animated opacity
      </Animated.View>
    );
  }
}
