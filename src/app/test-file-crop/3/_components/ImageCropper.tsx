"use client";

import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
// import { ImageCropperProps, CropData } from "../types";
import { dataURLtoBlob } from "@/lib/file/file-upload";

export type ProcessedFileProps = {
  name: string;
  type: string;
  base64: string;
  base64Url: string;
  orgFile: File;
};

export type CropData = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FileUploaderProps = {
  onFileProcessed: (file: ProcessedFileProps) => void;
  enableCrop?: boolean;
  cropAspectRatio?: number;
  maxFileSizeMB?: number;
  allowedFileTypes?: string[];
  maxWidth?: number;
  maxHeight?: number;
  compressQuality?: number;
  className?: string;
  label?: string;
};

export type ImageCropperProps = {
  imageUrl: string;
  onCropComplete: (croppedImage: string, croppedBlob: Blob) => void;
  aspectRatio?: number;
  onCancel: () => void;
};

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  onCropComplete,
  aspectRatio = 1,
  onCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropData | null>(
    null
  );

  const handleCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: CropData) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const createCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;

    try {
      const canvas = document.createElement("canvas");
      const image = new Image();
      image.src = imageUrl;

      await new Promise((resolve) => {
        image.onload = resolve;
      });

      // Set dimensions
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Apply rotation and cropping
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      ctx.drawImage(
        image,
        croppedAreaPixels.x * scaleX,
        croppedAreaPixels.y * scaleY,
        croppedAreaPixels.width * scaleX,
        croppedAreaPixels.height * scaleY,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      const dataUrl = canvas.toDataURL("image/jpeg");
      const blob = dataURLtoBlob(dataUrl);
      onCropComplete(dataUrl, blob);
    } catch (error) {
      console.error("Error creating cropped image:", error);
    }
  }, [croppedAreaPixels, imageUrl, rotation, onCropComplete]);

  const handleZoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1));
  }, []);

  const handleRotateLeft = useCallback(() => {
    setRotation((rotateValue) => rotateValue - 90);
  }, []);

  const handleRotateRight = useCallback(() => {
    setRotation((rotateValue) => rotateValue + 90);
  }, []);

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardContent className="p-6">
        <div className="relative mb-6 h-64 w-full overflow-hidden rounded-md bg-gray-100 md:h-80">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Zoom</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomOut}
                  className="size-8"
                >
                  <ZoomOut className="size-4" />
                </Button>
                <div className="w-48">
                  <Slider
                    value={[zoom]}
                    min={1}
                    max={3}
                    step={0.1}
                    onValueChange={(values) => setZoom(values[0])}
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomIn}
                  className="size-8"
                >
                  <ZoomIn className="size-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="text-sm font-medium">Rotate</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleRotateLeft}>
                  <RotateCcw className="mr-2 size-4" />
                  Left
                </Button>
                <Button variant="outline" size="sm" onClick={handleRotateRight}>
                  <RotateCw className="mr-2 size-4" />
                  Right
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2 p-6 pt-0">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={createCroppedImage}>Apply</Button>
      </CardFooter>
    </Card>
  );
};

export default ImageCropper;
