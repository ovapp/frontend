const { google } = require('googleapis');
const path = require('path');

// Caminho para a chave JSON da conta de serviço
const keyFile = path.join(__dirname, 'your-service-account-key.json');

// Autentica com a conta de serviço
const auth = new google.auth.GoogleAuth({
  keyFile: keyFile,
  scopes: ['https://www.googleapis.com/auth/firebase'],
});

const firebaseHosting = google.firebasehosting({
  version: 'v1beta1',
  auth: auth,
});
