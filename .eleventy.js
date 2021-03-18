const markdown = require("./utils/markdown")
const shortcodes = require("./utils/shortcodes")
const sass = require("./utils/sass")


module.exports = function (eleventyConfig) {
    resLocations = ["res", "styles", "scripts"]

    // Allow custom markdown parser, switchfrom default engine (liquid) to njk
    eleventyConfig.setLibrary('md', markdown)

   // sass("./styles/index.sass", "./styles/index.css")

    // Shortcodes
    eleventyConfig.addPairedShortcode('markdown', shortcodes.markdown)

    // Pass Throughs
    resLocations.map((location) => {
      eleventyConfig.addPassthroughCopy(location)
    })
  
    

    // return object
    configObject = {
      dir: {
        input: "views", // default `.`
        output: "_site", // default `_site`
        includes: "_includes", // This path is relative to the input dir. default `_includes`
        data: "_data",
      },

      // switch default engines from liquid to njk
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk",
    }
  
    return configObject
  }