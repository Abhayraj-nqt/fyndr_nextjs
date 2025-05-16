"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { type Point, type Area } from "react-easy-crop";

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
  pixelCrop: Area,
  rotation = 0
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // Set canvas dimensions to handle rotation
  canvas.width = safeArea;
  canvas.height = safeArea;

  // Translate canvas context to center
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // Draw rotated image
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  // Create a new canvas for the cropped image
  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("No 2d context");
  }

  // Set dimensions of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image
  croppedCtx.drawImage(
    canvas,
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
  return croppedCanvas.toDataURL("image/jpeg");
}

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel?: () => void;
  aspectRatio?: number;
  className?: string;
}

const ImageCropper = ({
  imageSrc,
  onCropComplete,
  onCancel,
  aspectRatio = 2, // Default 2:1 ratio as requested
  className = "",
}: ImageCropperProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const onCropChange = useCallback((location: Point) => {
    setCrop(location);
  }, []);

  const onZoomChange = useCallback((value: number[]) => {
    setZoom(value[0]);
  }, []);

  const onRotationChange = useCallback((value: number[]) => {
    setRotation(value[0]);
  }, []);

  const onCropCompleteCallback = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleZoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1));
  }, []);

  const handleRotateLeft = useCallback(() => {
    setRotation((prevRotation) => Math.max(prevRotation - 10, -180));
  }, []);

  const handleRotateRight = useCallback(() => {
    setRotation((prevRotation) => Math.min(prevRotation + 10, 180));
  }, []);

  const handleCropImage = useCallback(async () => {
    try {
      setIsCropping(true);
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          rotation
        );
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error("Error cropping image:", e);
    } finally {
      setIsCropping(false);
    }
  }, [croppedAreaPixels, imageSrc, onCropComplete, rotation]);

  return (
    <Card className={`mx-auto w-full max-w-2xl ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle>Crop Image</CardTitle>
        <CardDescription>
          Adjust the crop area to your preference
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4 h-80 w-full overflow-hidden rounded-md bg-gray-100">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspectRatio}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={(value) => setZoom(value)}
            onRotationChange={(value) => setRotation(value)}
          />
        </div>
        <div className="space-y-4">
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
              onValueChange={onZoomChange}
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
              step={10}
              onValueChange={onRotationChange}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleCropImage} disabled={isCropping}>
          {isCropping ? "Processing..." : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageCropper;
