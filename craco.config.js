// craco.config.js
module.exports = {
    babel: {
      plugins: [
        ['@babel/plugin-transform-private-property-in-object', { loose: true }],
        ['@babel/plugin-transform-class-properties', { loose: true }],
        ['@babel/plugin-transform-private-methods', { loose: true }]
      ]
    }
  };
  