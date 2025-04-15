import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Use a function to determine the correct blogs directory path
function getBlogsDirectory() {
  return path.join(process.cwd(), 'app/data/blogs');
}

// Get all blog posts
export function getAllBlogPosts() {
  const blogsDirectory = getBlogsDirectory();
  
  // Ensure the directory exists
  if (!fs.existsSync(blogsDirectory)) {
    return [];
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
    if (coverImage.startsWith('/')) {
      coverImage = `.${coverImage}`;
    }

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
    // Find all blog posts first
    const allPosts = getAllBlogPosts();
    
    // Find the post with matching ID
    return allPosts.find(post => post.id === id);
  } catch (error) {
    console.error(`Error getting blog post with id ${id}:`, error);
    return null;
  }
}

// Create a new blog post
export function createBlogPost(title, content, excerpt, coverImage = '/images/blog/default.jpg') {
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

// Update an existing blog post
export function updateBlogPost(id, title, content, excerpt, coverImage) {
  try {
    const blogsDirectory = getBlogsDirectory();
    
    // Find all markdown files
    const fileNames = fs.readdirSync(blogsDirectory);
    
    // Find the file that matches our ID
    const fileName = fileNames.find(file => file.replace(/\.md$/, '') === id);
    
    if (!fileName) {
      throw new Error(`Blog post with ID ${id} not found`);
    }
    
    // Create frontmatter
    const frontMatter = {
      title,
      date: id.split('-').slice(0, 3).join('-'),  // Extract date from ID
      excerpt,
      coverImage
    };
    
    // Combine frontmatter and content
    const fileContent = matter.stringify(content, frontMatter);
    
    // Write to file
    fs.writeFileSync(path.join(blogsDirectory, fileName), fileContent);
    
    return {
      success: true,
      id
    };
  } catch (error) {
    console.error(`Error updating blog post with ID ${id}:`, error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Delete a blog post
export function deleteBlogPost(id) {
  try {
    const blogsDirectory = getBlogsDirectory();
    
    // Find all markdown files
    const fileNames = fs.readdirSync(blogsDirectory);
    
    // Find the file that matches our ID
    const fileName = fileNames.find(file => file.replace(/\.md$/, '') === id);
    
    if (!fileName) {
      throw new Error(`Blog post with ID ${id} not found`);
    }
    
    // Delete the file
    fs.unlinkSync(path.join(blogsDirectory, fileName));
    
    return {
      success: true
    };
  } catch (error) {
    console.error(`Error deleting blog post with ID ${id}:`, error);
    return {
      success: false,
      error: error.message
    };
  }
}
