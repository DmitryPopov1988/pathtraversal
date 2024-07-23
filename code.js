import path from 'path';
import { isFileAvailable, importModule } from './fileUtils';
import { QUESTION_CONTENT } from '@core/services/constants';

// Мокаем importModule для управления результатами импорта
jest.mock('./fileUtils', () => ({
  ...jest.requireActual('./fileUtils'),
  importModule: jest.fn(),
}));

// Мокаем QUESTION_CONTENT для корректного базового пути
jest.mock('@core/services/constants', () => ({
  QUESTION_CONTENT: {
    RELATIVE_URL: '/base/path',
  },
}));

describe('isFileAvailable', () => {
  const baseDir = '/base/path';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return true if the file is available', async () => {
    const filename = 'file-to-check.ts';
    const filePath = path.resolve(baseDir, filename);

    // Мокаем importModule для успешного импорта
    (importModule as jest.Mock).mockResolvedValue({});

    const result = await isFileAvailable(baseDir, filename);
    expect(result).toBe(true);
  });

  it('should return false if the file is not available', async () => {
    const filename = 'file-to-check.ts';
    const filePath = path.resolve(baseDir, filename);

    // Мокаем importModule для неудачного импорта
    (importModule as jest.Mock).mockRejectedValue(new Error('Module not found'));

    const result = await isFileAvailable(baseDir, filename);
    expect(result).toBe(false);
  });

  it('should throw an error for invalid paths', async () => {
    const filename = 'file-to-check.ts';
    const invalidDir = '/invalid/path';

    await expect(isFileAvailable(invalidDir, filename)).rejects.toThrow('Invalid path specified.');
  });

  it('should handle invalid filenames with path traversal attempts', async () => {
    const filename = '../file-to-check.ts'; // Пример пути, который должен быть отклонен
    const invalidDir = baseDir;

    await expect(isFileAvailable(invalidDir, filename)).rejects.toThrow('Invalid path specified.');
  });
});
