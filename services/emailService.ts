import emailjs from '@emailjs/browser';

const TEMPLATE_VERIFICATION_ID = 'template_ret6iwe'; 
const SERVICE_ID = 'service_8vuezwj'; 
const PUBLIC_KEY = 'VuvuOQDeVBUk-xqYB'; 

export const sendVerificationEmail = async (userEmail: string, code: string): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: userEmail,        
      verification_code: code,    
      app_name: 'MONTFLIX'
    };
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_VERIFICATION_ID, templateParams, PUBLIC_KEY);
    return response.status === 200;
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    return true; // Fallback apenas para não travar o cadastro caso o EmailJS atinja o limite
  }
};

export const sendUpdateEmail = async (userEmail: string, title: string, message: string): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: userEmail,
      subject: title,
      message: message,
      app_name: 'MONTFLIX'
    };
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_VERIFICATION_ID, templateParams, PUBLIC_KEY);
    return response.status === 200;
  } catch (error) {
    console.error("❌ Erro ao enviar novidade:", error);
    return false;
  }
};