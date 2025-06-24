import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
private config: Record<string, string> = {};

  async loadConfig(): Promise<void> {
    const response = await fetch('/assets/env.json?v=' + Date.now());
    this.config = await response.json();
  }

  get apiUrl(): string {
    return this.config['apiUrl'] || 'http://localhost:3000';
  }
}
