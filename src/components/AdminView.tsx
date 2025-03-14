
import React, { useState, useEffect } from 'react';
import { getContactData, ContactData } from '../services/contactService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AdminView = () => {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Atualizar a lista quando o componente é montado
    updateContactList();
    
    // Configurar uma tecla de atalho para mostrar/esconder a visualização admin
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Alt + A para mostrar/esconder o admin
      if (e.ctrlKey && e.altKey && e.key === 'a') {
        setIsVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const updateContactList = () => {
    const data = getContactData();
    setContacts(data.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };
  
  // Formatar a data para o formato brasileiro
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Visualização Administrativa</h2>
          <div className="flex gap-4">
            <button 
              onClick={updateContactList}
              className="px-4 py-2 bg-purple text-white rounded hover:bg-purple/90 transition-colors"
            >
              Atualizar
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          {contacts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum contato cadastrado ainda.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferência</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Cadastro</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.whatsapp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.contactPreference === 'email' ? 'Email' : 'WhatsApp'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(contact.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Total de cadastros: {contacts.length}
        </div>
      </div>
    </div>
  );
};

export default AdminView;
