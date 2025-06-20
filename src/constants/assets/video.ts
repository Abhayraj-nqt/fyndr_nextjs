const PREFIX = "/videos";

const VIDEOS = {
  AUTH: {
    OVERLAY_MOBILE: `${PREFIX}/auth-overlay-mobile.mp4`,
    OVERLAY_WEB: `${PREFIX}/auth-overlay-web.mp4`,
  },
} as const;

export default VIDEOS;
