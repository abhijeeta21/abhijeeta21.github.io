'use client';

import { useEffect } from 'react';

export default function InteractiveElements() {
  useEffect(() => {
    // Mobile menu toggle - removed to prevent duplication with layout.js
    
    // Cache elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.section, .heroContent, .heroImage');
    const stats = document.querySelectorAll('.statNumber');
    const header = document.querySelector('.header');

    // Debounced scroll animations
    let scrollTimeout;
    const animateOnScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        elementsToAnimate.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          if (elementTop < windowHeight * 0.8) {
            element.classList.add('animate');
          }
        });
      }, 100);
    };

    // Add animate class to visible elements on load
    setTimeout(animateOnScroll, 100);
    
    // Add animate class to elements as they come into view on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        
        const target = document.querySelector(link.getAttribute('href'));
        
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80, // Account for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Animated counter for stats
    const animateValue = (element, start, end, duration) => {
      let startTime = null;
      const animation = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const endValue = parseInt(element.dataset.value || element.textContent, 10);
          animateValue(element, 0, endValue, 2000);
          observer.unobserve(element);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
    stats.forEach(stat => {
      if (!stat.dataset.value) {
        stat.dataset.value = stat.textContent;
      }
      stat.textContent = '0+';
      observer.observe(stat);
    });

    // Header scroll effect
    const handleHeaderScroll = () => {
      if (window.scrollY > 100) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    // Attach event listeners
    window.addEventListener('scroll', handleHeaderScroll);

    // Remove cursor circle effect to prevent duplicate UI elements
    
    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('scroll', handleHeaderScroll);
      
      anchorLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);
  
  return null;
}