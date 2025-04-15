# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring interactive elements, animations, and a clean design. This portfolio includes sections for your resume, blog posts, achievements, and contact information.

## Features

- **Interactive UI**: Smooth animations, typing effects, and responsive design
- **Modern Design**: Clean, professional layout with gradient accents
- **Optimized Performance**: Lightweight and fast loading
- **Mobile Responsive**: Looks great on all devices
- **Contact Form**: Built-in form with validation and API endpoint
- **Blog Section**: Display your latest articles and insights
- **Resume Section**: Showcase your professional experience and education
- **Achievements Section**: Highlight your accomplishments

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. Clone the repository or download the files to your local machine:

```bash
git clone <repository-url>
# or download and extract the ZIP file
```

2. Navigate to the project directory:

```bash
cd homepage
```

3. Install the dependencies:

```bash
npm install
# or
yarn install
```

### Development

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
```

Then, you can start the production server:

```bash
npm run start
# or
yarn start
```

## Hosting Options

There are several options for hosting your portfolio website:

### 1. Vercel (Recommended for Next.js)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).

1. Create an account on Vercel
2. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Deploy from the project directory:
   ```bash
   vercel
   ```

Follow the prompts to complete the deployment. Your site will be live with a URL provided by Vercel.

### 2. Netlify

1. Create an account on [Netlify](https://netlify.com)
2. From the Netlify dashboard, click "New site from Git"
3. Connect your repository and set the build command to `npm run build`
4. Set the publish directory to `out` (if you've configured Next.js for static export) or deploy using Netlify's Next.js plugin

### 3. GitHub Pages

For static site deployment on GitHub Pages:

1. First, modify your `next.config.mjs` file to add:
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: process.env.NODE_ENV === 'production' ? '/repo-name' : '',
     images: {
       unoptimized: true,
     },
   };
   ```
2. Add a `.github/workflows/deploy.yml` file for GitHub Actions to build and deploy your site

### 4. Traditional Hosting

If you prefer traditional hosting:

1. Build your project: `npm run build`
2. Export it to static HTML: Add `output: 'export'` to your `next.config.mjs` and run the build command
3. Upload the contents of the `out` directory to your web hosting service via FTP or their control panel

## Customization

### Updating Personal Information

1. Edit the content in `app/page.js` to update your personal information, achievements, and resume details
2. Update contact details in both the contact section and footer component

### Styling

- Global styles are in `app/globals.css`
- Component-specific styles are in `app/page.module.css`

### Adding Blog Posts

To add blog posts, you'll need to:

1. Create a new page in `app/blog/[slug]/page.js` for dynamic blog post pages
2. Set up a data source for your blog posts (Markdown files, CMS, or database)

## Performance Optimization

This portfolio is built with performance in mind:

- CSS modules for scoped styling
- Next.js image optimization
- Client-side rendering for interactive components only
- Server-side rendering for static content

## Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements that could benefit others, pull requests are welcome!

## License

This project is open source and available under the [MIT License](LICENSE).