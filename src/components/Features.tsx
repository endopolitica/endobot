
import React from 'react';
import { Heart, Brain, MessageCircle, Clock, ShieldCheck, BookOpen } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Heart className="w-10 h-10 text-pink" />,
      title: "Especializado em Endometriose",
      description: "Informações atualizadas e confiáveis sobre diagnóstico, tratamentos e manejo da endometriose."
    },
    {
      icon: <Brain className="w-10 h-10 text-purple" />,
      title: "IA Avançada",
      description: "Tecnologia de ponta com aprendizado contínuo para fornecer respostas precisas e personalizadas."
    },
    {
      icon: <MessageCircle className="w-10 h-10 text-orange" />,
      title: "Suporte Contínuo",
      description: "Disponível 24 horas para responder suas dúvidas sobre saúde feminina e dor crônica."
    },
    {
      icon: <Clock className="w-10 h-10 text-yellow" />,
      title: "Agilidade",
      description: "Respostas instantâneas sem necessidade de agendamento ou longas esperas."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-red" />,
      title: "Privacidade Garantida",
      description: "Todas as suas conversas são protegidas e confidenciais, respeitando sua privacidade."
    },
    {
      icon: <BookOpen className="w-10 h-10 text-purple" />,
      title: "Conteúdo Educativo",
      description: "Recursos e informações sobre saúde feminina baseados em evidências científicas."
    }
  ];

  return (
    <section id="recursos" className="py-20 bg-gradient-to-b from-white to-purple/5 relative">
      <div className="texture-waves"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-blur-in">
          <h2 className="mb-4">Recursos <span className="text-gradient">Poderosos</span></h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            O Endobot foi desenvolvido pensando nas necessidades específicas das mulheres brasileiras que lidam com endometriose e questões de saúde feminina.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-md border border-purple/10 card-hover animate-zoom-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 bg-purple/10 p-3 inline-block rounded-xl">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-bold">{feature.title}</h3>
              <p className="text-black/70">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#contato" 
            className="bg-white hover:bg-purple/5 text-black font-medium px-8 py-3 rounded-full transition-all border border-purple/20 hover:border-purple/40 inline-flex items-center"
          >
            Quero experimentar <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
