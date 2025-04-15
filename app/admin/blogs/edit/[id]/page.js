import Link from 'next/link';

// This function is necessary for static exports with dynamic routes
export function generateStaticParams() {
  // For static builds, we'll pre-generate the edit page for our known blog post
  return [
    { id: 'HSS' }
  ];
}

export default function EditBlogPage({ params }) {
  const { id } = params;

  return (
    <div style={{
      maxWidth: '800px',
      margin: '3rem auto',
      padding: '2rem',
      background: '#111111',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      color: 'white'
    }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Edit Blog Post</h1>
      
      <div style={{ 
        padding: '1rem', 
        background: 'rgba(255, 165, 0, 0.2)', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <p><strong>Notice:</strong> Blog editing is not available in the static version of this site.</p>
        <p>This functionality requires a server to process form submissions.</p>
      </div>
      
      <p>You're viewing the static page for blog ID: <strong>{id}</strong></p>
      
      <div style={{ marginTop: '2rem' }}>
        <Link href="/admin/blogs" style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: '#06b6d4',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          Back to Blog Management
        </Link>
      </div>
    </div>
  );
}
