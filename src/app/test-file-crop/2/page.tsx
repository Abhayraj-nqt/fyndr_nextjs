import Crop from "@/components/crop-component";

// In your component
const handleSaveClick = (croppedAreaPixels, rotation) => {
  // Process the cropped image data
  console.log(croppedAreaPixels, rotation);
  // Do something with the cropped image
};

// In your JSX
<Crop
  src={yourImageSrc}
  handleSaveClick={handleSaveClick}
  aspectRatio={2 / 1} // optional, defaults to 2/1
  onCancel={() => setShowCropper(false)} // optional
/>;
