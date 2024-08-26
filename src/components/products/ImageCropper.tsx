import { setCanvasPreview } from "@/utils/canvas";
import Image from "next/image";
import { useRef } from "react";
import ReactCrop, { convertToPixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useImageCrop } from "../../hooks/useImageCrop";
import { useImageSelection } from "../../hooks/useImageSelection";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function ImageCropper({
  closeModal,
  updateImage,
}: {
  closeModal: () => void;
  updateImage: (imageSrc: string) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const { imgSrc, error, getRootProps, getInputProps, isDragActive } =
    useImageSelection(MIN_DIMENSION);
  const { crop, onImageLoad, setCrop } = useImageCrop({
    ASPECT_RATIO,
    MIN_DIMENSION,
  });

  return (
    <div className="flex flex-col items-center justify-center">
      {!imgSrc && (
        <div
          className={`w-full h-64 bg-gray-700 border-2 rounded-md flex items-center justify-center ${
            isDragActive ? "border-blue-500" : "border-gray-600"
          }`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-300">Drop the image here...</p>
          ) : (
            <p className="text-gray-300">
              Drag and drop an image here or click to select
            </p>
          )}
        </div>
      )}
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center mt-4">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <Image
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              width={imgRef.current?.naturalWidth || 1}
              height={imgRef.current?.naturalHeight || 1}
              onLoad={onImageLoad}
              sizes="100vw"
              style={{
                maxHeight: "70vh",
                width: "auto",
                objectFit: "contain",
                height: "auto",
              }}
            />
          </ReactCrop>
          <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={() => {
              if (imgRef.current && previewCanvasRef.current && crop) {
                setCanvasPreview(
                  imgRef.current,
                  previewCanvasRef.current,
                  convertToPixelCrop(
                    crop,
                    imgRef.current.width,
                    imgRef.current.height
                  )
                );
                const dataUrl = previewCanvasRef.current.toDataURL();
                updateImage(dataUrl);
                closeModal();
              }
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </div>
  );
}
