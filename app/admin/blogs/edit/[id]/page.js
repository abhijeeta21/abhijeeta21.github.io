'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../page.module.css';

// This function is necessary for static exports with dynamic routes
export function generateStaticParams() {
  // For static builds, we'll pre-generate the edit page for our known blog post
  return [
    { id: 'HSS' }
  ];
}

export default function EditBlogPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '/images/blog/default.jpg'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        // In a static build, we can use our static blog data
        setFormData({
          title: "Missing the HSS Pre-Registration Deadline",
          date: "2025-04-15",
          excerpt: "Why professors are so negligient giving courses if a student misses the HSS pre-registration",
          coverImage: "/images/blog/react-hooks.jpg",
          content: "# Making the preference list for HSS\n\nI spent 4 hours making the HSS pref. list ...will continue the story later."
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading blog post:', error);
        setError('Failed to load blog post');
        setIsLoading(false);
      }
    }

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    alert('Edit functionality is not available in static site mode');
    setIsSubmitting(false);
    
    // For a real application, you would make an API call here
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <h1>Edit Blog Post</h1>
        <Link href="/admin/blogs" className={styles.secondaryButton}>
          Back to All Blogs
        </Link>
      </header>

      <div className={styles.adminContent}>
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.blogForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={styles.formControl}
              placeholder="Enter blog title"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="excerpt">Excerpt*</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              className={styles.formControl}
              rows="2"
              placeholder="Enter a brief description of your blog post"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="coverImage">Cover Image URL</label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className={styles.formControl}
              placeholder="/images/blog/your-image.jpg"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Content (Markdown)*</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className={styles.formControl}
              rows="12"
              placeholder="Write your blog content in Markdown format..."
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Blog Post'}
            </button>
            
            <Link href="/admin/blogs" className={styles.cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
