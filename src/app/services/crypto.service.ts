import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly ivLength = 12; // 12 bytes for AES-GCM
  private readonly iterations = 100_000;
  private readonly encoder = new TextEncoder();
  private readonly decoder = new TextDecoder();

  // Derives a consistent AES key from a password and provided salt
  async deriveKeyFromPassword(password: string, base64Salt: string): Promise<CryptoKey> {
    const salt = Uint8Array.from(atob(base64Salt), (c) => c.charCodeAt(0));

    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      this.encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey'],
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: this.iterations,
        hash: 'SHA-256',
      },
      keyMaterial,
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt'],
    );
  }

  // Encrypts plain text using AES-GCM and returns base64 string
  async encrypt(plainText: string, key: CryptoKey): Promise<string> {
    const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
    const encoded = this.encoder.encode(plainText);

    const encryptedBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);

    return btoa(String.fromCharCode(...combined));
  }

  // Decrypts base64-encoded AES-GCM string back to plain text
  async decrypt(encryptedBase64: string, key: CryptoKey): Promise<string> {
    try {
      const data = Uint8Array.from(atob(encryptedBase64), (c) => c.charCodeAt(0));
      const iv = data.slice(0, this.ivLength);
      const encryptedData = data.slice(this.ivLength);

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encryptedData,
      );

      return this.decoder.decode(decryptedBuffer);
    } catch (error) {
      console.error('Decryption failed:', error);
      return '[Decryption failed]';
    }
  }
}
