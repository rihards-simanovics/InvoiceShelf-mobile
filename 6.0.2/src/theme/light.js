// Import necessary modules
import {colors} from '@/styles';

/**
 * Object representing the light theme configuration.
 */
export const lightTheme = {
  /** Theme mode */
  mode: 'light',

  /** Background color */
  backgroundColor: colors.veryLightGray,

  /** Secondary background color */
  secondaryBgColor: colors.white,

  /** Third background color */
  thirdBgColor: colors.white,

  text: {
    /** Primary text color */
    primaryColor: colors.primary,
    /** Secondary text color */
    secondaryColor: colors.secondary,
    /** Third text color */
    thirdColor: colors.veryDarkGray,
    /** Fourth text color */
    fourthColor: colors.primaryLight,
    /** Fifth text color */
    fifthColor: colors.darkGray,
    /** Sixth text color */
    sixthColor: colors.dark,
    /** Seventh text color */
    seventhColor: colors.gray6,
  },

  // Component Input
  input: {
    /** Input text color */
    color: colors.dark2,
    /** Input background color */
    backgroundColor: colors.white,
    /** Validation background color */
    validationBackgroundColor: colors.dangerLight,
    /** Placeholder text color */
    placeholderColor: colors.darkGray,
    /** Input border color */
    borderColor: colors.lightGray,
    /** Disabled input background color */
    disableBackgroundColor: colors.lightGray,
    /** First input color */
    firstColor: colors.white10,
  },

  // Component Icons
  icons: {
    /** Primary icon background color */
    primaryBgColor: colors.primary,
    /** Secondary icon background color */
    secondaryBgColor: colors.primary,

    /** Primary icon color */
    primaryColor: colors.darkGray,
    /** Secondary icon color */
    secondaryColor: colors.darkGray,
    /** Third icon color */
    thirdColor: colors.dark2,
    /** Fourth icon color */
    fourthColor: colors.gray,

    plus: {
      /** Plus icon background color */
      backgroundColor: colors.white,
    },
    circle: {
      /** Circle icon background color */
      backgroundColor: colors.primary,
      /** Circle icon secondary background color */
      secondaryBgColor: colors.white,
      /** Circle icon border color */
      borderColor: colors.primaryLight2,
    },
    eye: {
      /** Eye icon color */
      color: colors.dark3,
    },
    filter: {
      /** Filter icon color */
      color: colors.primary,
    },
    biometric: {
      /** Biometric icon background color */
      backgroundColor: colors.dark4,
    },
  },

  // Component Header
  header: {
    primary: {
      /** Primary header color */
      color: colors.dark2,
    },
    secondary: {
      /** Secondary header color */
      color: colors.dark1,
    },
  },

  // Component List Item
  listItem: {
    primary: {
      /** Primary list item color */
      color: colors.dark2,
    },
    secondary: {
      /** Secondary list item color */
      color: colors.secondary,
    },
    third: {
      /** Third list item color */
      color: colors.white5,
    },
    fourth: {
      /** Fourth list item color */
      color: colors.darkGray,
    },
    fifth: {
      /** Fifth list item color */
      color: colors.dark,
    },
  },

  // Component Tab
  tab: {
    /** Active tab color */
    activeColor: colors.primary,
    /** Tab color */
    color: colors.darkGray,
    /** Tab border color */
    borderColor: colors.darkGray,
    /** Tab border bottom color */
    borderBottomColor: colors.primary,
  },

  // Navigation Tab
  tabNavigator: {
    /** Tab navigator background color */
    backgroundColor: colors.white,
    /** Active tab text color */
    activeTextColor: colors.primary,
    /** Inactive tab text color */
    inActiveTextColor: colors.dark2,
    /** Active tab icon color */
    activeIconColor: colors.primary,
    /** Inactive tab icon color */
    inActiveIconColor: colors.darkGray,
  },

  // Component Divider
  divider: {
    /** Primary divider background color */
    primaryBgColor: colors.gray,
    /** Secondary divider background color */
    secondaryBgColor: colors.lightGray,
  },

  // Component Avatar
  avatar: {
    /** Avatar background color */
    bgColor: colors.gray,
  },

  // ViewLabel
  viewLabel: {
    /** Primary view label color */
    primaryColor: colors.dark2,
    /** Secondary view label color */
    secondaryColor: colors.secondary,
    /** Third view label color */
    thirdColor: colors.primary,
    /** Fourth view label color */
    fourthColor: colors.veryDarkGray,
    /** Fifth view label color */
    fifthColor: colors.dark,
  },

  // Card
  card: {
    primary: {
      /** Primary card background color */
      bgColor: colors.veryLightGray,
    },
    secondary: {
      /** Secondary card background color */
      bgColor: colors.veryLightGray,
    },
  },

  // Button
  button: {
    disable: {
      /** Disabled button background color */
      bgColor: colors.lightGray,
    },
  },
};
