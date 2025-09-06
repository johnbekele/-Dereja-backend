import fs from 'fs';
import path from 'path';


// make sure the folder uplode exist if not creates it  

export const setupUploadDirectory = (rootDir = __dirname) => {
  const uploadDir = path.join(rootDir, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return uploadDir;
};
