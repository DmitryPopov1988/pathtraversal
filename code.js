import fs from 'fs/promises';
import path from 'path';

const BASE_DIRECTORY = path.resolve('path/to/allowed/base/directory'); // Задайте фиксированный путь к разрешенной директории

const isFileAvailable = async (dir: string, filename: string): Promise<boolean> => {
  // Нормализуем и разрешаем путь
  const normalizedDir = path.resolve(path.normalize(dir));
  const basePath = path.resolve(BASE_DIRECTORY);

  // Убедимся, что нормализованный путь находится в пределах разрешенной директории
  if (!normalizedDir.startsWith(basePath)) {
    throw new Error('Access to the directory is not allowed');
  }

  // Проверка имени файла
  if (path.isAbsolute(filename) || filename.includes('/') || filename.includes('\\')) {
    throw new Error('Invalid filename');
  }

  try {
    // Читаем содержимое директории и проверяем наличие файла
    const files = await fs.readdir(normalizedDir);
    return files.includes(filename);
  } catch (error) {
    console.error('Error reading directory:', error);
    return false;
  }
};

export default { isFileAvailable };
