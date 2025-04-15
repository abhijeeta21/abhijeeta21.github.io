import { getAllBlogPosts, createBlogPost } from '../../lib/blog-utils';

// GET handler to retrieve all blog posts
export async function GET() {
  try {
    const blogs = getAllBlogPosts();
    
    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch blog posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// POST handler to create a new blog post
export async function POST(request) {
  try {
    // In a real application, you should add authentication here
    // For example: verifyAdminUser(request.headers.get('Authorization'))
    
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
    
    // Create blog post
    const result = createBlogPost(
      title, 
      content, 
      excerpt || 'No excerpt provided', 
      coverImage || '/images/blog/default.jpg'
    );
    
    if (result.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Blog post created successfully', 
          id: result.id 
        }),
        { 
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Failed to create blog post' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
