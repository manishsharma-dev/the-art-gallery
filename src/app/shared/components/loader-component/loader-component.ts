import { Component,OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../services/admin/loader-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader-component',
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.scss'
})

export class LoaderComponent implements OnInit {
  loading$!: Observable<boolean>;
  private loaderService: LoaderService = inject(LoaderService);
  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$; // Subscribe to loading state
  }
}

