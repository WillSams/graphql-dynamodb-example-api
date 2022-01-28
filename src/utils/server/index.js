const isDevelopmentHost = () =>
  process.env.NODE_ENV === 'development' ? true : false;


module.exports = {
  isDevelopmentHost,
};