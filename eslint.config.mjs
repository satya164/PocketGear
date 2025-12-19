import { jest, react, recommended } from 'eslint-config-satya164';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  recommended,

  react,
  jest,

  globalIgnores([
    '**/node_modules/',
    '**/coverage/',
    '**/dist/',
    '**/lib/',
    '**/.expo/',
    '**/.yarn/',
    '**/.vscode/',
  ])
);
