import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiAccordionModule} from '@taiga-ui/kit';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    // exportAs: "",
    imports: [TuiAccordionModule],
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavBarComponent {}
