import { useState } from "react";
import { Crop, centerCrop, makeAspectCrop } from "react-image-crop";

interface UseImageCropProps {
  ASPECT_RATIO: number;
  MIN_DIMENSION: number;
}

export const useImageCrop = ({
  ASPECT_RATIO,
  MIN_DIMENSION,
}: UseImageCropProps): {
  crop: Crop | undefined;
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  setCrop: React.Dispatch<React.SetStateAction<Crop | undefined>>;
} => {
  const [crop, setCrop] = useState<Crop | undefined>();

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const initialCrop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(initialCrop, width, height);
    setCrop(centeredCrop);
  };

  return { crop, onImageLoad, setCrop };
};
