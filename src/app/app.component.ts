import { TUI_SANITIZER } from "@taiga-ui/legacy";
import { NgDompurifySanitizer } from '@taiga-ui/dompurify';
import { TuiRoot, TuiDialog } from '@taiga-ui/core';
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
        TuiRoot,
        ReactiveFormsModule,
        TuiDialog,
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
