"use server";

import sharp from "sharp";

/**
 * Resizes an image using the sharp library
 * @param fileBuffer - The buffer containing the image data
 * @param width - The target width
 * @param height - The target height
 * @param format - The output format (default: 'jpeg')
 * @param quality - The output quality (default: 80)
 * @returns A Promise containing the resized image as a Buffer
 */

export const resizeImage = async (
  fileBuffer: Buffer,
  width: number,
  height: number,
  format: "jpeg" | "png" | "webp" = "jpeg",
  quality: number = 80
): Promise<Buffer> => {
  try {
    const resizeOptions = {
      width,
      height,
      fit: "cover" as const,
      position: "center" as const,
    };

    let sharpInstance = sharp(fileBuffer).resize(resizeOptions);

    // Apply output format and quality
    switch (format) {
      case "jpeg":
        sharpInstance = sharpInstance.jpeg({ quality });
        break;
      case "png":
        sharpInstance = sharpInstance.png({ quality });
        break;
      case "webp":
        sharpInstance = sharpInstance.webp({ quality });
        break;
      default:
        sharpInstance = sharpInstance.jpeg({ quality });
    }

    return await sharpInstance.toBuffer();
  } catch (error) {
    console.error("Error resizing image:", error);
    throw new Error("Failed to resize image");
  }
};

/**
 * Converts a File to a Buffer
 * @param file - The file to convert
 * @returns A Promise containing the file as a Buffer
 */
export const fileToBuffer = async (file: File): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = Buffer.from(reader.result as ArrayBuffer);
      resolve(buffer);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Converts a Buffer to base64
 * @param buffer - The buffer to convert
 * @param mimeType - The MIME type of the image
 * @returns A base64 string with data URI
 */
export const bufferToBase64 = (buffer: Buffer, mimeType: string): string => {
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
};

/**
 * Resizes an image file and returns it as a base64 string
 * @param file - The image file to resize
 * @param width - The target width
 * @param height - The target height
 * @param format - The output format (default: 'jpeg')
 * @param quality - The output quality (default: 80)
 * @returns A Promise containing the resized image as a base64 string
 */
export const resizeImageToBase64 = async (
  file: File,
  width: number,
  height: number,
  format: "jpeg" | "png" | "webp" = "jpeg",
  quality: number = 80
): Promise<string> => {
  const buffer = await fileToBuffer(file);
  const resizedBuffer = await resizeImage(
    buffer,
    width,
    height,
    format,
    quality
  );

  const mimeType = `image/${format}`;
  return bufferToBase64(resizedBuffer, mimeType);
};
