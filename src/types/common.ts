export interface ImageNote {
  id: string;
  file: File;
  preview: string;
  note: string;
}

export interface DownloadOptions {
  unifyNames: boolean;
  namePrefix?: string;
} 