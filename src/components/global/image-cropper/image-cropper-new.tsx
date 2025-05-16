"use client";

import { Slider } from "@radix-ui/react-slider";
import { ZoomIn, Rotate3D } from "lucide-react";
import React, { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

import { Modal } from "@/components/global/modal";
import { createCropPreview, dataURLtoFile } from "@/lib/crop.utils";
import {
  FileWithPreview,
  ProcessedFileProps,
  processFiles,
} from "@/lib/upload.utils";

type Props = {
  children: React.ReactNode;
  rotationSlider?: boolean;
  zoomSlider?: boolean;
  aspectRatio?: number;
  minZoom?: number;
  maxZoom?: number;
  imageQuality?: number;

  onCropComplete?: (croppedFiles: ProcessedFileProps[]) => void;
  onCropCancel?: () => void;
};

const ImageCropperNew = ({
  children,
  aspectRatio,
  imageQuality,
  maxZoom,
  minZoom,
  onCropCancel,
  onCropComplete,
  rotationSlider,
  zoomSlider,
}: Props) => {
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

  const onCropAreaChange = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

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
      processNonImageFiles(files);
    }
  }, []);

  const processNonImageFiles = async (files: File[]) => {
    try {
      const processed = await processFiles(files);
      onCropComplete?.(processed);
    } catch (error) {
      console.error("Error processing non-image files:", error);
    }
  };

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
        secondaryAction={{
          label: "Cancel",
          onClick: handleCropCancel,
          disabled: isCropping,
        }}
        showCloseButton={!isCropping}
        closeOnOutsideClick={!isCropping}
        contentClassName="max-w-md w-full"
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
              <Slider
                value={[zoom]}
                min={minZoom}
                max={maxZoom}
                step={0.1}
                onValueChange={(value) => setZoom(value[0])}
                disabled={isCropping}
              />
            </div>
          )}

          {rotationSlider && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Rotate3D className="size-4" />
                <span className="text-sm font-medium">Rotation</span>
              </div>
              <Slider
                value={[rotation]}
                min={0}
                max={360}
                step={1}
                onValueChange={(value) => setRotation(value[0])}
                disabled={isCropping}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ImageCropperNew;
