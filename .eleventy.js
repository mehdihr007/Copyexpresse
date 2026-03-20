module.exports = function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("Logo.jpg");
  eleventyConfig.addPassthroughCopy("book.jpg");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");

  // Create products collection from src/_products
  eleventyConfig.addCollection("products", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/_products/*.md");
  });

  // Featured products only
  eleventyConfig.addCollection("featuredProducts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/_products/*.md").filter(item => item.data.featured);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
