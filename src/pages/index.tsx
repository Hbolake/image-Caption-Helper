import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FileUpload from '../components/FileUpload';
import ImageGrid from '../components/ImageGrid';
import DownloadDialog from '../components/DownloadDialog';
import { ImageNote, DownloadOptions } from '../types/common';
import { createFilePreview } from '../utils/fileHandlers';
import { downloadZip } from '../utils/zipUtils';

export default function Home() {
  const [images, setImages] = useState<ImageNote[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const handleUpload = useCallback(async (files: File[]) => {
    const newImages = await Promise.all(
      files.map(async (file) => ({
        id: uuidv4(),
        file,
        preview: await createFilePreview(file),
        note: ''
      }))
    );
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const handleNoteChange = useCallback((id: string, note: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, note } : img))
    );
  }, []);

  const handleDownload = useCallback(async (options: DownloadOptions) => {
    await downloadZip(images, options);
    setShowDownloadDialog(false);
  }, [images]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">图片注释管理器</h1>
        
        <div className="mb-8">
          <FileUpload onUpload={handleUpload} />
        </div>

        {images.length > 0 && (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p>已上传 {images.length} 张图片</p>
              <button
                onClick={() => setShowDownloadDialog(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                下载全部
              </button>
            </div>

            <ImageGrid
              images={images}
              onNoteChange={handleNoteChange}
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
            />
          </>
        )}

        {showDownloadDialog && (
          <DownloadDialog
            onConfirm={handleDownload}
            onCancel={() => setShowDownloadDialog(false)}
          />
        )}
      </div>
    </div>
  );
} 