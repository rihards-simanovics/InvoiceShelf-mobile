// Import necessary modules
import {colors} from '@/styles';

/**
 * Object representing the dark theme configuration.
 */
export const darkTheme = {
  /** Theme mode */
  mode: 'dark',

  /** Background color */
  backgroundColor: colors.black,

  /** Secondary background color */
  secondaryBgColor: colors.black2,

  /** Third background color */
  thirdBgColor: colors.gray6,

  text: {
    /** Primary text color */
    primaryColor: colors.white2,
    /** Secondary text color */
    secondaryColor: colors.white,
    /** Third text color */
    thirdColor: colors.white7,
    /** Fourth text color */
    fourthColor: colors.white2,
    /** Fifth text color */
    fifthColor: colors.white4,
    /** Sixth text color */
    sixthColor: colors.white2,
    /** Seventh text color */
    seventhColor: colors.white2,
  },

  // Component Input
  input: {
    /** Input text color */
    color: colors.white2,
    /** Input background color */
    backgroundColor: colors.gray6,
    /** Validation background color */
    validationBackgroundColor: colors.danger,
    /** Placeholder text color */
    placeholderColor: colors.white4,
    /** Input border color */
    borderColor: colors.gray6,
    /** Disabled input background color */
    disableBackgroundColor: colors.dark2,
    /** First input color */
    firstColor: colors.dark2,
  },

  // Component Icons
  icons: {
    /** Primary icon background color */
    primaryBgColor: colors.primaryLight,
    /** Secondary icon background color */
    secondaryBgColor: colors.white,

    /** Primary icon color */
    primaryColor: colors.white2,
    /** Secondary icon color */
    secondaryColor: colors.white4,
    /** Third icon color */
    thirdColor: colors.white2,
    /** Fourth icon color */
    fourthColor: colors.white6,

    plus: {
      /** Plus icon background color */
      backgroundColor: colors.black,
    },
    circle: {
      /** Circle icon background color */
      backgroundColor: colors.primaryLight,
      /** Circle icon secondary background color */
      secondaryBgColor: colors.white3,
      /** Circle icon border color */
      borderColor: colors.black2,
    },
    eye: {
      /** Eye icon color */
      color: colors.white2,
    },
    filter: {
      /** Filter icon color */
      color: colors.primaryLight,
    },
    biometric: {
      /** Biometric icon background color */
      backgroundColor: colors.white,
    },
  },

  // Component Header
  header: {
    primary: {
      /** Primary header color */
      color: colors.white2,
    },
    secondary: {
      /** Secondary header color */
      color: colors.white,
    },
  },

  // Component List Item
  listItem: {
    primary: {
      /** Primary list item color */
      color: colors.white3,
    },
    secondary: {
      /** Secondary list item color */
      color: colors.white,
    },
    third: {
      /** Third list item color */
      color: colors.white4,
    },
    fourth: {
      /** Fourth list item color */
      color: colors.white4,
    },
    fifth: {
      /** Fifth list item color */
      color: colors.white,
    },
  },

  // Component Tab
  tab: {
    /** Active tab color */
    activeColor: colors.white2,
    /** Tab color */
    color: colors.gray5,
    /** Tab border color */
    borderColor: colors.gray6,
    /** Tab border bottom color */
    borderBottomColor: colors.white2,
  },

  // Navigation Tab
  tabNavigator: {
    /** Tab navigator background color */
    backgroundColor: colors.black2,
    /** Active tab text color */
    activeTextColor: colors.primaryLight,
    /** Inactive tab text color */
    inActiveTextColor: colors.white6,
    /** Active tab icon color */
    activeIconColor: colors.primaryLight,
    /** Inactive tab icon color */
    inActiveIconColor: colors.white6,
  },

  // Component Divider
  divider: {
    /** Primary divider background color */
    primaryBgColor: colors.gray7,
    /** Secondary divider background color */
    secondaryBgColor: colors.gray7,
  },

  // Component Avatar
  avatar: {
    /** Avatar background color */
    bgColor: colors.gray7,
  },

  // ViewLabel
  viewLabel: {
    /** Primary view label color */
    primaryColor: colors.white4,
    /** Secondary view label color */
    secondaryColor: colors.white4,
    /** Third view label color */
    thirdColor: colors.primaryLight,
    /** Fourth view label color */
    fourthColor: colors.white4,
    /** Fifth view label color */
    fifthColor: colors.white2,
  },

  // Card
  card: {
    primary: {
      /** Primary card background color */
      bgColor: colors.gray7,
    },
    secondary: {
      /** Secondary card background color */
      bgColor: colors.dark5,
    },
  },

  // Button
  button: {
    disable: {
      /** Disabled button background color */
      bgColor: colors.black2,
    },
  },
};
