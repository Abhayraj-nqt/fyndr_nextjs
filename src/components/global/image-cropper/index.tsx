"use client";

import { useState, useCallback, useRef } from "react";
import Cropper, { type Point, type Area } from "react-easy-crop";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  pixelCrop: Area
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Set canvas dimensions to the cropped area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  return canvas.toDataURL("image/jpeg");
}

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
  aspectRatio?: number;
}

const ImageCropper = ({
  imageSrc,
  onCropComplete,
  aspectRatio = 1,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const onCropChange = useCallback((location: Point) => {
    setCrop(location);
  }, []);

  const onZoomChange = useCallback((value: number[]) => {
    setZoom(value[0]);
  }, []);

  const onCropCompleteCallback = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropImage = useCallback(async () => {
    try {
      setIsCropping(true);
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error("Error cropping image:", e);
    } finally {
      setIsCropping(false);
    }
  }, [croppedAreaPixels, imageSrc, onCropComplete]);

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Crop Image</CardTitle>
        <CardDescription>
          Adjust the crop area to your preference
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6 h-96 w-full overflow-hidden rounded-md bg-gray-100">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={(value) => setZoom(value)}
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Zoom</p>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={onZoomChange}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleCropImage}
          disabled={isCropping}
          className="ml-2"
        >
          {isCropping ? "Processing..." : "Crop Image"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageCropper;
