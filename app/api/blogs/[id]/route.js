export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

// This function is required for static export with dynamic routes
export function generateStaticParams() {
  return [
    { id: 'HSS' }
  ];
}

import { getBlogPostById } from '../../../lib/blog-utils';

// GET handler to retrieve a specific blog post
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const blog = getBlogPostById(id);
    
    if (!blog) {
      return new Response(
        JSON.stringify({ error: 'Blog post not found' }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new Response(
      JSON.stringify(blog),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch blog post' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Stub functions for static export
export async function PUT() {
  return new Response(
    JSON.stringify({ error: 'Not implemented in static export' }),
    { 
      status: 501,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

export async function DELETE() {
  return new Response(
    JSON.stringify({ error: 'Not implemented in static export' }),
    { 
      status: 501,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
