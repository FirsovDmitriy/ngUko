import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
} from '@angular/core'

@Component({
  selector: 'uko-preview',
  imports: [],
  templateUrl: './preview.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PreviewComponent {
  readonly htmlValue = input<string>('')
}
