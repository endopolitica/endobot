
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-white relative">
      <div className="texture-waves"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-gradient-to-br from-purple to-pink rounded-full"></div>
            <span className="font-bold text-xl text-gradient">Endobot</span>
          </div>
          
          <div className="mb-8 text-center max-w-lg">
            <p className="text-black/60">
              Revolucionando o cuidado com a saúde feminina através da inteligência artificial.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <a href="#" className="text-black/70 hover:text-purple transition-colors">Início</a>
            <a href="#recursos" className="text-black/70 hover:text-purple transition-colors">Recursos</a>
            <a href="#sobre" className="text-black/70 hover:text-purple transition-colors">Sobre</a>
            <a href="#contato" className="text-black/70 hover:text-purple transition-colors">Contato</a>
            <a href="#" className="text-black/70 hover:text-purple transition-colors">Política de Privacidade</a>
            <a href="#" className="text-black/70 hover:text-purple transition-colors">Termos de Uso</a>
          </div>
          
          <div className="text-center text-black/50 text-sm">
            <p>&copy; {currentYear} Endobot. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
