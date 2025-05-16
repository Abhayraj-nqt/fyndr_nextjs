/**
 * Utility functions for image cropping
 */
import { Area } from "react-easy-crop";

/**
 * Creates a crop preview for an image
 */
export const createCropPreview = async (
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Set canvas size to the cropped area
  //   const maxSize = Math.max(image.width, image.height);
  //   const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // Set dimensions of the canvas to the crop area accounting for rotation
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Translate canvas context to center of the canvas
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  // Draw rotated/flipped image onto the canvas, centered
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

  // Return the cropped canvas as a data URL
  return canvas.toDataURL("image/jpeg");
};

/**
 * Creates an Image object from a source URL
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // Needed to avoid CORS issues
    image.src = url;
  });

/**
 * Extracts the file extension from a file name
 */
export const getFileExtension = (fileName: string): string => {
  return fileName.split(".").pop()?.toLowerCase() || "";
};

/**
 * Converts a data URL to a File object
 */
export const dataURLtoFile = (
  dataUrl: string,
  filename: string
): File | null => {
  try {
    // Convert base64 to raw binary data
    const arr = dataUrl.split(",");
    if (arr.length < 2) return null;

    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) return null;

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error("Error converting data URL to file:", error);
    return null;
  }
};

/**
 * Gets crop area percentage (for easier storage/retrieval)
 */
export const getCropAreaPercentages = (
  crop: Area,
  imageWidth: number,
  imageHeight: number
) => {
  return {
    x: (crop.x / imageWidth) * 100,
    y: (crop.y / imageHeight) * 100,
    width: (crop.width / imageWidth) * 100,
    height: (crop.height / imageHeight) * 100,
  };
};

/**
 * Converts percentage-based crop area to pixel values
 */
export const percentagesToPixelArea = (
  percentageArea: { x: number; y: number; width: number; height: number },
  imageWidth: number,
  imageHeight: number
): Area => {
  return {
    x: (percentageArea.x * imageWidth) / 100,
    y: (percentageArea.y * imageHeight) / 100,
    width: (percentageArea.width * imageWidth) / 100,
    height: (percentageArea.height * imageHeight) / 100,
  };
};
