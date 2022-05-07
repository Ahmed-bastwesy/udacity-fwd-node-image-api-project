import { promises as fs } from 'fs';
import path from 'path';
import File from '../file';

describe('Test image processing via sharp', (): void => {
  it('raises an error (invalid width value)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'foo',
      width: '-100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  // Note: Could also fail because of directory permissions
  it('succeeds to write resized thumb file (existing file, valid size values)', async (): Promise<void> => {
    await File.createThumb({
      filename: 'santamonica',
      width: '245',
      height: '245'
    });

    const resizedImagePath: string = path.resolve(
      File.imagesThumbPath,
      `santamonica-254x245.jpg`
    );
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'File was not created';
    }

    expect(errorFile).not.toBeNull();
  });
});

// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesThumbPath,
    'santamonica-245x245.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // intentionally left blank
  }
});
