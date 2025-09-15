export const SUPPORTED_FORMATS = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm",
  "audio/mpeg",
  "audio/mp3",
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "text/plain"
];

// Optional: Maximum file size (10MB here)
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Validation function
export function validateFile(file) {
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    return { valid: false, error: "Unsupported file format." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "File size exceeds 10MB limit." };
  }

  return { valid: true, error: null };
}
