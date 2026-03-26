// test-env.js
require('dotenv').config({ path: '.env.local' });

console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Not set');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Not set');

if (process.env.DATABASE_URL) {
  console.log('First 50 chars:', process.env.DATABASE_URL.substring(0, 50) + '...');
}