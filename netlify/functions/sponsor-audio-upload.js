const busboy = require('busboy');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.handler = async (event) => {
  if (event.headers['x-owner-key'] !== process.env.TKFM_OWNER_KEY) {
    return { statusCode:403, body:'Forbidden' };
  }

  return new Promise((resolve, reject) => {
    const bb = busboy({ headers:event.headers });
    let requestId;
    let tempPath;

    bb.on('file', (_, file, info) => {
      tempPath = `/tmp/${Date.now()}-${info.filename}`;
      file.pipe(fs.createWriteStream(tempPath));
    });

    bb.on('field', (name, val) => {
      if (name === 'id') requestId = val;
    });

    bb.on('close', async () => {
      try {
        const upload = await cloudinary.uploader.upload(tempPath, {
          resource_type: 'video',
          folder: 'tkfm/sponsor_reads',
          public_id: requestId
        });

        resolve({
          statusCode:200,
          body: JSON.stringify({
            ok:true,
            url: upload.secure_url
          })
        });
      } catch (err) {
        reject(err);
      }
    });

    bb.end(Buffer.from(event.body, 'base64'));
  });
};
