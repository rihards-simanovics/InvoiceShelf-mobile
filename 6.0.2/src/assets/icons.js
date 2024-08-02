import {isRTL} from '@/utils';

/**
 * font icons
 */
export const ICONS = {
  LEFT_LONG: 'long-arrow-alt-left',
  RIGHT: 'angle-right',
  PAINT: 'palette',
};

/**
 * text direction arrow icon
 */
export const ARROW_ICON = isRTL()
  ? 'long-arrow-alt-right'
  : 'long-arrow-alt-left';
