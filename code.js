import fs from 'fs/promises';
import { QUESTION_CONTENT } from '@core/services/constants';

const ALLOWED_PATH = QUESTION_CONTENT.RELATIVE_URL;

const sanitize = (fileName: string) => {
  if (!fileName.includes('..')) throw new Error('Invalid file name.');
  return fileName;
};

const isFileAvailable = async (filename: string): Promise<boolean> => {
  try {
    await fs.stat(ALLOWED_PATH + sanitize(filename));
    return true;
  } catch (e) {
    return false;
  }
};

export default { isFileAvailable };

