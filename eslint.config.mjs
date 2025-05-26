// eslint.config.js
import js from "@eslint/js";
import parser from '@typescript-eslint/parser';
import * as tsPlugin from '@typescript-eslint/eslint-plugin';
import path from 'path';
import fs from 'fs';

// Dynamically detect all topic folders with tsconfig.json
const topics = fs.readdirSync('./').filter((dir) => {
  const stats = fs.statSync(dir);
  return stats.isDirectory() && fs.existsSync(path.join(dir, 'tsconfig.json'));
});

export default [
  js.configs.recommended,
  ...topics.map((topic) => ({
    files: [`${topic}/**/*.ts`],
    languageOptions: {
      parser,
      parserOptions: {
        project: path.resolve(`${topic}/tsconfig.json`),
        tsconfigRootDir: path.resolve(),
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    }
  })),
];
