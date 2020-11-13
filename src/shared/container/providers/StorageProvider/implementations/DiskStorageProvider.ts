import fs from 'fs';
import * as path from 'path';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import UploadConfig from '@config/upload';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(UploadConfig.directory, file),
      path.resolve(UploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(UploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
