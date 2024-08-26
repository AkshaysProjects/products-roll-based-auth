import { useState } from "react";
import { useDropzone } from "react-dropzone";

export const useImageSelection = (
  MIN_DIMENSION: number
): {
  imgSrc: string;
  error: string;
  getRootProps: () => any;
  getInputProps: () => any;
  isDragActive: boolean;
} => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.onload = (e) => {
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError(
            `Image must be at least ${MIN_DIMENSION} x ${MIN_DIMENSION} pixels.`
          );
          setImgSrc("");
          return;
        }
        setError("");
        setImgSrc(imageUrl);
      };
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
    multiple: false,
  });

  return { imgSrc, error, getRootProps, getInputProps, isDragActive };
};
