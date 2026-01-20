import { generateFiles } from 'fumadocs-openapi';
import { openapi } from '../lib/openapi';

async function main() {
  await generateFiles({
    input: openapi,
    output: './content/docs/api/reference',
    per: 'operation',
    groupBy: 'tag',
  });

  console.log('API docs generated successfully!');
}

main().catch(console.error);
