import fs from 'fs/promises';
import path from 'path';
import { QUESTION_CONTENT } from './constants'; // Ensure this import is correct

const isFileAvailable = async (dir: string, filename: string): Promise<boolean> => {
  // Normalize and resolve the directory path
  const normalizedDir = path.resolve(path.normalize(dir));
  const basePath = path.resolve(QUESTION_CONTENT.RELATIVE_URL);

  // Ensure the normalized directory is within the allowed base path
  if (!normalizedDir.startsWith(basePath + path.sep)) {
    throw new Error('Access to the directory is not allowed');
  }

  try {
    // Read the directory contents and check if the file exists
    const files = await fs.readdir(normalizedDir);
    return files.includes(filename);
  } catch (error) {
    console.error('Error reading directory:', error);
    return false;
  }
};

export default { isFileAvailable };
