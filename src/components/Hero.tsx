
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:py-32 lg:min-h-screen flex items-center relative overflow-hidden">
      <div className="texture-waves"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-block mb-4 py-1 px-3 rounded-full bg-purple/10 text-purple font-medium text-sm">
              Novidade: Inteligência Artificial para sua saúde
            </div>
            <h1 className="mb-6">
              Revolucionando o cuidado com a{' '}
              <span className="text-gradient">saúde feminina</span>
            </h1>
            <p className="text-lg md:text-xl text-black/70 mb-8 max-w-xl">
              Endobot é um chatbot de IA especializado em endometriose, saúde feminina e dor crônica. 
              Projetado para mulheres brasileiras que buscam informações confiáveis e apoio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contato" 
                className="bg-purple hover:bg-purple/90 text-white font-medium px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-purple/30 hover:-translate-y-1 text-center"
              >
                Junte-se à lista de espera
              </a>
              <a 
                href="#recursos" 
                className="group bg-white border border-purple/30 text-black font-medium px-8 py-3 rounded-full transition-all hover:border-purple hover:bg-purple/5 text-center flex items-center justify-center"
              >
                Saiba mais
                <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="relative animate-slide-in-right">
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple via-pink to-orange opacity-20 rounded-3xl blur-3xl"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-full shadow-xl flex items-center justify-center p-6 animate-float">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple to-pink rounded-full mb-4 flex items-center justify-center">
                      <span className="text-3xl">🤖</span>
                    </div>
                    <h3 className="font-bold text-xl text-gradient mb-2">Endobot</h3>
                    <p className="text-black/70 text-sm">Seu assistente pessoal para saúde feminina</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow rounded-full blur-xl opacity-50"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-pink rounded-full blur-xl opacity-40"></div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path fill="#dc89ff10" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,229.3C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
