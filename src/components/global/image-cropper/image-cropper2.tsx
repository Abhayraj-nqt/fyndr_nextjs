import { Button, Slider } from "antd";
import React, { useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper2 = ({ src, handleSaveClick }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [rotation, setRotation] = useState(0);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const handleZoomChange = (zoomValue) => {
    setZoom(zoomValue);
  };
  const handleRotateChange = (rotation) => {
    setRotation(rotation);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1));
  };
  const handleRotateLeft = () => {
    setRotation((rotateValue) => Math.max(rotateValue - 2, -180));
  };

  const handleRotateRight = () => {
    setRotation((rotateValue) => Math.min(rotateValue + 2, 180));
  };

  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "50vh" }}>
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={2 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={handleZoomChange}
          onRotationChange={handleRotateChange}
          classes={{
            containerClassName: "cropper-container",
            cropAreaClassName: "cropper-cropArea",
          }}
          className="ignore-click-outside"
        />
      </div>

      <div style={{ width: "100%", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <span
            onClick={handleZoomOut}
            className="ignore-click-outside"
            style={{
              fontWeight: "bolder",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            -
          </span>
          <Slider
            value={zoom}
            min={1}
            step={0.1}
            max={3}
            onChange={(values) => setZoom(values)}
            style={{ width: "50%" }}
            className="ignore-click-outside"
          />
          <span
            onClick={handleZoomIn}
            className="ignore-click-outside"
            style={{
              fontWeight: "bolder",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            +
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <span
            onClick={handleRotateLeft}
            style={{ cursor: "pointer" }}
            className="ignore-click-outside"
          >
            <i class="fa fa-rotate-left ignore-click-outside"></i>
          </span>
          <Slider
            value={rotation}
            min={-180}
            max={180}
            style={{ width: "50%" }}
            step={2}
            className="ignore-click-outside"
            onChange={(values) => {
              setRotation(values);
            }}
          />
          <span
            onClick={handleRotateRight}
            style={{ cursor: "pointer" }}
            className="ignore-click-outside"
          >
            <i class="fa fa-rotate-right ignore-click-outside"></i>
          </span>
        </div>
        <Button
          className="ignore-click-outside"
          onClick={() => {
            handleSaveClick(croppedAreaPixels, rotation);
          }}
          type="primary"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ImageCropper2;
