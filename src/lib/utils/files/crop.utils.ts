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
  ctx.fillStyle = "#FFFFFF";

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

export const createCropPreview2 = async (
  imageSrc: string,
  pixelCrop: Area,
  imageType: string,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const { width: imageWidth, height: imageHeight } = image;
  const { width: cropWidth, height: cropHeight, x, y } = pixelCrop;

  const rotRad = getRadianAngle(rotation);
  const { width: rotatedWidth, height: rotatedHeight } = rotateSize(
    imageWidth,
    imageHeight,
    rotation
  );

  canvas.width = rotatedWidth;
  canvas.height = rotatedHeight;
  ctx.translate(rotatedWidth / 2, rotatedHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.drawImage(image, -imageWidth / 2, -imageHeight / 2);
  ctx.fillStyle = "#FFFFFF";
  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("Could not create cropped canvas context");
  }

  croppedCanvas.width = cropWidth;
  croppedCanvas.height = cropHeight;
  croppedCtx.fillStyle = "#FFFFFF";

  croppedCtx.drawImage(
    canvas,
    x,
    y,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  return croppedCanvas.toDataURL(imageType || "image/jpeg");
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

// -------------------------------

export async function getRotatedImage(imageSrc: string, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const orientationChanged =
    rotation === 90 ||
    rotation === -90 ||
    rotation === 270 ||
    rotation === -270;
  if (orientationChanged) {
    canvas.width = image.height;
    canvas.height = image.width;
  } else {
    canvas.width = image.width;
    canvas.height = image.height;
  }
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve(URL.createObjectURL(file));
      } else {
        resolve(null);
      }
    }, "image/png");
  });
}

export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}
