import React, { useState } from 'react';
import { DownloadOptions } from '../types/common';

interface DownloadDialogProps {
  onConfirm: (options: DownloadOptions) => void;
  onCancel: () => void;
}

export default function DownloadDialog({ onConfirm, onCancel }: DownloadDialogProps) {
  const [unifyNames, setUnifyNames] = useState(false);
  const [namePrefix, setNamePrefix] = useState('image');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-bold mb-4">下载设置</h3>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={unifyNames}
              onChange={(e) => setUnifyNames(e.target.checked)}
              className="mr-2"
            />
            统一文件命名
          </label>
        </div>

        {unifyNames && (
          <div className="mb-4">
            <label className="block mb-2">文件名前缀：</label>
            <input
              type="text"
              value={namePrefix}
              onChange={(e) => setNamePrefix(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            取消
          </button>
          <button
            onClick={() => onConfirm({ unifyNames, namePrefix })}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            下载
          </button>
        </div>
      </div>
    </div>
  );
} 