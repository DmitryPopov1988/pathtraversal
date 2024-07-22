import fs from 'fs/promises';
import path from 'path';

const BASE_DIRECTORY = path.resolve('path/to/allowed/base/directory'); // Определите фиксированный путь к базовой директории

const isFileAvailable = async (filename: string): Promise<boolean> => {
  // Убедитесь, что имя файла не содержит никаких сегментов пути и не является абсолютным путем
  if (path.isAbsolute(filename) || filename.includes('/') || filename.includes('\\')) {
    throw new Error('Неверное имя файла');
  }

  // Составляем полный путь к файлу
  const filePath: string = path.join(BASE_DIRECTORY, filename);

  try {
    // Проверяем, существует ли файл
    await fs.stat(filePath);
    return true;
  } catch (e) {
    // Если файл не существует, fs.stat выбросит ошибку
    if (e.code === 'ENOENT') {
      return false;
    }
    // Обработка других ошибок
    console.error('Ошибка при проверке файла:', e);
    return false;
  }
};

export default { isFileAvailable };

