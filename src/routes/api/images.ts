import express from 'express';
import File from './../../file';

// query segments
interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

// validation of url query 

const validate = async (query: ImageQuery): Promise<null | string> => {
  // Check if requested file is available
  if (!(await File.isImageAvailable(query.filename))) {
    const availableImageNames: string = (
      await File.getAvailableImageNames()
    ).join(' | ');
    return `'filename' must be one of this list: ${availableImageNames}.`;
  }

  if (!query.width && !query.height) {
    return null; // No size values
  }

  // Check for valid width value
  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "'width' must be positive number";
  }

  // Check for valid height value
  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "'height' must be positive number";
  }

  return null;
};

// image router
const images: express.Router = express.Router();

images.get(
  '/',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    // Check whether request can be worked with
    const validationMessage: null | string = await validate(req.query);
    if (validationMessage) {
      res.send(validationMessage);
      return;
    }

    let error: null | string = '';

    // Create thumb if not yet available
    if (!(await File.isThumbAvailable(req.query))) {
      error = await File.createThumb(req.query);
    }

    // Handle image processing error
    if (error) {
      res.send(error);
      return;
    }

    // Retrieve appropriate image path and display image
    const path: null | string = await File.getImagePath(req.query);
    if (path) {
      res.sendFile(path);
    } else {
      res.send('something wrong');
    }
  }
);

export default images;
