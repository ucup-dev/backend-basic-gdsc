function makeSlug(title) {
    // Lowercase the title
    title = title.toLowerCase();
  
    // Replace all spaces with hyphens
    title = title.replace(" ", "-").replace("_", "-").replace(".", "-").replace(",", "-");
  
    // Remove all non-alphanumeric characters
    title = title.replace(/[^a-z0-9-]+/g, "");
  
    // Remove any leading or trailing hyphens
    title = title.trim("-");
  
    // Return the slug
    return title;
  }

  module.exports = {makeSlug}