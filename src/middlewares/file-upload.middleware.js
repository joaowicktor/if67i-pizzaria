import multer from 'multer';
import { MulterStorageStreamAdapter } from '../adapters/multer-storage.adapter.js';

const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export const upload = (acceptedMimeTypes = IMAGE_MIME_TYPES) =>
  multer({
    fileFilter: (req, file, cb) => (acceptedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Tipo de arquivo não suportado'), false)),
    storage: new MulterStorageStreamAdapter(),
  });
