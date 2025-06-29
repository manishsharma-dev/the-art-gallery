import { Injectable, inject } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  cryptoService: CryptoService = inject(CryptoService);
  _key = localStorage.getItem('_key') ?? '';
  _salt = localStorage.getItem('_salt') ?? '';
  async setItem(name: string, data: string) {
    const key = await this.cryptoService.deriveKeyFromPassword(this._key, this._salt);
    const enc = await this.cryptoService.encrypt(data, key);
    localStorage.setItem(name, enc);
  }

  async getItem(name: string) {
    const item = localStorage.getItem(name);
    if (!item) return null;

    const key = await this.cryptoService.deriveKeyFromPassword(this._key, this._salt);
    const enc = await this.cryptoService.decrypt(item, key);
    return enc;
  }
}
