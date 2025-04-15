'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all blog posts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  // Delete a blog post
  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete blog post');
        }
        
        // Remove the deleted blog from the state
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Failed to delete blog post');
      }
    }
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
                  <Link href={`/admin/blogs/edit/${blog.id}`} className={styles.editButton}>
                    Edit
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
