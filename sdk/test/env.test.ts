const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Helper to load and parse an env file without modifying process.env.
function loadEnvFile(filename: string) {
  const filePath = path.resolve(__dirname, "../..", filename);
  return dotenv.config( { path: filePath } ).parsed;
}

describe('Environment Configuration Tests', () => {
  test('.env should have CONFIG_NAME=poonet-localnet', () => {
    const env = loadEnvFile('.env');
    expect(env.CONFIG_NAME).toBe('poonet-localnet');
  });

  test('.env.margold should have CONFIG_NAME=marigold', () => {
    const env = loadEnvFile('.env.marigold');
    expect(env.CONFIG_NAME).toBe('marigold');
  });

  test('.env.marigold.localnet should have CONFIG_NAME=marigold-localnet', () => {
    const env = loadEnvFile('.env.marigold.localnet');
    expect(env.CONFIG_NAME).toBe('marigold-localnet');
  });
});
