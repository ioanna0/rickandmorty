const { readFileSync } = require('fs');
const { resolve } = require('path');
const gql = require('graphql-tag');

module.exports = {
  process(src, filename) {
    const code = `
      const gql = require('graphql-tag');
      module.exports = gql\`${src}\`;
    `;
    return { code };
  },
  getCacheKey(fileData, filePath, configStr, options) {
    return 'graphql-transform';
  },
};
