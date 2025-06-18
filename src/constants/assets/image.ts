const PREFIX = "/images";

const IMAGES = {
  ABOUT_US: {
    QR_CODE: `${PREFIX}`,
  },
  PLACEHOLDER: {
    FYNDR: `${PREFIX}/placeholder-fyndr.svg`,
  },
  ILLUSTRATION: {
    EMPTY: `${PREFIX}/empty-illustration.svg`,
    ERROR: `${PREFIX}/error-illustration.svg`,
  },
  LOGO: {},
  MOBILE: {
    GOOGLE_PLAY_STORE: `${PREFIX}`,
    APPLE_APP_STORE: `${PREFIX}`,
  },
  CROWN: `${PREFIX}/crown.png`,
} as const;

export default IMAGES;
