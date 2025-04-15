// Import modules conditionally to support static export
let fs;
let path;
let matter;

// Only import Node.js modules during build time
if (typeof window === 'undefined') {
  fs = require('fs');
  path = require('path');
  matter = require('gray-matter');
}

// Static blog data for client-side usage
const staticBlogPosts = [
  {
    id: 'HSS',
    title: "Missing the HSS Pre-Registration Deadline",
    date: "2025-04-15",
    excerpt: "Why professors are so negligient giving courses if a student misses the HSS pre-registration",
    coverImage: "/images/blog/react-hooks.jpg",
    content: "# Making the preference list for HSS\n\nI spent 4 hours making the HSS pref. list ...will continue the story later."
  }
];

// Use a function to determine the correct blogs directory path
function getBlogsDirectory() {
  if (typeof window === 'undefined') {
    return path.join(process.cwd(), 'app/data/blogs');
  }
  return null;
}

// Get all blog posts
export function getAllBlogPosts() {
  // If running in browser, return static data
  if (typeof window !== 'undefined') {
    return staticBlogPosts;
  }
  
  const blogsDirectory = getBlogsDirectory();
  
  // Ensure the directory exists
  if (!fs.existsSync(blogsDirectory)) {
    return staticBlogPosts;
  }
  
  // Get all files from the blogs directory
  const fileNames = fs.readdirSync(blogsDirectory);
  
  // Filter out the README.md file and any non-markdown files
  const mdFiles = fileNames.filter(file => 
    file.endsWith('.md') && file !== 'README.md'
  );

  const allBlogsData = mdFiles.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Ensure coverImage path is prefixed correctly for GitHub Pages
    let coverImage = matterResult.data.coverImage || '/images/blog/default.jpg';
    
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      coverImage,
      content: matterResult.content
    };
  });

  // Sort posts by date
  return allBlogsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get a specific blog post by ID
export function getBlogPostById(id) {
  try {
    // If running in browser, return from static data
    if (typeof window !== 'undefined') {
      return staticBlogPosts.find(post => post.id === id);
    }
    
    // Find all blog posts first
    const allPosts = getAllBlogPosts();
    
    // Find the post with matching ID
    return allPosts.find(post => post.id === id);
  } catch (error) {
    console.error(`Error getting blog post with id ${id}:`, error);
    return null;
  }
}

// The following functions will only work server-side during build time
// They're needed for the static site generation but won't be called client-side

// Create a new blog post
export function createBlogPost(title, content, excerpt, coverImage = '/images/blog/default.jpg') {
  if (typeof window !== 'undefined') {
    console.error('createBlogPost cannot run in browser');
    return { success: false, error: 'Cannot create posts client-side' };
  }
  
  try {
    const blogsDirectory = getBlogsDirectory();
    
    // Create a slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')  // Remove special characters
      .replace(/\s+/g, '-');    // Replace spaces with hyphens
    
    // Create date string
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Create filename
    const fileName = `${date}-${slug}.md`;
    
    // Create frontmatter
    const frontMatter = {
      title,
      date,
      excerpt,
      coverImage
    };
    
    // Combine frontmatter and content
    const fileContent = matter.stringify(content, frontMatter);
    
    // Ensure directory exists
    if (!fs.existsSync(blogsDirectory)) {
      fs.mkdirSync(blogsDirectory, { recursive: true });
    }
    
    // Write to file
    fs.writeFileSync(path.join(blogsDirectory, fileName), fileContent);
    
    return {
      success: true,
      id: `${date}-${slug}`,
      fileName
    };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Add the missing functions for updating and deleting blog posts
export function updateBlogPost(id, title, content, excerpt, coverImage = '/images/blog/default.jpg') {
  if (typeof window !== 'undefined') {
    console.error('updateBlogPost cannot run in browser');
    return { success: false, error: 'Cannot update posts client-side' };
  }
  
  try {
    const blogsDirectory = getBlogsDirectory();
    
    // For static sites, we'll just simulate a successful response
    // In a real application, this would update the file
    console.log(`Would update blog post ${id} with title: ${title}`);
    
    return {
      success: true,
      id: id
    };
  } catch (error) {
    console.error('Error updating blog post:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export function deleteBlogPost(id) {
  if (typeof window !== 'undefined') {
    console.error('deleteBlogPost cannot run in browser');
    return { success: false, error: 'Cannot delete posts client-side' };
  }
  
  try {
    const blogsDirectory = getBlogsDirectory();
    
    // For static sites, we'll just simulate a successful response
    // In a real application, this would delete the file
    console.log(`Would delete blog post with id: ${id}`);
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
