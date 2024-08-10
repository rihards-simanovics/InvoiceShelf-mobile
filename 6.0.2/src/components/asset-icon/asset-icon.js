import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {IProps} from './type.d';

/**
 * AssetIcon component that renders a FontAwesome5 icon with customizable properties.
 *
 * @param {IProps} props - The properties for the AssetIcon component.
 * @returns {JSX.Element} The rendered FontAwesome5 icon.
 */
export const AssetIcon: FC<IProps> = (props) => {
  const {name, style, size, solid, color} = props;

  return (
    <Icon name={name} size={size} color={color} solid={solid} style={style} />
  );
};
