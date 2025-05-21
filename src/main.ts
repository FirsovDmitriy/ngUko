import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import items from '../public/characters'

localStorage.setItem('characters', JSON.stringify(items))

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));