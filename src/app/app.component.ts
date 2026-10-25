import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiRootModule, TuiDialogModule, TUI_SANITIZER } from '@taiga-ui/core';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextFieldState } from './shared/components/multiple-text-field/multiple-text-field.type';
import { DefaultLayoutComponent } from './layout/default-layout.component';

@Component({
    selector: 'app-root',
    imports: [
        TuiRootModule,
        ReactiveFormsModule,
        TuiRootModule,
        TuiDialogModule,
        DefaultLayoutComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }]
})
export class AppComponent {
  title = 'UKO';

  formKeyValue = new FormGroup({
    value: new FormControl<TextFieldState>({ ['']: '' }),
  });

  constructor() {}
}
