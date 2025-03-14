
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll para os links de ancoragem
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.pageYOffset - 100,
            behavior: 'smooth'
          });
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
