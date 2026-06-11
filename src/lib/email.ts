import emailjs from '@emailjs/browser';

export const sendEmail = async (templateParams: Record<string, unknown>) => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!publicKey || !serviceId || !templateId) {
    console.warn('EmailJS credentials are not fully configured in environment variables.');
    // We throw an error so the caller can know it failed to configure properly,
    // but in a production setting we might just log it and bypass depending on the needs.
    throw new Error('EmailJS not configured');
  }

  const finalParams = {
    ...templateParams,
    to_email: 'sivanshdubey69@gmail.com'
  };

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      finalParams,
      publicKey
    );
    return response;
  } catch (err) {
    console.error('Failed to send email:', err);
    throw err;
  }
};
