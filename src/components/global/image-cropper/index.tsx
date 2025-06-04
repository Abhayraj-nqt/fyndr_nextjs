"use client";

import {
  Minus,
  Plus,
  Rotate3D,
  ZoomIn,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";

import { Modal } from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  // createCropPreview,
  createCropPreview2,
  dataURLtoFile,
} from "@/lib/utils/files/crop.utils";
import {
  FileWithPreview,
  ProcessedFileProps,
  processFiles,
} from "@/lib/utils/files/upload.utils";

import { FileUploaderProps } from "../uploader/file-uploader";

type ImageCropperProps = {
  children: React.ReactNode;
  rotationSlider?: boolean;
  zoomSlider?: boolean;
  aspectRatio?: number;
  minZoom?: number;
  maxZoom?: number;
  onCropComplete?: (croppedFiles: ProcessedFileProps[]) => void;
  onCropCancel?: () => void;
  imageQuality?: number;
  restrictPosition?: boolean;
};

const ImageCropper = ({
  children,
  rotationSlider = true,
  zoomSlider = true,
  aspectRatio,
  minZoom = 1,
  maxZoom = 3,
  onCropComplete,
  onCropCancel,
  imageQuality = 0.9,
  restrictPosition = true,
}: ImageCropperProps) => {
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null
  );

  // Cropper state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  /**
   * Handler for when crop area changes
   */
  const onCropAreaChange = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  /**
   * Handler for when files are selected in the FileUploader
   */
  const handleFileSelect = useCallback((files: FileWithPreview[]) => {
    // We only process the first image file
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile) {
      setSelectedFile(imageFile);
      setIsCropModalOpen(true);

      // Reset cropper state
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
    } else {
      // If no image files were selected, process them normally
      processNonImageFiles(files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Process non-image files without cropping
   */
  const processNonImageFiles = async (files: File[]) => {
    try {
      const processed = await processFiles(files);
      onCropComplete?.(processed);
    } catch (error) {
      console.error("Error processing non-image files:", error);
    }
  };

  /**
   * Handler for when the crop is confirmed
   */
  const handleCropConfirm = useCallback(async () => {
    if (!selectedFile || !croppedAreaPixels || !selectedFile.preview) {
      return;
    }

    try {
      setIsCropping(true);

      // Create crop preview
      const croppedImageUrl = await createCropPreview2(
        selectedFile.preview,
        croppedAreaPixels,
        selectedFile.type,
        rotation
      );

      // Convert cropped image to File
      const croppedFile = dataURLtoFile(croppedImageUrl, selectedFile.name);

      if (croppedFile) {
        // Process the cropped file
        const processedFiles = await processFiles([croppedFile], imageQuality);
        onCropComplete?.(processedFiles);
      }
    } catch (error) {
      console.error("Error cropping image:", error);
    } finally {
      setIsCropping(false);
      setIsCropModalOpen(false);
      setSelectedFile(null);
    }
  }, [selectedFile, croppedAreaPixels, rotation, imageQuality, onCropComplete]);

  /**
   * Handler for when cropping is cancelled
   */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handleCropCancel = useCallback(() => {
    setIsCropModalOpen(false);
    setSelectedFile(null);
    onCropCancel?.();
  }, [onCropCancel]);

  // Clone the child component (FileUploader) and inject our onSelect handler
  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<FileUploaderProps>(child)) {
      return React.cloneElement(child, {
        onSelect: handleFileSelect,
        ...child.props,
      });
    }
    return child;
  });

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, maxZoom));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, minZoom));
  };

  const handleRotateCW = () => {
    setRotation((rotateValue) => Math.min(rotateValue + 2, 360));
  };

  const handleRotateCCW = () => {
    setRotation((rotateValue) => Math.max(rotateValue - 2, 0));
  };

  return (
    <>
      {modifiedChildren}

      <Modal
        open={isCropModalOpen}
        onOpenChange={setIsCropModalOpen}
        title="Crop Image"
        primaryAction={{
          label: isCropping ? "Cropping..." : "Crop & Save",
          onClick: handleCropConfirm,
          disabled: isCropping || !croppedAreaPixels,
          loading: isCropping,
        }}
        // secondaryAction={{
        //   label: "Cancel",
        //   onClick: handleCropCancel,
        //   disabled: isCropping,
        // }}
        showCloseButton={!isCropping}
        closeOnOutsideClick={false}
        contentClassName="max-w-lg w-full"
        footerClassName="justify-center sm:justify-center"
      >
        <div className="flex flex-col gap-6">
          <div className="relative h-64 w-full overflow-hidden rounded-md">
            {selectedFile?.preview && (
              <Cropper
                image={selectedFile.preview}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropAreaChange}
                minZoom={minZoom}
                maxZoom={maxZoom}
                cropShape={aspectRatio ? "rect" : "rect"}
                showGrid={true}
                restrictPosition={restrictPosition}
              />
            )}
          </div>

          {zoomSlider && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ZoomIn className="size-4" />
                <span className="text-sm font-medium">Zoom</span>
              </div>
              <div className="flex-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full bg-secondary-10 p-4 text-black-80 hover:bg-secondary-10"
                  onClick={handleZoomOut}
                >
                  <Minus />
                </Button>
                <Slider
                  value={[zoom]}
                  min={minZoom}
                  max={maxZoom}
                  step={0.1}
                  onValueChange={(value) => setZoom(value[0])}
                  disabled={isCropping}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full bg-secondary-10 p-4 text-black-80 hover:bg-secondary-10"
                  onClick={handleZoomIn}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          )}

          {rotationSlider && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Rotate3D className="size-4" />
                <span className="text-sm font-medium">Rotation</span>
              </div>
              <div className="flex-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full bg-secondary-10 p-4 text-black-80 hover:bg-secondary-10"
                  onClick={handleRotateCCW}
                >
                  <RotateCcw />
                </Button>
                <Slider
                  value={[rotation]}
                  min={0}
                  max={360}
                  step={1}
                  onValueChange={(value) => setRotation(value[0])}
                  disabled={isCropping}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full bg-secondary-10 p-4 text-black-80 hover:bg-secondary-10"
                  onClick={handleRotateCW}
                >
                  <RotateCw />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ImageCropper;
