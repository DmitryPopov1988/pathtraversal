import fs from 'fs/promises';
import path from 'path';
import { QUESTION_CONTENT } from './constants'; // Убедитесь, что этот импорт корректен

const BASE_DIRECTORY = path.resolve(QUESTION_CONTENT.RELATIVE_URL); // Определите фиксированный путь к базовой директории

const isFileAvailable = async (filename: string): Promise<boolean> => {
  // Убедимся, что имя файла не содержит никаких сегментов пути и не является абсолютным путем
  if (path.isAbsolute(filename) || filename.includes('/') || filename.includes('\\')) {
    throw new Error('Неверное имя файла');
  }

  // Составляем полный путь к файлу
  const filePath = path.join(BASE_DIRECTORY, filename);

  try {
    // Проверяем, существует ли файл
    const files = await fs.readdir(BASE_DIRECTORY, { withFileTypes: true });
    return files.some(file => file.isFile() && file.name === filename);
  } catch (error) {
    console.error('Ошибка при чтении директории:', error);
    return false;
  }
};

export default { isFileAvailable };
