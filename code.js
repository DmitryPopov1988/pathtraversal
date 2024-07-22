import fs from 'fs/promises';
import path from 'path';


const isFileAvailable = async (dir: string, filename: string): Promise<boolean> => {

  if (!dir.startWith('../../shared') {
  throw new Error('Invalid path specified.');
  }

if (
    filename.includes('..') ||
    filename.includes('/') ||
    filename.includes('\\')
  ) {
    throw new Error('Invalid file name.');
  }






  try {
    // Проверяем, существует ли файл
    await fs.stat(path.join(dir, filename));
    return true;
  } catch (e) {
    return false;
  }
};

export default { isFileAvailable };

