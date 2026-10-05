import { Component, Input } from '@angular/core';

interface TestData {
  title: string
  id: number
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  @Input() testData: TestData = {
    title: '',
    id: 0
  }

  get title(): string {
    return this.testData.title
  }

  get id() {
    return this.testData.id
  }
}
