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

  // Categories collection sorted by custom order then name
  eleventyConfig.addCollection("categories", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/_categories/*.md")
      .sort((a, b) => {
        const orderA = typeof a.data.order === "number" ? a.data.order : 100;
        const orderB = typeof b.data.order === "number" ? b.data.order : 100;
        if (orderA !== orderB) return orderA - orderB;
        return (a.data.name || "").localeCompare(b.data.name || "", "ar");
      });
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
