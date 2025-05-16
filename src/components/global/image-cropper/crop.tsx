"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { type Point, type Area } from "react-easy-crop";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

// Function to create a crop preview
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

// This function extracts a cropped image from the source image
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  imageQuality = 0.95 // Add quality parameter
): Promise<string> {
  const image = await createImage(imageSrc);

  // Create final canvas to draw the result
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Create a temporary canvas for rotation handling if needed
  let finalImage = image;
  if (rotation !== 0) {
    const rotationCanvas = document.createElement("canvas");
    const rotationCtx = rotationCanvas.getContext("2d");

    if (!rotationCtx) {
      throw new Error("No 2d context for rotation");
    }

    // Size the canvas to accommodate the rotated image
    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    rotationCanvas.width = safeArea;
    rotationCanvas.height = safeArea;

    // Move to center, rotate, and then draw the image
    rotationCtx.save();
    rotationCtx.translate(safeArea / 2, safeArea / 2);
    rotationCtx.rotate((rotation * Math.PI) / 180);
    rotationCtx.translate(-safeArea / 2, -safeArea / 2);

    // Draw rotated image and restore context
    rotationCtx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );
    rotationCtx.restore();

    // Create a temporary image from the rotation canvas
    const rotatedImageUrl = rotationCanvas.toDataURL("image/png");
    finalImage = await createImage(rotatedImageUrl);
  }

  // Ensure proper rendering with proper background
  ctx.fillStyle = "white"; // Add a white background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the cropped image directly to the main canvas
  ctx.drawImage(
    finalImage,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string with specific quality
  return canvas.toDataURL("image/jpeg", imageQuality);
}

interface CropProps {
  src: string;
  handleSaveClick: (croppedAreaPixels: Area, rotation: number) => void;
  onCancel?: () => void;
  aspectRatio?: number;
}

const Crop = ({
  src,
  handleSaveClick,
  onCancel,
  aspectRatio = 2 / 1, // Default 2:1 ratio like your previous component
}: CropProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const onCropComplete = useCallback((_, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleZoomChange = useCallback((value: number[]) => {
    setZoom(value[0]);
  }, []);

  const handleRotationChange = useCallback((value: number[]) => {
    setRotation(value[0]);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1));
  }, []);

  const handleRotateLeft = useCallback(() => {
    setRotation((prevRotation) => Math.max(prevRotation - 2, -180));
  }, []);

  const handleRotateRight = useCallback(() => {
    setRotation((prevRotation) => Math.min(prevRotation + 2, 180));
  }, []);

  const processAndSave = useCallback(async () => {
    try {
      setIsCropping(true);
      if (croppedAreaPixels) {
        // Process the cropped image with the improved getCroppedImg function
        const croppedImage = await getCroppedImg(
          src,
          croppedAreaPixels,
          rotation,
          0.95
        );

        // Create a Blob from the data URL
        const blob = await (await fetch(croppedImage)).blob();

        // Create a File from the Blob to match your original logic
        const file = new File([blob], "cropped-image.jpg", {
          type: "image/jpeg",
        });

        // Call the original handleSaveClick with the processed data
        handleSaveClick(croppedAreaPixels, rotation);
      }
    } catch (e) {
      console.error("Error processing cropped image:", e);
    } finally {
      setIsCropping(false);
    }
  }, [croppedAreaPixels, src, rotation, handleSaveClick]);

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="relative mb-6 h-[50vh] w-full">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={(value) => setZoom(value)}
            onRotationChange={(value) => setRotation(value)}
            classes={{
              containerClassName: "cropper-container",
              cropAreaClassName: "cropper-cropArea",
            }}
            className="ignore-click-outside"
          />
        </div>

        <div className="w-full space-y-4">
          {/* Zoom Controls */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Zoom</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={handleZoomOut}
                >
                  <span className="text-lg font-bold">-</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={handleZoomIn}
                >
                  <span className="text-lg font-bold">+</span>
                </Button>
              </div>
            </div>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={handleZoomChange}
              className="w-full"
            />
          </div>

          {/* Rotation Controls */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Rotation</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={handleRotateLeft}
                >
                  <span className="rotate-45">↶</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={handleRotateRight}
                >
                  <span className="rotate-45">↷</span>
                </Button>
              </div>
            </div>
            <Slider
              value={[rotation]}
              min={-180}
              max={180}
              step={2}
              onValueChange={handleRotationChange}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={processAndSave} disabled={isCropping}>
          {isCropping ? "Processing..." : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Crop;
