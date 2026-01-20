import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  input: ['./openapi/spec.json'],
  proxyUrl: '/api/proxy',
});
