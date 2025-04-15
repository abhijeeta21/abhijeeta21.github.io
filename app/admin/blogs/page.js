'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { getAllBlogPosts } from '../../lib/blog-utils';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog posts client-side
  useEffect(() => {
    try {
      // For static sites, get blogs directly from utility
      const blogPosts = getAllBlogPosts();
      setBlogs(blogPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error loading blogs:', error);
      setError('Failed to load blog posts');
      setLoading(false);
    }
  }, []);

  // Note: Delete functionality won't work in a static site
  const handleDeleteBlog = async (id) => {
    alert('Delete functionality is not available in the static version of the site.');
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>Error: {error}</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <h1>Blog Management</h1>
        <p style={{ color: 'orange', marginBottom: '1rem' }}>
          Note: This is a static site. Admin functionality is limited in this mode.
        </p>
        <Link href="/admin/blogs/new" className={styles.primaryButton}>
          Create New Blog Post
        </Link>
      </header>
      
      <div className={styles.adminContent}>
        <h2>All Blog Posts</h2>
        
        {blogs.length === 0 ? (
          <p className={styles.emptyState}>No blog posts found. Create your first blog post!</p>
        ) : (
          <div className={styles.blogsList}>
            {blogs.map((blog) => (
              <div key={blog.id} className={styles.blogItem}>
                <div className={styles.blogDetails}>
                  <h3>{blog.title}</h3>
                  <p className={styles.blogDate}>Published: {blog.date}</p>
                  <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                </div>
                <div className={styles.blogActions}>
                  <Link href={`/blog/${blog.id}`} className={styles.editButton}>
                    View
                  </Link>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
