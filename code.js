import fs from 'fs/promises';
import path from 'path';


const isFileAvailable = async (dir: string, filename: string): Promise<boolean> => {


  // Составляем полный путь к файлу
  const filePath: string = path.join(path.resolve(dir), filename);

  try {
    // Проверяем, существует ли файл
    await fs.stat(filePath);
    return true;
  } catch (e) {
    return false;
  }
};

export default { isFileAvailable };

