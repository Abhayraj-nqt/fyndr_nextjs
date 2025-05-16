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
import { createCropPreview, dataURLtoFile } from "@/lib/file-utils/crop.utils";
import {
  FileWithPreview,
  ProcessedFileProps,
  processFiles,
} from "@/lib/file-utils/upload.utils";

export type ImageCropperProps = {
  /**
   * Children (typically the FileUploader component)
   */
  children: React.ReactNode;

  /**
   * Whether to show rotation slider
   * @default true
   */
  rotationSlider?: boolean;

  /**
   * Whether to show zoom slider
   * @default true
   */
  zoomSlider?: boolean;

  /**
   * Aspect ratio for cropping (width/height)
   * @default undefined (free form)
   */
  aspectRatio?: number;

  /**
   * Minimum zoom level
   * @default 1
   */
  minZoom?: number;

  /**
   * Maximum zoom level
   * @default 3
   */
  maxZoom?: number;

  /**
   * Callback for when cropping is complete
   */
  onCropComplete?: (croppedFiles: ProcessedFileProps[]) => void;

  /**
   * Callback for when cropping is cancelled
   */
  onCropCancel?: () => void;

  /**
   * Image quality for the cropped output (0-1)
   * @default 0.9
   */
  imageQuality?: number;
};

/**
 * Image cropper component that wraps FileUploader to add cropping functionality
 */
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
}: ImageCropperProps) => {
  // State for crop modal
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  // State for the selected image before cropping
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
      const croppedImageUrl = await createCropPreview(
        selectedFile.preview,
        croppedAreaPixels,
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
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onSelect: handleFileSelect,
        ...child.props,
      });
    }
    return child;
  });

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1));
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
                  className="size-8 rounded-full bg-light-800 p-4 text-dark-300 hover:bg-light-800"
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
                  className="size-8 rounded-full bg-light-800 p-4 text-dark-300 hover:bg-light-800"
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
                  className="size-8 rounded-full bg-light-800 p-4 text-dark-300 hover:bg-light-800"
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
                  className="size-8 rounded-full bg-light-800 p-4 text-dark-300 hover:bg-light-800"
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
