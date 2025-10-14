import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors (backward compatibility)
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Blue colors
        blue: {
          5: "var(--color-blue-5)",
          10: "var(--color-blue-10)",
          20: "var(--color-blue-20)",
          30: "var(--color-blue-30)",
          40: "var(--color-blue-40)",
          50: "var(--color-blue-50)",
          60: "var(--color-blue-60)",
          70: "var(--color-blue-70)",
          80: "var(--color-blue-80)",
          90: "var(--color-blue-90)",
        },
        
        // Gray colors
        gray: {
          white: "var(--color-gray-white)",
          5: "var(--color-gray-5)",
          10: "var(--color-gray-10)",
          20: "var(--color-gray-20)",
          30: "var(--color-gray-30)",
          40: "var(--color-gray-40)",
          50: "var(--color-gray-50)",
          60: "var(--color-gray-60)",
          70: "var(--color-gray-70)",
          80: "var(--color-gray-80)",
          90: "var(--color-gray-90)",
          black: "var(--color-gray-black)",
        },
        
        // Red colors
        red: {
          5: "var(--color-red-5)",
          10: "var(--color-red-10)",
          20: "var(--color-red-20)",
          30: "var(--color-red-30)",
          40: "var(--color-red-40)",
          50: "var(--color-red-50)",
          60: "var(--color-red-60)",
        },
        
        // Green colors
        green: {
          5: "var(--color-green-5)",
          10: "var(--color-green-10)",
          20: "var(--color-green-20)",
          30: "var(--color-green-30)",
          40: "var(--color-green-40)",
          50: "var(--color-green-50)",
          60: "var(--color-green-60)",
        },
        
        // Yellow colors
        yellow: {
          5: "var(--color-yellow-5)",
          10: "var(--color-yellow-10)",
          20: "var(--color-yellow-20)",
          30: "var(--color-yellow-30)",
          40: "var(--color-yellow-40)",
          50: "var(--color-yellow-50)",
          60: "var(--color-yellow-60)",
        },
        
        // Cool gray colors
        coolGray: {
          1: "var(--color-cool-gray-1)",
          5: "var(--color-cool-gray-5)",
          10: "var(--color-cool-gray-10)",
          20: "var(--color-cool-gray-20)",
          30: "var(--color-cool-gray-30)",
          40: "var(--color-cool-gray-40)",
          50: "var(--color-cool-gray-50)",
          60: "var(--color-cool-gray-60)",
        },
        
        // Semantic colors
        primary: "var(--color-primary)",
        'primary-hover': "var(--color-primary-hover)",
        error: "var(--color-error)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
      },
      
      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        tertiary: "var(--color-text-tertiary)",
        disabled: "var(--color-text-disabled)",
        inverse: "var(--color-text-inverse)",
      },
      
      backgroundColor: {
        primary: "var(--color-background)",
        surface: "var(--color-surface)",
      },
      
      backgroundImage: {
        'gradient-primary': "var(--color-gradient-primary)",
        'gradient-skeleton': "var(--color-gradient-skeleton)",
      },
    },
  },
  plugins: [],
};
export default config;
