import path from 'path';

const isFileAvailable = async (
  dir: string,
  filename: string,
): Promise<boolean> => {
  try {
    // Нормализуем путь
    const normalizedPath = path.resolve(dir, filename);

    // Убедитесь, что путь не выходит за пределы допустимой директории
    const baseDirectory = path.resolve(__dirname, 'allowed_directory'); // Замените на вашу допустимую директорию
    if (!normalizedPath.startsWith(baseDirectory)) {
      throw new Error('Invalid path');
    }

    // Динамический импорт
    await import(normalizedPath);
    return true;
  } catch (e) {
    console.error('File not available:', e.message);
    return false;
  }
};

export default { isFileAvailable };
