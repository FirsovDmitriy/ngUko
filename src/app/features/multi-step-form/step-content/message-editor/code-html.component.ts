import { Component, inject } from '@angular/core'
import { TuiButtonModule, TuiDialogContext, TuiDialogService, TuiDialogSize } from '@taiga-ui/core'
import { PolymorpheusContent, PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'uko-code-html',
  standalone: true,
  imports: [TuiButtonModule, PolymorpheusModule],
  templateUrl: './code-html.component.html',
})
export class CodeHtmlComponent {
  private readonly dialogs = inject(TuiDialogService)

  onClick(
        content: PolymorpheusContent<TuiDialogContext>,
        // header: PolymorpheusContent,
        size: TuiDialogSize,
    ): void {
        this.dialogs
            .open(content, {
                label: '',
                // header,
                size,
            })
            .subscribe();
    }
}
