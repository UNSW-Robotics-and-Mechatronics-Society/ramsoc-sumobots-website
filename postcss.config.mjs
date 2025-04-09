/** @type {import('postcss-load-config').Config} */
import tailwindcss from "@tailwindcss/postcss";

const config = {
  plugins: {
    tailwindcss: tailwindcss("./tailwind.config.js"),
  },
};

export default config;
