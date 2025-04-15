export const dynamic = "force-static";
export const revalidate = false;

export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json();
    const { name, email, message } = data;
    
    // Validate the form data
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Please fill in all fields.' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Please enter a valid email address.' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // In a real application, you would send an email here
    // Example: using a service like SendGrid, Mailgun, AWS SES, etc.
    // For this demo, we'll just log the data and return a success response
    console.log('Contact form submission:', { name, email, message });
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thanks for your message! I’ll get back to you soon. 😊' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'An error occurred while processing your request. Please try again later.' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}