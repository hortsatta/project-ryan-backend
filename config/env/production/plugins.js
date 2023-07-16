module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('PRODUCTION_CLOUDINARY_NAME'),
        api_key: env('PRODUCTION_CLOUDINARY_KEY'),
        api_secret: env('PRODUCTION_CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {
          folder: env('PRODUCTION_CLOUDINARY_FOLDER'),
          format: env('PRODUCTION_CLOUDINARY_IMG_FORMAT'),
        },
        delete: {},
      },
    },
  },
});
