import fs from 'fs/promises';
import path from 'path';

const isFileAvailable = async (dir: string, filename: string): Promise<boolean> => {

  try {
    // Read the directory contents and check if the file exists
    const files = await fs.readdir(dir);
    return files.includes(filename);
  } catch (error) {
    console.error('Error reading directory:', error);
    return false;
  }
};

export default { isFileAvailable };
