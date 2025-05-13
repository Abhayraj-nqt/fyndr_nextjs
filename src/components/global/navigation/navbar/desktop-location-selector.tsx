import LocationSelector from "../../location-selector";

const DesktopLocationSelector = () => {
  return (
    <div className="hidden w-full sm:flex">
      <LocationSelector inputClassName="w-full" />
    </div>
  );
};

export default DesktopLocationSelector;
