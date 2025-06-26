import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/admin/dashboard.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-dashboard.component',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
private dashboardService: DashboardService = inject(DashboardService);
 readonly configList = [
        "GENDER",
        "COUNTRY",
        "MEDIA TYPE"
    ]

  ngOnInit(): void {
    this.getConfigs();
  }

  getConfigs(){
      this.dashboardService.getConfigs(this.configList)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            console.log('Configs fetched successfully:', response);
          },
          error: (error) => {
            console.error('Error fetching configs:', error);
          }
        })
  }


}
