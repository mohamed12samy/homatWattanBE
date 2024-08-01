import crypto from 'crypto';

// Define the algorithm and key
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Ensure this key is securely stored
const iv = crypto.randomBytes(16);  // Initialization vector

// Encrypt function
export function encrypt(text: string): { iv: string; encryptedData: string } {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
}

// Decrypt function
export function decrypt(text: { iv: string; encryptedData: string }): string {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Example usage
const encrypted = encrypt('Hello, World!');
console.log('Encrypted:', encrypted);

const decrypted = decrypt(encrypted);
console.log('Decrypted:', decrypted);
