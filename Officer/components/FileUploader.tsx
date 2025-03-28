'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import{ useDropzone } from '@uploadthing/react'
import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
  index: number
}

export function FileUploader({ imageUrl, onFieldChange, setFiles, index }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles[index] = acceptedFiles[0];
      return newFiles;
    });
    
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [index, setFiles, onFieldChange])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full bg-primary-blue">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  )
}