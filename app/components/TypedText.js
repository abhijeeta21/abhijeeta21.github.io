'use client';

import { useState, useEffect } from 'react';

export default function TypedText({ text, typingSpeed = 100, delay = 1000 }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout;

    if (delay > 0 && !isTyping && currentIndex === 0) {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (!isTyping && currentIndex === text.length) {
      timeout = setTimeout(() => {
        setDisplayText('');
        setCurrentIndex(0);
        setIsTyping(true);
      }, delay * 2); // Restart after a delay
      return () => clearTimeout(timeout);
    }

    if (!isTyping) return;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }

    setIsTyping(false);

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, isTyping, text, typingSpeed]);

  return <span>{displayText}<span className="cursor">|</span>
    <style jsx>{`
      .cursor {
        display: inline-block;
        width: 2px;
        margin-left: 2px;
        animation: blink 1s infinite;
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `}</style>
  </span>;
}