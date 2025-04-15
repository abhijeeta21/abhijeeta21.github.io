"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import InteractiveElements from './components/InteractiveElements';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <InteractiveElements />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="header" role="banner" aria-label="Main navigation">
      <div className="container">
        <nav className="nav">
          <Link href="/" className="logo">
            <span className="logo-text">CS Student</span>
          </Link>
          <div className="navLinks">
            <Link href="/#about" className="navLink">About Me</Link>
            <Link href="/#resume" className="navLink">Education</Link>
            <Link href="/#blogs" className="navLink">Blogs</Link>
            <a href="/resume.pdf" target="_blank" className="navLink">Resume</a>
            <Link href="/#contact" className="navLink">Contact Me</Link>
          </div>
          <div className="mobileMenuButton">
            <div className="menuIcon"></div>
          </div>
          <div className="mobileMenu">
            <Link href="/#about" className="mobileNavLink">About Me</Link>
            <Link href="/#resume" className="mobileNavLink">Education</Link>
            <Link href="/#blogs" className="mobileNavLink">Blogs</Link>
            <a href="/resume.pdf" target="_blank" className="mobileNavLink">Resume</a>
            <Link href="/#contact" className="mobileNavLink">Contact Me</Link>
          </div>
        </nav>
      </div>
      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.9); /* Black background */
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 0.5rem 0; /* Reduced from 0.8rem to 0.5rem */
          transition: all 0.3s ease;
          border-bottom: none; /* Ensure no orange line appears */
        }
        
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          font-family: var(--font-family-casual);
        }
        
        .logo-text {
          color: var(--primary-color);
        }
        
        .navLinks {
          display: flex;
          gap: 2rem;
        }
        
        .navLink {
          position: relative;
          font-weight: 500;
          transition: all 0.3s ease;
          font-size: 1.05rem;
          color: var(--text-color); /* Ensure consistent color */
        }
        
        .navLink::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-gradient); /* Use gradient for hover effect */
          transition: width 0.3s ease;
        }
        
        .navLink:hover {
          color: var(--primary-color); /* Change to primary color on hover */
          transform: translateY(-2px);
        }
        
        .navLink:hover::after {
          width: 100%;
        }
        
        .mobileMenuButton {
          display: none;
          width: 30px;
          height: 30px;
          position: relative;
          cursor: pointer;
          background: var(--primary-color);
          border-radius: 5px;
          padding: 5px;
        }
        
        .menuIcon, .menuIcon::before, .menuIcon::after {
          position: absolute;
          width: 20px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
        }
        
        .menuIcon {
          top: 14px;
          left: 5px;
        }
        
        .menuIcon::before, .menuIcon::after {
          content: '';
          left: 0;
        }
        
        .menuIcon::before {
          top: -6px;
        }
        
        .menuIcon::after {
          bottom: -6px;
        }
        
        .mobileMenu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--primary-color);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          padding: 1rem 0;
          flex-direction: column;
          text-align: center;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        
        .mobileNavLink {
          padding: 1rem;
          color: white;
          font-weight: 500;
          transition: all 0.3s ease;
          display: block;
        }
        
        .mobileNavLink:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .navLinks {
            display: none;
          }
          
          .mobileMenuButton {
            display: block;
          }
          
          .logo {
            font-size: 1.3rem;
          }
        }

        .navLink, .mobileNavLink {
          position: relative;
          font-weight: 500;
          transition: all 0.3s ease;
          font-size: 1.05rem;
          color: white !important; /* Force white color */
          text-decoration: none; /* Ensure no underline for all nav links */
        }
        
        /* Target both Link components and regular anchor tags */
        .navLinks a {
          position: relative;
          font-weight: 500;
          transition: all 0.3s ease;
          font-size: 1.05rem;
          color: white !important; /* Force white color */
        }
        
        .navLinks a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-gradient);
          transition: width 0.3s ease;
        }
        
        .navLinks a:hover {
          color: var(--primary-color) !important;
          transform: translateY(-2px);
        }
        
        .navLinks a:hover::after {
          width: 100%;
        }

        .mobileMenu a {
          color: white !important; /* Ensure white text in mobile menu too */
        }
      `}</style>
    </header>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer" role="contentinfo" aria-label="Footer">
      <div className="container">
        <div className="footerContent">
          <div className="footerLeft">
            <Link href="/" className="footerLogo">
              <span className="text-gradient">CS Student</span>
            </Link>
            <p className="footerDescription">
              Just a college student trying to balance academics, coding projects, 
              a social life, and getting enough sleep (usually sacrificing the last one 😴).
            </p>
            <div className="socialLinks">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="socialLink">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="socialLink">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="socialLink">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="socialLink">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          <div className="footerRight">
            <div className="footerLinksGroup">
              <h3 className="footerLinksTitle">Quick Links</h3>
              <div className="footerLinks">
                <Link href="/#about" className="footerLink">About Me</Link>
                <Link href="/#resume" className="footerLink">Academic Journey</Link>
                <Link href="/#achievements" className="footerLink">Cool Stuff</Link>
                <Link href="/#blog" className="footerLink">My Stories</Link>
                <Link href="/#contact" className="footerLink">Connect</Link>
              </div>
            </div>
            <div className="footerLinksGroup">
              <h3 className="footerLinksTitle">Campus Life</h3>
              <div className="footerLinks">
                <a href="https://university.edu/events" className="footerLink" target="_blank" rel="noopener noreferrer">Campus Events</a>
                <a href="https://university.edu/clubs/tech" className="footerLink" target="_blank" rel="noopener noreferrer">Tech Club</a>
                <a href="https://university.edu/library" className="footerLink" target="_blank" rel="noopener noreferrer">Library Resources</a>
                <a href="https://university.edu/career" className="footerLink" target="_blank" rel="noopener noreferrer">Career Center</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <p>&copy; {currentYear} Student Portfolio. Built with Next.js instead of studying for exams 😂</p>
        </div>
      </div>
      <style jsx>{`
        .footer {
          background: #000000; /* Black footer background */
          padding: 4rem 0 2rem;
          margin-top: 5rem;
          border-top: 2px dashed #e2e8f0;
          position: relative;
        }
        
        .footer::before {
          content: "";
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background: var(--primary-color);
          border-radius: 50%;
          box-shadow: 0 0 0 5px white;
        }
        
        .footerContent {
          display: flex;
          flex-wrap: wrap;
          gap: 4rem;
          margin-bottom: 3rem;
        }
        
        .footerLeft {
          flex: 2;
          min-width: 300px;
        }
        
        .footerLogo {
          font-size: 1.5rem;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 1rem;
          font-family: var(--font-family-casual);
        }
        
        .footerDescription {
          color: var(--text-color-light);
          margin-bottom: 1.5rem;
          max-width: 400px;
          line-height: 1.6;
        }
        
        .socialLinks {
          display: flex;
          gap: 1rem;
        }
        
        .socialLink {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: white;
          color: var(--primary-color);
          border-radius: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .socialLink:hover {
          background: var(--primary-gradient);
          color: white;
          transform: translateY(-5px) rotate(10deg);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .footerRight {
          flex: 3;
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
        }
        
        .footerLinksGroup {
          flex: 1;
          min-width: 150px;
        }
        
        .footerLinksTitle {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: var(--text-color);
          font-family: var(--font-family-casual);
          position: relative;
          display: inline-block;
        }
        
        .footerLinksTitle::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 30px;
          height: 2px;
          background: var(--primary-gradient);
        }
        
        .footerLinks {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .footerLink {
          color: var(--text-color-light);
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .footerLink:hover {
          color: var(--primary-color);
          transform: translateX(5px);
        }
        
        .footerContactItem {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: var(--text-color-light);
        }
        
        .footerBottom {
          padding-top: 2rem;
          text-align: center;
          color: var(--text-color-light);
          font-size: 0.9rem;
          border-top: 1px solid #e2e8f0;
        }
        
        @media (max-width: 768px) {
          .footerContent {
            flex-direction: column;
            gap: 3rem;
          }
          
          .footerRight {
            flex-direction: column;
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
}