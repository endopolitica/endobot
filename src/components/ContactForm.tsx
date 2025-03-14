import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { saveContactData, isEmailRegistered, isWhatsAppRegistered } from '../services/contactService';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [contactPreference, setContactPreference] = useState<'email' | 'whatsapp'>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulário
    if (!name || !email || !whatsapp) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    if (!validateEmail(email)) {
      toast.error('Por favor, insira um email válido');
      return;
    }
    
    if (!validatePhone(whatsapp)) {
      toast.error('Por favor, insira um número de WhatsApp válido');
      return;
    }
    
    // Verificar se o email ou WhatsApp já está cadastrado
    if (isEmailRegistered(email)) {
      toast.error('Este email já está cadastrado em nossa lista de espera');
      return;
    }
    
    if (isWhatsAppRegistered(whatsapp)) {
      toast.error('Este número de WhatsApp já está cadastrado em nossa lista de espera');
      return;
    }
    
    // Iniciar o processo de envio
    setIsSubmitting(true);
    
    try {
      // Salvar os dados no localStorage
      const savedContact = saveContactData({
        name,
        email,
        whatsapp,
        contactPreference
      });
      
      console.log('Contato salvo:', savedContact);
      
      // Simular um pequeno atraso para feedback ao usuário
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success('Cadastro realizado com sucesso!');
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar contato:', error);
      toast.error('Ocorreu um erro ao processar seu cadastro. Por favor, tente novamente.');
      setIsSubmitting(false);
    }
  };
  
  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };
  
  const validatePhone = (phone: string) => {
    // Validação básica para número brasileiro
    return phone.replace(/\D/g, '').length >= 10;
  };
  
  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    let formatted = '';
    
    if (numbers.length <= 2) {
      formatted = numbers;
    } else if (numbers.length <= 7) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    } else {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
    
    return formatted;
  };
  
  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsapp(formatted);
  };

  return (
    <section id="contato" className="py-20 relative overflow-hidden">
      <div className="texture-waves"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple/10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Lado esquerdo - informações */}
              <div className="bg-gradient-to-br from-purple to-pink p-8 md:p-12 text-white relative">
                <div className="animate-slide-up">
                  <h2 className="font-bold text-3xl mb-4">Junte-se à nossa lista de espera</h2>
                  <p className="mb-8 opacity-90">
                    Seja uma das primeiras a experimentar o Endobot e revolucione a forma como você cuida da sua saúde.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0" />
                      <p>Acesso prioritário ao lançamento</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0" />
                      <p>Suporte personalizado exclusivo</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0" />
                      <p>Recursos premium gratuitos por tempo limitado</p>
                    </div>
                  </div>
                </div>
                
                {/* Elementos decorativos */}
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full blur-2xl"></div>
              </div>
              
              {/* Lado direito - formulário */}
              <div className="p-8 md:p-12">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6 animate-blur-in">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple"
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple"
                        placeholder="seu.email@exemplo.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                      <input
                        id="whatsapp"
                        type="text"
                        value={whatsapp}
                        onChange={handleWhatsAppChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple"
                        placeholder="(00) 00000-0000"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferência de contato</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="contactPreference"
                            value="email"
                            checked={contactPreference === 'email'}
                            onChange={() => setContactPreference('email')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border ${contactPreference === 'email' ? 'bg-purple border-purple' : 'border-gray-300'} flex items-center justify-center mr-2`}>
                            {contactPreference === 'email' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          <span>Email</span>
                        </label>
                        
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="contactPreference"
                            value="whatsapp"
                            checked={contactPreference === 'whatsapp'}
                            onChange={() => setContactPreference('whatsapp')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border ${contactPreference === 'whatsapp' ? 'bg-purple border-purple' : 'border-gray-300'} flex items-center justify-center mr-2`}>
                            {contactPreference === 'whatsapp' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          <span>WhatsApp</span>
                        </label>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 bg-purple hover:bg-purple/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Cadastrar</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                      Ao se cadastrar, você concorda com nossa Política de Privacidade e Termos de Uso.
                    </p>
                  </form>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-zoom-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Cadastro realizado com sucesso!</h3>
                    <p className="text-gray-600 mb-6">
                      Obrigado por se juntar à nossa lista de espera. Em breve entraremos em contato com mais informações.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setName('');
                        setEmail('');
                        setWhatsapp('');
                        setContactPreference('email');
                      }}
                      className="text-purple hover:text-purple/80 font-medium"
                    >
                      Voltar ao formulário
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
