import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/nextjs-vite",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "viteFinal": async (config) => {
    // Tailwind CSS 설정
    const { mergeConfig } = await import('vite');
    const tailwindcss = await import('tailwindcss');
    const autoprefixer = await import('autoprefixer');
    
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [
            tailwindcss.default,
            autoprefixer.default,
          ],
        },
      },
      resolve: {
        alias: {
          '@': '/Users/jay/SeSAC/14th_homework/04-vibe-coding-emotional-journal/src',
        },
      },
    });
  },
};
export default config;