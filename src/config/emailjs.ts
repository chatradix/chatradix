// =========================================================================
// EMAILJS CONFIGURATION FOR CHATRADIX SYSTEM SUPPORT
// =========================================================================
// 1. Sign up / Log in to https://www.emailjs.com/ (Free account, 200 emails/month)
// 2. Email Services -> Add New Service (e.g. Gmail / info@chatradix.com) -> Copy Service ID
// 3. Email Templates -> Create New Template -> Switch to HTML (<>) -> Paste wp-emailer.html -> Copy Template ID
// 4. In EmailJS template settings:
//    - Set "To Email" to: info@chatradix.com
//    - Set "Subject" to: New System Support Inquiry from {{store_name}}
// 5. Account -> API Keys -> Copy Public Key
// 6. Paste your 3 values below:

export const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID', // Replace with your Service ID from EmailJS
  templateId: 'YOUR_TEMPLATE_ID', // Replace with your Template ID from EmailJS
  publicKey: 'YOUR_PUBLIC_KEY', // Replace with your Public Key from EmailJS
};
