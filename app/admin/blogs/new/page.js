'use client';

export const dynamic = "force-static";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../page.module.css';

export default function NewBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '/images/blog/default.jpg'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    alert('Blog creation is not available in static mode.');
    setIsSubmitting(false);
  };

  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <h1>Create New Blog Post</h1>
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
              {isSubmitting ? 'Creating...' : 'Create Blog Post'}
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
