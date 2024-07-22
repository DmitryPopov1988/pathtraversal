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
    const filePath = path.join(dir, filename);
    await fs.stat(filePath); // test 33
    return true;
  } catch (e) {
    return false;
  }
};

export default { isFileAvailable };

