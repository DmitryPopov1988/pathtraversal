import fs from 'fs/promises';
import path from 'path';
import { QUESTION_CONTENT } from './constants'; 

const BASE_DIRECTORY = path.resolve(QUESTION_CONTENT.RELATIVE_URL);

const isFileAvailable = async (dir: string, filename: string): Promise<boolean> => {

  try {

    const filePath = path.join(BASE_DIRECTORY, filename);
    const files = await fs.readdir(BASE_DIRECTORY, { withFileTypes: true });
    return files.some(file => file.isFile() && file.name === filename);
  } catch (error) {
    console.error('Error reading directory:', error);
    return false;
  }
};

export default { isFileAvailable };
