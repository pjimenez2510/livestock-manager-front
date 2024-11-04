import React, { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploadProps {
  urlImg?: string;
}

const ImageUpload = ({ urlImg }: ImageUploadProps) => {
  const { register, setValue } = useFormContext();

  const [previewUrl, setPreviewUrl] = useState<string | null>(urlImg || null);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setValue("image", file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [setValue]
  );

  const handleRemoveImage = useCallback(() => {
    setValue("image", null);
    setPreviewUrl(null);
  }, [setValue]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {previewUrl ? (
        <div className="relative w-full max-w-md aspect-square">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-contain rounded-lg"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            Eliminar
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2  border-2 border-dashed rounded-lg w-full max-w-md">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("image")}
            onChange={handleImageChange}
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="hover:cursor-pointer text-center w-full h-full p-8"
          >
            <p className="mt-2 text-sm text-gray-500">
              JPG, PNG o GIF permitidos
            </p>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
