import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../config-service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private config: ConfigService = inject(ConfigService);
private http: HttpClient = inject(HttpClient);
private apiUrl = this.config.apiUrl;
   getConfigs(configList: string[]){
    return this.http.post(`${this.apiUrl}config/getMultipleConfigs`, {configList});
  }
}
