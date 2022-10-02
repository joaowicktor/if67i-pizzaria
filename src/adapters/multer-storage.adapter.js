import { v4 as uuidv4 } from 'uuid';
import fileHelper from '../helpers/file.helper.js';

export class MulterStorageStreamAdapter {
  constructor() {
    this.getDestination = (req, file, cb) => cb(null);
  }

  _handleFile(req, file, cb) {
    this.getDestination(req, file, (err) => {
      if (err) return cb(err);

      fileHelper
        .readStream(file.stream)
        .then((buffer) => {
          cb(null, { filename: `${uuidv4()}-${file.originalname}`, buffer });
        })
        .catch(cb);
    });
  }
}
