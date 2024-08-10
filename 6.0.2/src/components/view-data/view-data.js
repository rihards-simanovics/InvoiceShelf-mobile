import React from 'react';
import {View, Text} from '@/components';
import {commonSelector} from 'stores/common/selectors';
import {connect} from 'react-redux';
import {IProps} from './type.d';

/**
 * ViewDataContainer component that displays data fields.
 * It can display a single field or a pair of fields based on the `inPairs` prop.
 *
 * @param {IProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered component.
 */
export const ViewDataContainer = (props: IProps) => {
  const {label, inPairs, values, theme, first, second} = props;

  /**
   * Label component to display the field label.
   *
   * @param {Object} param - The props for the Label component.
   * @param {string} param.label - The label text to display.
   * @returns {JSX.Element} The rendered label.
   */
  const Label = ({label}) => {
    return (
      <Text h5 color={theme?.text?.secondaryColor} theme={theme}>
        {label}
      </Text>
    );
  };

  /**
   * Value component to display the field value.
   *
   * @param {Object} param - The props for the Value component.
   * @param {string} param.value - The value text to display.
   * @returns {JSX.Element} The rendered value.
   */
  const Value = ({value}) => {
    return (
      <Text
        h5
        mt-2
        color={theme?.text?.sixthColor}
        numberOfLines={1}
        medium={theme?.mode === 'dark'}
      >
        {value}
      </Text>
    );
  };

  return (
    <View mt-20>
      {inPairs ? (
        <View flex-row>
          <View flex={1} justify-between>
            <Label label={first?.label} />
            <Value value={first?.values} />
          </View>
          <View flex={1} justify-between>
            <Label label={second?.label} />
            <Value value={second?.values} />
          </View>
        </View>
      ) : (
        <>
          <Label label={label} />
          <Value value={values} />
        </>
      )}
    </View>
  );
};

/**
 * Maps the Redux state to the component's props.
 *
 * @param {Object} state - The Redux state.
 * @returns {Object} The mapped props.
 */
const mapStateToProps = (state) => commonSelector(state);

/**
 * Connected ViewData component that connects to the Redux store.
 */
export const ViewData = connect(mapStateToProps)(ViewDataContainer);
