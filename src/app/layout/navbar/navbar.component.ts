import { TuiAccordion } from "@taiga-ui/kit";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'uko-navbar',
    imports: [TuiAccordion, RouterLink],
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NavbarComponent {}
