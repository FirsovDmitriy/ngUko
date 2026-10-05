import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MultiStepFormComponent } from './features/multi-step-form/multi-step-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'message-builder',
    component: MultiStepFormComponent
  }
];
