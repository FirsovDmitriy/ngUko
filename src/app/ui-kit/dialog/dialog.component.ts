import { Component, inject } from '@angular/core'
import {
  TuiDialogContext,
  TuiDialogModule,
  TuiDialogService,
} from '@taiga-ui/core'
import {
  POLYMORPHEUS_CONTEXT,
  PolymorpheusContent,
} from '@tinkoff/ng-polymorpheus'

@Component({
  selector: 'uko-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  protected readonly context = inject<TuiDialogContext>(POLYMORPHEUS_CONTEXT)
  private readonly tuiDialogService = inject(TuiDialogService)

  protected show(content: PolymorpheusContent<TuiDialogContext>): void {
    this.tuiDialogService.open(content).subscribe()
  }
}
