import fs from 'fs/promises';
const ALLOWED_PATH = '../../shared';

const isFileAvailable = async (dir: string, filename: string): Promise<boolean> => {
  try {
    await fs.stat(ALLOWED_PATH + filename); // test 34
    return true;
  } catch (e) {
    return false;
  }
};

export default { isFileAvailable };

