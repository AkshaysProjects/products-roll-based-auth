import CloseIcon from "@/assets/CloseIcon.svg";
import ImageCropper from "@/components/products/ImageCropper";
import Image from "next/image";

export default function Modal({
  updateImage,
  closeModal,
}: {
  updateImage: (imageSrc: string) => void;
  closeModal: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-[80%] sm:w-[50%] max-w-md max-h-md bg-gray-800 text-slate-100 rounded-xl shadow-xl flex flex-col items-center p-4">
        <button
          type="button"
          className="absolute top-2 right-2 p-1 text-gray-400 hover:bg-gray-500 focus:outline-none rounded-md"
          onClick={closeModal}
        >
          <span className="sr-only">Close menu</span>
          <Image
            src={CloseIcon}
            alt="Close"
            width={24}
            height={24}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </button>
        <div className="mt-4 w-full">
          <ImageCropper updateImage={updateImage} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}
