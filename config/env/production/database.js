const path = require('path');

module.exports = ({ env }) => {
  const client = env('PRODUCTION_DATABASE_CLIENT', 'sqlite');

  const connections = {
    postgres: {
      connection: {
        connectionString: env('PRODUCTION_DATABASE_URL'),
        host: env('PRODUCTION_DATABASE_HOST', 'localhost'),
        port: env.int('PRODUCTION_DATABASE_PORT', 5432),
        database: env('PRODUCTION_DATABASE_NAME', 'strapi'),
        user: env('PRODUCTION_DATABASE_USERNAME', 'strapi'),
        password: env('PRODUCTION_DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('PRODUCTION_DATABASE_SSL', false) && {
          key: env('PRODUCTION_DATABASE_SSL_KEY', undefined),
          cert: env('PRODUCTION_DATABASE_SSL_CERT', undefined),
          ca: env('PRODUCTION_DATABASE_SSL_CA', undefined),
          capath: env('PRODUCTION_DATABASE_SSL_CAPATH', undefined),
          cipher: env('PRODUCTION_DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool(
            'PRODUCTION_DATABASE_SSL_REJECT_UNAUTHORIZED',
            true,
          ),
        },
        schema: env('PRODUCTION_DATABASE_SCHEMA', 'public'),
      },
      pool: {
        min: env.int('PRODUCTION_DATABASE_POOL_MIN', 2),
        max: env.int('PRODUCTION_DATABASE_POOL_MAX', 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          '..',
          env('PRODUCTION_DATABASE_FILENAME', '.tmp/data.db'),
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int(
        'PRODUCTION_DATABASE_CONNECTION_TIMEOUT',
        60000,
      ),
    },
  };
};
