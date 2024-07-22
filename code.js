import fs from 'fs/promises';
import path from 'path';
import { QUESTION_CONTENT } from './constants'; // Убедитесь, что этот импорт корректен

const isFileAvailable = async (dir: string, filename: string): Promise<boolean> => {
  // Нормализуем и разрешаем путь к директории
  const normalizedDir = path.resolve(path.normalize(dir));
  const basePath = path.resolve(QUESTION_CONTENT.RELATIVE_URL);

  // Убедимся, что нормализованный путь находится в разрешенной директории
  if (!normalizedDir.startsWith(basePath + path.sep)) {
    throw new Error('Доступ к директории не разрешен');
  }

  // Убедимся, что имя файла не содержит никаких сегментов пути и не является абсолютным путем
  if (path.isAbsolute(filename) || filename.includes('/') || filename.includes('\\')) {
    throw new Error('Неверное имя файла');
  }

  try {
    // Читаем содержимое директории и проверяем, существует ли файл
    const files = await fs.readdir(normalizedDir);
    return files.includes(filename);
  } catch (error) {
    console.error('Ошибка при чтении директории:', error);
    return false;
  }
};

export default { isFileAvailable };
