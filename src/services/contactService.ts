
// Definindo a interface para os dados de contato
export interface ContactData {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  contactPreference: 'email' | 'whatsapp';
  createdAt: string;
}

// Função para salvar os dados de contato
export const saveContactData = (data: Omit<ContactData, 'id' | 'createdAt'>): ContactData => {
  // Recuperar dados existentes
  const existingData = getContactData();
  
  // Criar novo registro com ID único e timestamp
  const newContact: ContactData = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  
  // Adicionar aos dados existentes
  const updatedData = [...existingData, newContact];
  
  // Salvar no localStorage
  localStorage.setItem('contactData', JSON.stringify(updatedData));
  
  return newContact;
};

// Função para obter todos os dados de contato
export const getContactData = (): ContactData[] => {
  const data = localStorage.getItem('contactData');
  return data ? JSON.parse(data) : [];
};

// Função para verificar se um email já está cadastrado
export const isEmailRegistered = (email: string): boolean => {
  const contacts = getContactData();
  return contacts.some(contact => contact.email === email);
};

// Função para verificar se um número de WhatsApp já está cadastrado
export const isWhatsAppRegistered = (whatsapp: string): boolean => {
  const whatsappClean = whatsapp.replace(/\D/g, '');
  const contacts = getContactData();
  return contacts.some(contact => contact.whatsapp.replace(/\D/g, '') === whatsappClean);
};
