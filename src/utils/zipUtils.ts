import JSZip from 'jszip';
import { ImageNote } from '../types/common';

export const createDownloadZip = async (
  images: ImageNote[],
  options: { unifyNames: boolean; namePrefix?: string }
): Promise<Blob> => {
  const zip = new JSZip();

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const baseFileName = generateFileName(i, options);
    
    // 添加图片
    const imageExt = image.file.name.split('.').pop();
    zip.file(`${baseFileName}.${imageExt}`, image.file);
    
    // 添加文本说明
    zip.file(`${baseFileName}.txt`, image.note || '');
  }

  return await zip.generateAsync({ type: 'blob' });
};

export const downloadZip = async (
  images: ImageNote[],
  options: { unifyNames: boolean; namePrefix?: string }
) => {
  const blob = await createDownloadZip(images, options);
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'images_with_notes.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}; 