/**
 * Astro v6 rejects legacy `src/content/config.*` when the new `src/content.config.*`
 * is missing. Remove any legacy files so `astro dev` / `astro build` can run.
 */
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const legacyNames = ['config.ts', 'config.js', 'config.mjs', 'config.mts'];

for (const name of legacyNames) {
	const filePath = path.join(root, 'src', 'content', name);
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
		console.log(`[astro] Removed legacy content config: ${path.relative(root, filePath)}`);
	}
}

const newConfigTs = path.join(root, 'src', 'content.config.ts');
if (!fs.existsSync(newConfigTs)) {
	console.warn(
		'[astro] Missing src/content.config.ts. Add the Astro v6 content config (see https://docs.astro.build/en/guides/upgrade-to/v6/#removed-legacy-content-collections).'
	);
}
