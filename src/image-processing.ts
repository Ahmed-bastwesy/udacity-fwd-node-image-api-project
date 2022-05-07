import sharp from 'sharp';

// query segments
interface sharpResizeParams {
  source: string;
  target: string;
  width: number;
  height: number;
}

const processImage = async (
  params: sharpResizeParams
): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat('jpeg')
      .toFile(params.target);
    return null;
  } catch {
    return 'Image could not be processed.';
  }
};

export default processImage;
