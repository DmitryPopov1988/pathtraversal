import fs from 'fs/promises';
import path from 'path';

const isFileAvailible = async (dir: string, filename: string): Promise<boolean> => {
try {
const filePath: string = path.join(path.resolve(dir), filename);
await fs.stat(filePath);
return true;
} catch (e) {
return false;
}
}

export default { isFileAvailible );
