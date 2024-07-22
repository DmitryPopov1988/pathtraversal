import fs from 'fs/promises';
import path from 'path';
import { QUESTION_CONTENT } from './constants'; // Убедитесь, что этот импорт корректен

const isFileAvailable = async (dir: string, filename: string): Promise<boolean> => {
  try {
    // 2 Читаем содержимое директории и проверяем, существует ли файл
    const files = await fs.readdir(path.normalize(dir));
    return files.includes(filename);
  } catch (error) {
    console.error('Ошибка при чтении директории:', error);
    return false;
  }
};

export default { isFileAvailable };
