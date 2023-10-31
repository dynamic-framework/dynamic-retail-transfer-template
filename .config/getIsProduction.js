module.exports = (argv) => (
  argv.mode === 'production' && process.env.NODE_ENV === 'production'
);
