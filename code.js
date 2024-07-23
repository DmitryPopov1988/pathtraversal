import fs from 'fs/promises';
import path from 'path';
import { QUESTION_CONTENT } from '@core/services/constants';

const ALLOWED_PATH = path.resolve(QUESTION_CONTENT.RELATIVE_URL);

const verifyDirectory = (dir: string) => {
  const resolvedDir = path.resolve(dir);
  if (!resolvedDir.startsWith(ALLOWED_PATH)) {
    throw new Error('PATH');
  }
};

const verifyFilename = (filename: string) => {
  if (
    path.isAbsolute(filename) ||
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
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '');
    const filePAth = path.resolve(dir, sanitizedFilename);

    await fs.stat(filePAth);
    return true;
  } catch (e) {
    return false;
  }
};

export default { isFileAvailable };
