import React from 'react';
import { ImageNote } from '../types/common';

interface ImageGridProps {
  images: ImageNote[];
  onNoteChange: (id: string, note: string) => void;
  selectedImage?: string;
  onSelect: (id: string) => void;
}

export default function ImageGrid({ 
  images, 
  onNoteChange, 
  selectedImage,
  onSelect 
}: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div 
          key={image.id} 
          className={`p-4 border rounded-lg ${selectedImage === image.id ? 'border-blue-500' : 'border-gray-200'}`}
          onClick={() => onSelect(image.id)}
        >
          <img 
            src={image.preview} 
            alt="preview" 
            className="w-full h-48 object-contain mb-2"
          />
          <textarea
            value={image.note}
            onChange={(e) => onNoteChange(image.id, e.target.value)}
            className="w-full h-32 p-2 border rounded"
            placeholder="在这里添加图片说明..."
          />
        </div>
      ))}
    </div>
  );
} 