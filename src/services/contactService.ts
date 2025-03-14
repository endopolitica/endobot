
import { supabase } from "@/integrations/supabase/client";

// Definindo a interface para os dados de contato
export interface ContactData {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  contactPreference: 'email' | 'whatsapp';
  createdAt: string;
}

// Função para salvar os dados de contato no Supabase
export const saveContactData = async (data: Omit<ContactData, 'id' | 'createdAt'>): Promise<ContactData> => {
  // Formatar os dados para a tabela do Supabase (snake_case)
  const contactDataForDb = {
    name: data.name,
    email: data.email,
    whatsapp: data.whatsapp,
    contact_preference: data.contactPreference
  };
  
  try {
    // Inserir dados no Supabase
    const { data: insertedData, error } = await supabase
      .from('contacts')
      .insert(contactDataForDb)
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao salvar contato:', error);
      throw error;
    }
    
    // Formatar dados retornados para o formato da aplicação (camelCase)
    return {
      id: insertedData.id,
      name: insertedData.name,
      email: insertedData.email,
      whatsapp: insertedData.whatsapp,
      contactPreference: insertedData.contact_preference as 'email' | 'whatsapp',
      createdAt: insertedData.created_at
    };
  } catch (error) {
    console.error('Erro detalhado ao salvar contato:', error);
    throw error;
  }
};

// Função para obter todos os dados de contato do Supabase
export const getContactData = async (): Promise<ContactData[]> => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erro ao obter contatos:', error);
    throw error;
  }
  
  // Formatar dados retornados para o formato da aplicação (camelCase)
  return data.map(item => ({
    id: item.id,
    name: item.name,
    email: item.email,
    whatsapp: item.whatsapp,
    contactPreference: item.contact_preference as 'email' | 'whatsapp',
    createdAt: item.created_at
  }));
};

// Função para verificar se um email já está cadastrado
export const isEmailRegistered = async (email: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('contacts')
    .select('email')
    .eq('email', email)
    .maybeSingle();
  
  if (error) {
    console.error('Erro ao verificar email:', error);
    throw error;
  }
  
  return data !== null;
};

// Função para verificar se um número de WhatsApp já está cadastrado
export const isWhatsAppRegistered = async (whatsapp: string): Promise<boolean> => {
  const whatsappClean = whatsapp.replace(/\D/g, '');
  
  // Precisamos fazer uma busca mais complexa pois o número pode estar armazenado com formatação
  const { data, error } = await supabase
    .from('contacts')
    .select('whatsapp');
  
  if (error) {
    console.error('Erro ao verificar WhatsApp:', error);
    throw error;
  }
  
  // Verifica se existe algum contato com o mesmo número (removendo formatação)
  return data.some(item => item.whatsapp.replace(/\D/g, '') === whatsappClean);
};
