
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
    // Usar maybeSingle em vez de single para evitar erros
    const { data: insertedData, error } = await supabase
      .from('contacts')
      .insert(contactDataForDb)
      .select()
      .maybeSingle();
    
    if (error) {
      console.error('Erro ao salvar contato:', error);
      throw new Error(`Falha ao salvar contato: ${error.message}`);
    }
    
    if (!insertedData) {
      console.error('Nenhum dado retornado após inserção');
      throw new Error('Falha ao salvar contato: Nenhum dado retornado');
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
    // Retornar um erro mais amigável para o usuário
    if (error instanceof Error) {
      throw new Error(`Não foi possível salvar o contato: ${error.message}`);
    } else {
      throw new Error('Não foi possível salvar o contato: erro desconhecido');
    }
  }
};

// Função para obter todos os dados de contato do Supabase
export const getContactData = async (): Promise<ContactData[]> => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erro ao obter contatos:', error);
      throw new Error(`Falha ao obter contatos: ${error.message}`);
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
  } catch (error) {
    console.error('Erro detalhado ao obter contatos:', error);
    if (error instanceof Error) {
      throw new Error(`Não foi possível obter contatos: ${error.message}`);
    } else {
      throw new Error('Não foi possível obter contatos: erro desconhecido');
    }
  }
};

// Função para verificar se um email já está cadastrado
export const isEmailRegistered = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('email')
      .eq('email', email)
      .maybeSingle();
    
    if (error) {
      console.error('Erro ao verificar email:', error);
      throw new Error(`Falha ao verificar email: ${error.message}`);
    }
    
    return data !== null;
  } catch (error) {
    console.error('Erro detalhado ao verificar email:', error);
    // Em caso de erro na verificação, assumimos que o email não está cadastrado
    // para não bloquear o cadastro do usuário
    return false;
  }
};

// Função para verificar se um número de WhatsApp já está cadastrado
export const isWhatsAppRegistered = async (whatsapp: string): Promise<boolean> => {
  const whatsappClean = whatsapp.replace(/\D/g, '');
  
  try {
    // Precisamos fazer uma busca mais complexa pois o número pode estar armazenado com formatação
    const { data, error } = await supabase
      .from('contacts')
      .select('whatsapp');
    
    if (error) {
      console.error('Erro ao verificar WhatsApp:', error);
      throw new Error(`Falha ao verificar WhatsApp: ${error.message}`);
    }
    
    // Verifica se existe algum contato com o mesmo número (removendo formatação)
    return data.some(item => item.whatsapp.replace(/\D/g, '') === whatsappClean);
  } catch (error) {
    console.error('Erro detalhado ao verificar WhatsApp:', error);
    // Em caso de erro na verificação, assumimos que o WhatsApp não está cadastrado
    // para não bloquear o cadastro do usuário
    return false;
  }
};
