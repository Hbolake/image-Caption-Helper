export const createFilePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateFileName = (
  index: number,
  options: { unifyNames: boolean; namePrefix?: string }
): string => {
  if (options.unifyNames && options.namePrefix) {
    return `${options.namePrefix}_${String(index + 1).padStart(3, '0')}`;
  }
  return `image_${String(index + 1).padStart(3, '0')}`;
}; 