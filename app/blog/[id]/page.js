import Link from 'next/link';
import styles from './page.module.css';
import { remark } from 'remark';
import html from 'remark-html';

// Static blog data
const blogPosts = [
  {
    id: 'HSS',
    title: "Missing the HSS Pre-Registration Deadline",
    date: "2025-04-15",
    excerpt: "Why professors are so negligient giving courses if a student misses the HSS pre-registration",
    coverImage: "/images/blog/react-hooks.jpg",
    content: "# Making the preference list for HSS\n\nI spent 4 hours making the HSS pref. list ...will continue the story later."
  }
];

// Generate static paths for all blog posts
export function generateStaticParams() {
  return blogPosts.map(post => ({ id: post.id }));
}

// Convert markdown to HTML
async function markdownToHtml(markdown) {
  const result = await remark()
    .use(html)
    .process(markdown);
  return result.toString();
}

// Make the component async to properly handle async operations
export default async function BlogPost({ params }) {
  const { id } = params;
  
  // Find the blog post with the matching ID
  const post = blogPosts.find(p => p.id === id);

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
}
