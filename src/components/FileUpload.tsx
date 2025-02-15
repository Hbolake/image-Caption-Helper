import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
}

export default function FileUpload({ onUpload, maxFiles = 50 }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > maxFiles) {
      alert(`最多只能上传${maxFiles}张图片`);
      return;
    }
    onUpload(acceptedFiles);
  }, [maxFiles, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxFiles
  });

  return (
    <div 
      {...getRootProps()} 
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>将图片拖放到这里...</p>
      ) : (
        <p>点击或拖放图片到这里上传<br/>（支持 PNG、JPG 格式，最多 {maxFiles} 张）</p>
      )}
    </div>
  );
} 