import crypto from 'crypto';
import bcrypt from 'bcrypt';

/**
 * Verifies if the given hash matches the given value
 * @param {string} value
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
const compareSHA256Hash = (value, hash) => {
  const sha256Hash = crypto.createHash('sha256').update(value).digest('hex');
  return bcrypt.compare(sha256Hash, hash);
};

export default {
  compareSHA256Hash,
};
