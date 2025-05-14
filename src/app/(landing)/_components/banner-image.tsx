import { onGetBackgroundImage } from "@/actions/others.action";
import { auth } from "@/auth";
import PlaceholderImage from "@/components/global/placeholder-image";
import { DEFAULT_LOCATION } from "@/constants";

type Props = {
  location: {
    lat: string;
    lng: string;
  };
};

const BannerImage = async ({ location: { lat, lng } }: Props) => {
  const locationPayload = DEFAULT_LOCATION;

  const session = await auth();
  const user = session?.user;

  if (user && user.location) {
    locationPayload.lat = user?.location.lat;
    locationPayload.lng = user?.location.lng;
  }

  if (lat && lng) {
    locationPayload.lat = Number(lat);
    locationPayload.lng = Number(lng);
  }

  const { success: bgSuccess, data: bgImage } =
    await onGetBackgroundImage(locationPayload);

  return (
    <PlaceholderImage
      src={
        bgSuccess && bgImage?.backgroundImageUrl
          ? bgImage?.backgroundImageUrl
          : "/images/home_banner_bg.webp"
      }
      alt="hero"
      fill
      priority
      fetchPriority="high"
      loading="eager"
      className="object-cover"
      placeholderImageUrl="/images/home_banner_bg.webp"
    />
  );
};

export default BannerImage;
