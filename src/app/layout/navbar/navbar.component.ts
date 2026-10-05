import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import {TuiAccordionModule} from '@taiga-ui/kit';

@Component({
    selector: 'uko-navbar',
    standalone: true,
    // exportAs: "",
    imports: [TuiAccordionModule, RouterLink],
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavbarComponent {}
