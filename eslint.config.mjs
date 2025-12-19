import rules from '@shelf/eslint-config/typescript.js';

export default [...rules, {ignores: ['coverage/', 'lib/', 'renovate.json', 'tsconfig.json']}];
