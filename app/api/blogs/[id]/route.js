import { getBlogPostById, updateBlogPost, deleteBlogPost } from '../../../lib/blog-utils';

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

// PUT handler to update a blog post
export async function PUT(request, { params }) {
  try {
    // In a real application, you should add authentication here
    
    const { id } = params;
    const data = await request.json();
    const { title, content, excerpt, coverImage } = data;
    
    // Validate required fields
    if (!title || !content) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Title and content are required.' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Update blog post
    const result = updateBlogPost(
      id,
      title,
      content,
      excerpt || 'No excerpt provided',
      coverImage || '/images/blog/default.jpg'
    );
    
    if (result.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Blog post updated successfully' 
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Failed to update blog post' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// DELETE handler to delete a blog post
export async function DELETE(request, { params }) {
  try {
    // In a real application, you should add authentication here
    
    const { id } = params;
    
    // Delete blog post
    const result = deleteBlogPost(id);
    
    if (result.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Blog post deleted successfully' 
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Failed to delete blog post' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
