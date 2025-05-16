export type ProcessedFileProps = {
  name: string;
  type: string;
  base64: string;
  base64Url: string;
  orgFile: File;
};

export const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const extractBase64 = (base64Url: string): string => {
  return base64Url.substring(base64Url.indexOf(",") + 1);
};

export const isImageFile = (fileType: string): boolean => {
  return fileType.startsWith("image/");
};

export const createFileFromBlob = async (
  blob: Blob,
  fileName: string
): Promise<ProcessedFileProps> => {
  const file = new File([blob], fileName, { type: blob.type });
  const base64Url = await toBase64(file);

  return {
    name: fileName,
    type: blob.type,
    base64: extractBase64(base64Url),
    base64Url,
    orgFile: file,
  };
};

export const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

export const compressImage = (
  file: File,
  options: {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
    maxSizeMB?: number;
  }
): Promise<File> => {
  const {
    quality = 0.8,
    maxWidth = 1920,
    maxHeight = 1080,
    maxSizeMB = 5,
  } = options;

  return new Promise((resolve, reject) => {
    // If file is already smaller than max size, return it as is
    if (file.size <= maxSizeMB * 1024 * 1024) {
      resolve(file);
      return;
    }

    new Compressor(file, {
      quality,
      maxWidth,
      maxHeight,
      success: (result) => resolve(result as File),
      error: (err) => reject(err),
    });
  });
};
