import React, { useState } from 'react';

interface FileUploadProps {
    isFileUploading?: boolean;
    onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ isFileUploading, onFileUpload }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(false);

        if (event.dataTransfer.items) {
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
                if (event.dataTransfer.items[i].kind === 'file') {
                    const file = event.dataTransfer.items[i].getAsFile();
                    if (file) {
                        setSelectedFile(file);
                    }
                }
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUploadClick = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
        }
    };

    return (
        <div
            className={`flex mt-4 items-center justify-center h-48 mb-4 rounded ${isDragOver ? 'bg-blue-100' : 'bg-gray-50'} dark:bg-gray-800`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div>
                <input type="file" className="mr-4 bg-white p-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm text-gray-700" onChange={handleFileChange} />
                {!isFileUploading && selectedFile && <p className="mt-2 text-sm text-gray-500">{selectedFile.name}</p>}
                {isFileUploading && <p className="mt-2 text-sm text-gray-500">Uploading...</p>}
                <button onClick={handleUploadClick} className="mt-2 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                    Upload
                </button>
            </div>
        </div>
    );
}

export default FileUpload;