import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-admin-layout-components',
  imports: [CommonModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    RouterModule,
    MatIconModule],
  templateUrl: './admin-layout-components.html',
  styleUrl: './admin-layout-components.scss'
})
export class AdminLayoutComponents implements OnInit {
  ngOnInit(): void {
    console.log("");
  }
}
