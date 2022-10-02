/**
 * Read a file and return its content
 * @param {import('fs').ReadStream} stream
 * @returns {Promise<Buffer>}
 */
const readStream = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
};

export default {
  readStream,
};
