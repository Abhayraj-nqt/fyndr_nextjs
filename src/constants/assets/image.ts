const PREFIX = "/images";

const IMAGES = {
  ABOUT_US: {
    QR_CODE: `${PREFIX}`,
  },
  PLACEHOLDER: {
    FYNDR: `${PREFIX}/fyndr-placeholder.svg`,
  },
  ILLUSTRATION: {
    EMPTY: `${PREFIX}/empty-illustration.svg`,
    ERROR: `${PREFIX}/error-illustration.svg`,
  },
  LOGO: {
    WHITE: `${PREFIX}/logo/site-logo.png`,
    WHITE_SMALL: `${PREFIX}/logo/site-logo-small.svg`,
    PRIMARY: `${PREFIX}/logo/site-logo-primary.png`,
    PRIMARY_SMALL: `${PREFIX}/logo/site-logo-primary-small.svg`,
  },
  MOBILE: {
    GOOGLE_PLAY_STORE: `${PREFIX}/logo/google-play-store.svg`,
    APPLE_APP_STORE: `${PREFIX}/logo/apple-app-store.svg`,
  },
  CROWN: `${PREFIX}/crown.png`,
} as const;

export default IMAGES;
