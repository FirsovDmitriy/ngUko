import { Component } from '@angular/core';
import NavbarComponent from "./navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'default-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './default-layout.component.html',
  providers: [],
})
export class DefaultLayoutComponent {}
