import { Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout-components',
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterModule],
  templateUrl: './admin-layout-components.html',
  styleUrl: './admin-layout-components.scss'
})
export class AdminLayoutComponents {

}
