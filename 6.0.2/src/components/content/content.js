import React from 'react';
import {Loading} from '../loading';
import {Empty} from '../empty';
import {FadeAnimation} from '../animations';
import {IProps} from './type.d';

/**
 * Content component that conditionally renders children, a loading indicator,
 or an empty state based on the provided props.
 *
 * @param {IProps} props - The component props.
 * @returns {JSX.Element} The rendered content component.
 */
export const Content = ({
  children,
  withLoading = false,
  loadingProps,
  emptyProps,
  theme,
}: IProps) => {
  // Render empty state if specified
  if (emptyProps?.is) {
    return <Empty {...emptyProps} theme={theme} />;
  }

  // Render loading state if specified
  if (withLoading) {
    return (
      <>
        {children}
        {loadingProps && loadingProps.is && (
          <Loading
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
            {...loadingProps}
            theme={theme}
          />
        )}
      </>
    );
  }

  // Render loading state if loadingProps is specified
  if (loadingProps?.is) {
    return <Loading {...loadingProps} theme={theme} />;
  }

  // Render children wrapped in a fade animation
  return <FadeAnimation>{children}</FadeAnimation>;
};
