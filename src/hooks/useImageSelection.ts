import { useState } from "react";

export const useImageSelection = (
  MIN_DIMENSION: number
): {
  imgSrc: string;
  error: string;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
} => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError(
            `Image must be at least ${MIN_DIMENSION} x ${MIN_DIMENSION} pixels.`
          );
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  return { imgSrc, error, onSelectFile };
};
