const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "preview", // The serverless function name from your permalink object
    functionsDir: "./functions/",
  });

  eleventyConfig.cloudinaryCloudName = 'dzhcms4s6'
  eleventyConfig.addShortcode('cloudinaryImage', function (path, transforms, alt, props = {}) {
    if (!path) {
      return "";
    }
    
    const url = path.startsWith("https://") ? path : `https://res.cloudinary.com/${encodeURIComponent(eleventyConfig.cloudinaryCloudName)}/${encodeURIComponent(transforms)}/${encodeURIComponent(path)}`;
    const attrs = Object.keys(props).map(prop => `${prop}="${encodeURIComponent(props[prop])}"`).join(" ");
    
    return `<img src="${url}" alt="${alt}" ${attrs}/>`;
  })

  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
};