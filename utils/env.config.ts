const isProd = process.env.NODE_ENV === 'production';

export default {
  NODE_ENV: isProd ? 'production' : 'development',
  POSTGRES_DBURL: isProd ? process.env.POSTGRES_DBURL : 'postgres://tripsit_api:P@ssw0rd@localhost:5432/tripsit',
};
