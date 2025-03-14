
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple to-pink rounded-full animate-pulse-soft"></div>
            <span className="font-bold text-xl md:text-2xl text-gradient">Endobot</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#recursos" className="text-black/80 hover:text-purple transition-colors font-medium">Recursos</a>
            <a href="#sobre" className="text-black/80 hover:text-purple transition-colors font-medium">Sobre</a>
            <a href="#contato" className="text-black/80 hover:text-purple transition-colors font-medium">Contato</a>
          </nav>
          
          <div className="hidden md:flex">
            <a href="#contato" className="bg-purple text-white px-5 py-2 rounded-full hover:bg-purple/90 transition-colors font-medium">
              Junte-se à lista
            </a>
          </div>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-black"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md animate-slide-down">
          <div className="pt-2 pb-4 px-4 space-y-3">
            <a href="#recursos" className="block py-2 text-black/80 hover:text-purple font-medium" onClick={() => setMobileMenuOpen(false)}>Recursos</a>
            <a href="#sobre" className="block py-2 text-black/80 hover:text-purple font-medium" onClick={() => setMobileMenuOpen(false)}>Sobre</a>
            <a href="#contato" className="block py-2 text-black/80 hover:text-purple font-medium" onClick={() => setMobileMenuOpen(false)}>Contato</a>
            <div className="pt-2">
              <a 
                href="#contato" 
                className="block text-center bg-purple text-white px-5 py-2 rounded-full hover:bg-purple/90 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Junte-se à lista
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
