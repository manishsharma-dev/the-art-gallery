import { Injectable, isDevMode } from '@angular/core';

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

    return isDevMode() ? this.config['apiUrlDev'] : this.config['apiUrl'] ;
  }
}
