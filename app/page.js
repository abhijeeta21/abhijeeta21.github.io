'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import ContactForm from './components/ContactForm';
import TypedText from './components/TypedText';

export default function Home() {
  // Reference for mouse following effect
  const circleRef = useRef(null);
  // State for blog posts
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  
  useEffect(() => {
    // Mouse follow effect for hero section
    let mouseX = 0, mouseY = 0;
    let xp = 0, yp = 0;
    
    const circle = circleRef.current;
    if (!circle) return;
    
    let timer;
    
    const mouseStopped = () => {
      if (circle) circle.classList.remove('moving');
    };
    
    const handleMouseMove = (e) => {
      if (circle) circle.classList.add('moving');
      mouseX = e.clientX - 200;
      mouseY = e.clientY - 200;
      clearTimeout(timer);
      timer = setTimeout(mouseStopped, 3000);
    };
    
    const updatePosition = () => {
      xp += ((mouseX - xp) / 6);
      yp += ((mouseY - yp) / 6);
      
      if (circle) {
        circle.style.left = `${xp}px`;
        circle.style.top = `${yp}px`;
      }
      
      requestAnimationFrame(updatePosition);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    updatePosition();
    
    // Debounced scroll animations
    let scrollTimeout;
    const animateOnScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const elements = document.querySelectorAll('.listItem');
        elements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          if (elementTop < windowHeight * 0.8) {
            element.classList.add('animate');
          }
        });
      }, 100);
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Fetch blog posts
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data.slice(0, 3)); // Get the first 3 blog posts
        } else {
          console.error('Failed to fetch blog posts');
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setBlogsLoading(false);
      }
    };
    
    fetchBlogPosts();
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', animateOnScroll);
      clearTimeout(timer);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Blogs Section - updated to use real blog data
  const renderBlogsSection = () => {
    if (blogsLoading) {
      return (
        <div className={styles.blogsLoading}>
          <div className={styles.loader}></div>
          <p>Loading blog posts...</p>
        </div>
      );
    }
    
    if (blogPosts.length === 0) {
      return (
        <div className={styles.blogsEmpty}>
          <p>No blog posts found. Check back soon for new content!</p>
        </div>
      );
    }
    
    return (
      <div className={styles.blogsGrid}>
        {blogPosts.map((post) => (
          <div className={styles.blogCard} key={post.id}>
            <div 
              className={styles.blogImage}
              style={{ backgroundImage: `url(${post.coverImage || '/images/blog/default.jpg'})` }}
            ></div>
            <div className={styles.blogContent}>
              <h3>{post.title}</h3>
              <p className={styles.blogDate}>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.id}`} className={styles.readMoreLink}>Read more →</Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className={styles.main}>
      {/* Hero Landing Section */}
      <section className={styles.homeLanding} id="home">
        <div className={styles.wrapper + ' ' + styles.fullSize}>
          {/* Background mask */}
          <div className={styles.maskBgColor + ' ' + styles.fullSize}></div>
          
          <div className={styles.blendMultiply + ' ' + styles.fullSize}>
            <div className={styles.animatedBg + ' ' + styles.fullSize} 
                 style={{backgroundImage: "url('/images/hero-bg-dark.jpg')"}}></div>
            
            <div className={styles.blendScreen + ' ' + styles.elementMask + ' ' + styles.fullSize}>
              <span ref={circleRef} className={styles.circleFollow}>
                <svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                  <circle cx="250" cy="250" r="200" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        
        <div className={styles.homeText}>
          <div className={styles.hcon}>
            <div className={styles.line1}>
              {/* <h1>Hello, I'm Abhijeet</h1> */}
            </div>
            <div className={styles.line2}>
              <div>
                <h1>Student, Movie Fan & Puzzle Solver
                </h1>
              </div>
              <div>
                <p>
                This is my little corner of the internet where I'll be ranting about my college life.

                </p>
              </div>
            </div>
            <div className={styles.line3}>
              {/* <h1>Explore My Work</h1> */}
            </div>
            <div className={styles.mobilePara}>
              <p>
              This is my little corner of the internet where I'll be ranting about my college life.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Intro Text Section */}
      <section className={styles.homeTextScroll}>
        <div className={styles.htscon}>
          <h1>
          Just a final-year student trying to survive my EE-CS double major without losing my mind. While I do enjoy coding and solving puzzles, I'm definitely not the "eats, sleeps, breathes tech" type.
          </h1>
          <div className="nectar-cta alignment_tablet_default alignment_phone_default display_tablet_inherit display_phone_inherit">
            <h6>
              <span className="link_wrap">
                <Link className="link_text" href="#about" aria-label="Learn more about me">
                  <span className="text">MORE ABOUT ME</span>
                  <span className="line"></span>
                </Link>
              </span>
            </h6>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p>
              Hey! I'm Abhijeet, somehow surviving my final year at IIT Kanpur with a double major in Electrical and Computer Science Engineering. If you're wondering why I chose both—so am I.
              </p>
              <p>
              I find competitive programming strangely satisfying and enjoy solving puzzles that challenge my brain in new ways. While I might seem quiet at first, get me talking about something I care about and I might actually forget to stop.
              </p>
              <p>
              When I'm not buried in coursework or pretending to understand what's happening in lectures, you'll probably find me:

              • Overthinking the simplest things (like whether that text message had a hidden meaning)
              • Watching carefully selected movies (I'm picky but not pretentious)
              • Having those deep conversations at night that somehow seem to solve life's mysteries
              </p>
            </div>
            <div className={styles.aboutImage}>
              <div className={styles.imageContainer}>
                <Image 
                  src="/images/profile.jpg" 
                  alt="Abhijeet" 
                  width={280}
                  height={350}
                  className={styles.profileImage}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resume Section */}
      <section id="resume" className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>My Academic Journey</h2>
          <div className={styles.resumeContentFull}>
            {/* Education Section */}
            <div className={styles.resumeSectionFull}>
              <h3>Education</h3>
              <div className={styles.timelineItemRow}>
                <div className={styles.timelineItemCard}>
                  <h4>BTech in Electrical and Computer Science</h4>
                  <p className={styles.timelinePeriod}>2021 - Present</p>
                  <p>Indian Institute of Technology, Kanpur</p>
                </div>
                <div className={styles.timelineItemCard}>
                  <h4>High School</h4>
                  <p className={styles.timelinePeriod}>2017 - 2021</p>
                  <p>Samrat Public Sr. Sec. School, Ajmer</p>
                </div>
                <div className={styles.timelineItemCard}>
                  <h4>Primary & Middle School</h4>
                  <p className={styles.timelinePeriod}>2007 - 2017</p>
                  <p>Maheshwari International School, Ajmer</p>
                </div>
              </div>
            </div>
            
            
            {/* Work Experience Section */}
            <div className={styles.resumeSectionFull}>
              <h3>Work Experience</h3>
              <div className={styles.timelineItemRow}>
                <div className={styles.timelineItemCard}>
                  <h4>Research Intern</h4>
                  <p className={styles.timelinePeriod}>Summer 2024</p>
                  <p>Adobe Systems - Worked on finetuning LLMs.</p>
                </div>
                {/* <div className={styles.timelineItemCard}>
                  <h4>Research Assistant</h4>
                  <p className={styles.timelinePeriod}>2022 - 2023</p>
                  <p>Computer Vision Lab, IIT Kanpur - Assisted with deep learning projects and data analysis.</p>
                </div> */}
              </div>
            </div>
            
            {/* Extracurriculars Section */}
            <div className={styles.resumeSectionFull}>
              <h3>Extracurriculars</h3>
              <div className={styles.timelineItemRow}>
                <div className={styles.timelineItemCard}>
                  <Link href="/extracurriculars/core-team-member" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h4>Core Team Member - Institute Counselling Service</h4>
                    <p className={styles.timelinePeriod}>2023 - 2024</p>
                    {/* <p>Worked with Counsellors, Professors in a 3-tier team
                      to envision, plan and execute activities for helping students
                      academically and emotionally.</p> */}
                  </Link>
                </div>
                <div className={styles.timelineItemCard}>
                  <Link href="/extracurriculars/electronics-club" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h4>Secretary - Electronics Club</h4>
                    <p className={styles.timelinePeriod}>2022 - 2023</p>
                    {/* <p>Contributed to projects like React, Next.js, and other community-driven initiatives.</p> */}
                  </Link>
                </div>
                <div className={styles.timelineItemCard}>
                  <Link href="/extracurriculars/placement-office" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h4>Company Coordinator - Students' Placement Office</h4>
                    <p className={styles.timelinePeriod}>2022 - 2023</p>
                    {/* <p>Contributed to projects like React, Next.js, and other community-driven initiatives.</p> */}
                  </Link>
                </div>
                <div className={styles.timelineItemCard}>
                  <Link href="/extracurriculars/outreach-cell" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h4>Secretary - Outreach Cell</h4>
                    <p className={styles.timelinePeriod}>2022 - 2023</p>
                    {/* <p>Contributed to projects like React, Next.js, and other community-driven initiatives.</p> */}
                  </Link>
                </div>
                <div className={styles.timelineItemCard}>
                  <Link href="/extracurriculars/academic-mentor" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h4>Academic Mentor(MTH) - Institute Counselling Service</h4>
                    <p className={styles.timelinePeriod}>2022 - 2023</p>
                    {/* <p>Contributed to projects like React, Next.js, and other community-driven initiatives.</p> */}
                  </Link>
                </div>
                <div className={styles.timelineItemCard}>
                  <Link href="/extracurriculars/student-guide" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h4>Student Guide - Institute Counselling Service</h4>
                    <p className={styles.timelinePeriod}>2022 - 2023</p>
                    {/* <p>Contributed to projects like React, Next.js, and other community-driven initiatives.</p> */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>My Blogs</h2>
          {renderBlogsSection()}
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Courses I've Completed</h2>
          <div className={styles.coursesContent}>
            <ul className={styles.coursesList}>
              <li>Operating Systems(CS330)</li>
              <li>Introduction to Machine Learning(CS771)</li>
              <li>Software Development and Operations(CS253)</li>
              <li>Probability & Statistics(MSO201)</li>
              <li>Data Structures and Algorithms(ESO207)</li>
              <li>Design and Analysis of Algorithms(CS345)</li>
              <li>Theory of Computation(CS340)</li>
              <li>Computer Organisation(CS220)</li>
              <li>Computer Networks(CS425)</li>
              <li>Modern Cryptology(CS641)</li>
              <li>Big Data Visual Analytics(CS661)</li>
              <li>Introduction to Reinforcement Learning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Let's Connect!</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <p>Feel free to reach out for anything!</p>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📧</div>
                  <p>abhijeeta21@iitk.ac.in</p>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📱</div>
                  <p>Hall-1, D215</p>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📍</div>
                  <p>IIT Kanpur, India</p>
                </div>
              </div>
            </div>
            <div className={styles.contactForm}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}