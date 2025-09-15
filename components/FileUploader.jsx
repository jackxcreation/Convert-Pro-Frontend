"use client";

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  File, 
  Image, 
  Video, 
  Music, 
  Archive, 
  X, 
  Check, 
  AlertCircle,
  Loader2,
  Download,
  Settings
} from 'lucide-react';

// Import your validation functions
import { SUPPORTED_FORMATS } from '@/middleware/fileValidation';

const FileUploader = ({ 
  onFileUploaded, 
  onConversionComplete, 
  maxFiles = 5,
  className = "" 
}) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // File upload handler
  const handleFileUpload = useCallback(async (fileList) => {
    const newFiles = Array.from(fileList).slice(0, maxFiles);
    
    setUploading(true);
    
    for (const file of newFiles) {
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Add file to state immediately for UI feedback
      const fileObj = {
        id: fileId,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
        uploadedFileId: null,
        supportedOutputs: [],
        selectedOutput: '',
        conversionOptions: {},
        downloadUrl: null,
        error: null
      };
      
      setFiles(prev => [...prev, fileObj]);
      
      try {
        // Create FormData
        const formData = new FormData();
        formData.append('file', file);
        
        // Upload file
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Update file status
          setFiles(prev => prev.map(f => 
            f.id === fileId ? {
              ...f,
              status: 'uploaded',
              progress: 100,
              uploadedFileId: result.fileId,
              supportedOutputs: result.fileInfo.supportedOutputs,
              selectedOutput: result.fileInfo.supportedOutputs[0] || ''
            } : f
          ));
          
          if (onFileUploaded) {
            onFileUploaded(result);
          }
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        // Update file with error
        setFiles(prev => prev.map(f => 
          f.id === fileId ? {
            ...f,
            status: 'error',
            error: error.message
          } : f
        ));
      }
    }
    
    setUploading(false);
  }, [maxFiles, onFileUploaded]);

  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, [handleFileUpload]);

  // File input change handler
  const handleFileInputChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
  }, [handleFileUpload]);

  // Remove file from list
  const removeFile = useCallback((fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  // Update selected output format
  const updateOutputFormat = useCallback((fileId, format) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, selectedOutput: format } : f
    ));
  }, []);

  // Start conversion
  const startConversion = useCallback(async (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (!file || !file.uploadedFileId || !file.selectedOutput) return;
    
    // Update status to converting
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'converting', progress: 0 } : f
    ));
    
    try {
      // Start conversion
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileId: file.uploadedFileId,
          targetFormat: file.selectedOutput,
          options: file.conversionOptions
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Update with download URL
        setFiles(prev => prev.map(f => 
          f.id === fileId ? {
            ...f,
            status: 'completed',
            progress: 100,
            downloadUrl: result.downloadUrl,
            outputInfo: result.fileInfo
          } : f
        ));
        
        if (onConversionComplete) {
          onConversionComplete(result);
        }
      } else {
        throw new Error(result.error);
      }
      
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === fileId ? {
          ...f,
          status: 'error',
          error: error.message
        } : f
      ));
    }
  }, [files, onConversionComplete]);

  // Get file type icon
  const getFileIcon = (fileName, category) => {
    if (category === 'images') return <Image className="h-5 w-5" />;
    if (category === 'video') return <Video className="h-5 w-5" />;
    if (category === 'audio') return <Music className="h-5 w-5" />;
    if (category === 'archives') return <Archive className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Upload Area */}
      <motion.div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.svg,.tiff,.pdf,.docx,.doc,.txt,.rtf,.odt,.mp3,.wav,.flac,.m4a,.aac,.ogg,.wma,.mp4,.avi,.mov,.mkv,.webm,.flv,.3gp,.zip,.rar,.7z,.tar,.gz"
        />
        
        <div className="space-y-4">
          <motion.div
            className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center"
            animate={{ rotate: uploading ? 360 : 0 }}
            transition={{ duration: 2, repeat: uploading ? Infinity : 0, ease: "linear" }}
          >
            <Upload className="h-8 w-8 text-white" />
          </motion.div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Drop files here or click to browse
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Support for 50+ formats including Images, Videos, Audio, Documents & Archives
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Max file size: 2GB (Free) • 100GB (Pro) • Up to {maxFiles} files
            </p>
          </div>
          
          <motion.button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? 'Uploading...' : 'Choose Files'}
          </motion.button>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 space-y-4"
          >
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  {/* File Icon */}
                  <div className="flex-shrink-0">
                    {getFileIcon(file.name)}
                  </div>
                  
                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  
                  {/* Status & Actions */}
                  <div className="flex items-center gap-3">
                    {file.status === 'uploading' && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                        <span className="text-xs text-gray-500">Uploading...</span>
                      </div>
                    )}
                    
                    {file.status === 'uploaded' && (
                      <div className="flex items-center gap-2">
                        <select
                          value={file.selectedOutput}
                          onChange={(e) => updateOutputFormat(file.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
                        >
                          {file.supportedOutputs.map(format => (
                            <option key={format} value={format}>
                              {format.toUpperCase()}
                            </option>
                          ))}
                        </select>
                        
                        <motion.button
                          onClick={() => startConversion(file.id)}
                          className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={!file.selectedOutput}
                        >
                          Convert
                        </motion.button>
                      </div>
                    )}
                    
                    {file.status === 'converting' && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
                        <span className="text-xs text-gray-500">Converting...</span>
                      </div>
                    )}
                    
                    {file.status === 'completed' && (
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <motion.a
                          href={file.downloadUrl}
                          download
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Download className="h-3 w-3" />
                          Download
                        </motion.a>
                      </div>
                    )}
                    
                    {file.status === 'error' && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="text-xs text-red-600" title={file.error}>
                          Error
                        </span>
                      </div>
                    )}
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                {(file.status === 'uploading' || file.status === 'converting') && (
                  <div className="mt-3">
                    <div className="bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full transition-all ${
                          file.status === 'uploading' ? 'bg-indigo-600' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${file.progress}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Error Message */}
                {file.error && (
                  <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                    {file.error}
                  </div>
                )}
                
                {/* Conversion Success Info */}
                {file.status === 'completed' && file.outputInfo && (
                  <div className="mt-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                    Converted to {file.outputInfo.outputFormat.toUpperCase()} • 
                    Size: {file.outputInfo.outputSizeFormatted} • 
                    Compression: {file.outputInfo.compressionRatio}%
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Supported Formats Info */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <details className="inline-block">
          <summary className="cursor-pointer hover:text-gray-700">
            View all supported formats
          </summary>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg text-left max-w-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Images</h4>
                <p className="text-xs">JPG, PNG, GIF, WebP, SVG, TIFF, BMP</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Videos</h4>
                <p className="text-xs">MP4, AVI, MOV, MKV, WebM, FLV, 3GP</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Audio</h4>
                <p className="text-xs">MP3, WAV, FLAC, M4A, AAC, OGG, WMA</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Documents</h4>
                <p className="text-xs">PDF, DOCX, DOC, TXT, RTF, ODT</p>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default FileUploader;
