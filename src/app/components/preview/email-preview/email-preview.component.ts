import { NgClass } from '@angular/common'
import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core'
import { TuiGroup, TuiButton } from '@taiga-ui/core'
import { MultiStepFormManager } from '../../multi-step-form/_state/multi-step-form.manager'
import { steps } from '../../multi-step-form/constants'

@Component({
  selector: 'uko-email-preview',
  imports: [TuiButton, TuiGroup, NgClass],
  templateUrl: './email-preview.template.html',
})
export class EmailPreviewComponent {
  private readonly formManager = inject(MultiStepFormManager)

  protected viewport = signal<'desktop' | 'mobile'>('desktop')
  protected readonly classes = computed(() => {
    const isDesktop = this.viewport() === 'desktop'

    return {
      'mx-auto bg-white transition-all duration-300 ease-in-out shadow-lg': true,
      'w-full max-w-[1000px] h-[700px] border border-slate-200 rounded-md':
        isDesktop,
      'w-[360px] h-[640px] border-[12px] border-slate-800 rounded-[32px] overflow-hidden':
        !isDesktop,
    }
  })

  protected readonly htmlRaw = this.formManager.selectValue(
    steps.MESSAGE_CONTENT,
  )

  constructor() {
    effect(() => {
      console.log('Template:', this.htmlRaw().emailTemplate)
    })
  }

  protected setViewport(mode: 'desktop' | 'mobile'): void {
    this.viewport.set(mode)
  }
}
