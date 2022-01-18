const isDevelopmentHost = () =>
  process.env.NODE_ENV === 'development' ? true : false;

const getHostDomain = () =>
  isDevelopmentHost ? 'localhost' : process.env.API_HOST;

module.exports = {
  getHostDomain,
  isDevelopmentHost,
};