import { NgTemplateOutlet } from "@angular/common";
import { Component, Input, input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
})
export class CardComponent {

  slot = input.required<TemplateRef<HTMLElement>>()

  constructor() {}
}
