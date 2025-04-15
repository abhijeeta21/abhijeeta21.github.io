'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EditForm({ blogData, id }) {
  const [formData, setFormData] = useState({
    title: blogData?.title || '',
    excerpt: blogData?.excerpt || '',
    content: blogData?.content || '',
    coverImage: blogData?.coverImage || '/images/blog/default.jpg'
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
    
    alert('Edit functionality is not available in static site mode');
    setIsSubmitting(false);
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <h2>Edit Blog Post</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              borderRadius: '0.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              border: '1px solid #333'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="excerpt" style={{ display: 'block', marginBottom: '0.5rem' }}>Excerpt*</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              borderRadius: '0.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              border: '1px solid #333',
              minHeight: '100px'
            }}
          ></textarea>
        </div>
        
        <div style={{ marginTop: '1.5rem' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: '#06b6d4',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            {isSubmitting ? 'Updating...' : 'Update Blog Post'}
          </button>
          
          <Link href="/admin/blogs" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: 'white',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            border: '1px solid white'
          }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
