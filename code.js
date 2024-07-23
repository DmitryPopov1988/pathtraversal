import fs from 'fs/promises';
import path from 'path';
import { QUESTION_CONTENT } from '@core/services/constants';

const verifyDirectory = (dir: string) => {
  if (!dir.startsWith(QUESTION_CONTENT.RELATIVE_URL)) {
    throw new Error('PATH');
  }
};

const verifyFilename = (filename: string) => {
  if (
    filename.includes('..') ||
    filename.includes('/') ||
    filename.includes('\\')
  ) {
    throw new Error('FILE');
  }
};

const isFileAvailable = async (
  dir: string,
  filename: string,
): Promise<boolean> => {
  try {
    verifyDirectory(dir);
    verifyFilename(filename);
    await fs.stat(path.join(QUESTION_CONTENT.RELATIVE_URL, filename.replace(/[^a-zA-Z0-9._-]/g, '')));
    return true;
  } catch (e) {
    return false;
  }
};

export default { isFileAvailable };
