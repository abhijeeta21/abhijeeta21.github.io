import fs from 'fs';
import path from 'path';
import { getBlogPostById } from '../../lib/blog-utils';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import styles from './page.module.css';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogsDirectory = path.join(process.cwd(), 'app/data/blogs');
  
  // Check if the directory exists
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(blogsDirectory);
  
  // Filter markdown files and exclude README
  const mdFiles = fileNames.filter(file => 
    file.endsWith('.md') && file !== 'README.md'
  );
  
  return mdFiles.map(fileName => ({
    id: fileName.replace(/\.md$/, '')
  }));
}

// Convert markdown to HTML
async function markdownToHtml(markdown) {
  const result = await remark()
    .use(html)
    .process(markdown);
  return result.toString();
}

export default async function BlogPost({ params }) {
  // Make sure params exists and has an id property
  if (!params || !params.id) {
    return (
      <div className={styles.blogNotFound}>
        <h1>Blog Post Not Found</h1>
        <p>Invalid blog post identifier.</p>
        <Link href="/#blogs">Back to Blogs</Link>
      </div>
    );
  }
  
  const id = params.id;
  
  try {
    const post = getBlogPostById(id);
    
    if (!post) {
      return (
        <div className={styles.blogNotFound}>
          <h1>Blog Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link href="/#blogs">Back to Blogs</Link>
        </div>
      );
    }
    
    // Convert markdown content to HTML
    const contentHtml = await markdownToHtml(post.content);
    
    return (
      <div className={styles.blogPostContainer}>
        <header className={styles.blogPostHeader}>
          <h1>{post.title}</h1>
          <p className={styles.blogPostDate}>
            {new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </header>
        
        {post.coverImage && (
          <div className={styles.blogPostImage}
               style={{ backgroundImage: `url(${post.coverImage})` }}>
          </div>
        )}
        
        <div className={styles.blogPostContent}>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
        
        <div className={styles.blogPostNavigation}>
          <Link href="/#blogs" className={styles.backToBlogs}>
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error rendering blog post ${id}:`, error);
    return (
      <div className={styles.blogNotFound}>
        <h1>Error Loading Blog Post</h1>
        <p>There was a problem loading this blog post. Please try again later.</p>
        <Link href="/#blogs">Back to Blogs</Link>
      </div>
    );
  }
}
