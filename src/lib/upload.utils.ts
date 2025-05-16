/**
 * Utility functions for file uploading and processing
 */
import { toast } from "@/hooks/use-toast";

export type AllowedFileType =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "application/pdf"
  | string;

export const defaultAllowedFileTypes: AllowedFileType[] = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
];

export type FileWithPreview = File & {
  preview?: string;
};

export type ProcessedFileProps = {
  name: string;
  type: string;
  base64: string;
  base64Url: string;
  orgFile: File;
};

export type FileValidationOptions = {
  allowedFileTypes?: AllowedFileType[];
  min?: number;
  max?: number;
  maxFileSizeMB?: number;
  onError?: (message: string) => void;
};

/**
 * Validates files based on specified constraints
 */
export const validateFiles = (
  files: File[],
  {
    allowedFileTypes = defaultAllowedFileTypes,
    min = 1,
    max = 10,
    maxFileSizeMB = 10,
    onError,
  }: FileValidationOptions
): FileWithPreview[] => {
  const validFiles: FileWithPreview[] = [];
  const filesToValidate = Array.from(files);

  // Check if files were selected
  if (filesToValidate.length === 0) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "No files selected",
    });
    onError?.("No files selected");
    return [];
  }

  // Check min/max file count
  if (filesToValidate.length < min) {
    toast({
      variant: "destructive",
      title: "Error",
      description: `Please select at least ${min} file${min !== 1 ? "s" : ""}`,
    });
    onError?.(`Please select at least ${min} file${min !== 1 ? "s" : ""}`);
    return [];
  }

  if (filesToValidate.length > max) {
    toast({
      variant: "destructive",
      title: "Error",
      description: `You can only upload up to ${max} file${max !== 1 ? "s" : ""}`,
    });
    onError?.(`You can only upload up to ${max} file${max !== 1 ? "s" : ""}`);
    return [];
  }

  // Validate individual files
  for (const file of filesToValidate) {
    // Check file type
    if (!allowedFileTypes.includes(file.type as AllowedFileType)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `File type '${file.type}' is not allowed. Allowed types: ${allowedFileTypes.join(
          ", "
        )}`,
      });
      onError?.(
        `File type '${file.type}' is not allowed. Allowed types: ${allowedFileTypes.join(
          ", "
        )}`
      );
      continue;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSizeMB) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `File '${file.name}' exceeds the maximum size of ${maxFileSizeMB}MB`,
      });
      onError?.(
        `File '${file.name}' exceeds the maximum size of ${maxFileSizeMB}MB`
      );
      continue;
    }

    // Add preview for images
    const fileWithPreview = file as FileWithPreview;
    if (file.type.startsWith("image/")) {
      fileWithPreview.preview = URL.createObjectURL(file);
    }
    validFiles.push(fileWithPreview);
  }

  return validFiles;
};

/**
 * Converts a file to a base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Extract only the base64 part without the data URL prefix
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Processes files to the required format
 */
export const processFiles = async (
  files: File[],
  imageQuality?: number
): Promise<ProcessedFileProps[]> => {
  const processedFiles: ProcessedFileProps[] = [];

  for (const file of files) {
    try {
      // Show toast for uploading
      toast({
        title: "Uploading...",
        description: `Processing ${file.name}`,
      });

      // Compress image if needed and it's an image type
      let fileToProcess = file;
      if (
        imageQuality !== undefined &&
        imageQuality < 1 &&
        file.type.startsWith("image/")
      ) {
        fileToProcess = await compressImage(file, imageQuality);
      }

      // Convert to base64
      const base64 = await fileToBase64(fileToProcess);
      const base64Url = `data:${file.type};base64,${base64}`;

      processedFiles.push({
        name: file.name,
        type: file.type,
        base64,
        base64Url,
        orgFile: file,
      });
    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to process ${file.name}`,
      });
    }
  }

  return processedFiles;
};

/**
 * Compresses an image to reduce its file size
 */
export const compressImage = async (
  file: File,
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Could not create blob"));
              return;
            }
            // Create a new file with the compressed blob
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
  });
};

/**
 * Clean up file preview URLs to prevent memory leaks
 */
export const cleanupFilePreviews = (files: FileWithPreview[]): void => {
  files.forEach((file) => {
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
  });
};
