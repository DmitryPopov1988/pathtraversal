import path from 'path';
import { QUESTION_CONTENT } from '@core/services/constants';

const importModule = async (filePath: string): Promise<void> => {
  return import(filePath);
};

const isFileAvailable = async (
  dir: string,
  filename: string,
): Promise<boolean> => {
  const normalizedPath = path.resolve(dir, filename);
  const baseDirectory = path.resolve(__dirname, QUESTION_CONTENT.RELATIVE_URL);
  if (!normalizedPath.startsWith(baseDirectory)) {
    throw new Error('Invalid path specified.');
  }
  try {
    await importModule(normalizedPath);
    return true;
  } catch (e) {
    return false;
  }
};

export { isFileAvailable, importModule };
