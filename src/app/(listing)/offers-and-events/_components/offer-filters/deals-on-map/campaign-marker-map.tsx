import { auth } from "@/auth";
import { GoogleMapWithProvider } from "@/components/global/google-map/google-map";
import { DEFAULT_LOCATION } from "@/constants";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const CampaignMarkerMap = async () => {
  const locationPayload = DEFAULT_LOCATION;

  const session = await auth();
  const user = session?.user;

  if (user && user.location) {
    locationPayload.lat = user?.location.lat;
    locationPayload.lng = user?.location.lng;
  }

  // if (lat && lng) {
  //   locationPayload.lat = Number(lat);
  //   locationPayload.lng = Number(lng);
  // }

  return (
    <>
      {API_KEY ? (
        <div className="">
          <GoogleMapWithProvider
            apiKey={API_KEY}
            markers={[]}
            height={250}
            className="mb-4"
            config={{
              // center: { lat: 40.7128, lng: -74.006 },
              center: locationPayload,
              zoom: 12,
              zoomControl: true,
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
            }}
            // renderMarkerCard={renderMarkerCard}
            // onMarkerClick={(marker) => setSelectedMarker(marker)}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CampaignMarkerMap;
