import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiRootModule, TuiDialogModule, TUI_SANITIZER } from '@taiga-ui/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MultipleTextFieldComponent } from './shared/components/multiple-text-field/multiple-text-field.component';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TextFieldState } from './shared/components/multiple-text-field/multiple-text-field.type';
import NavBarComponent from './layout/nav-bar/nav-bar.component';
import { TestQuery } from './core/state/test.query';
import {
  combineLatest,
  combineLatestWith,
  debounceTime,
  filter,
  iif,
  map,
  mergeMap,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { TestService } from './core/state/test.service';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TuiRootModule,
    TuiInputModule,
    ReactiveFormsModule,
    MultipleTextFieldComponent,
    JsonPipe,
    NavBarComponent,
    TuiRootModule,
    TuiDialogModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent implements OnInit {
  title = 'UKO';

  searchQuery: string | null = '';
  searchQuery$: Subject<string> = new Subject();

  formKeyValue = new FormGroup({
    value: new FormControl<TextFieldState>({ ['']: '' }),
  });

  searchForm = this.fb.group({
    value: ['', Validators.required],
  });

  items$: Observable<string[]> = new Observable<string[]>();

  constructor(
    private fb: FormBuilder,
    private query: TestQuery,
    private characterService: TestService
  ) {}

  ngOnInit(): void {
    this.items$ = this.query.items$;

    this.characterService.characters();

    this.searchForm
      .get('value')
      ?.valueChanges
      .subscribe((value) => {
        this.searchQuery$.next(value ?? '');
        this.searchQuery = value;
        console.log('value', value)
      });
  }

  get filtered() {
    return this.items$.pipe(
      map((item) =>
        item
          .filter((value) => {
            if (this.searchQuery) {
              return value
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase());
            } else return value;
          })
          .sort()
      )
    );
  }

  get foo() {
    return combineLatest(
      this.searchQuery$.pipe(
        mergeMap((value) =>
          iif(
            () => !!value, // Преобразуем value в булево значение
            of(value),
            of(value).pipe(debounceTime(5000))
          )
        )
      ),
      this.items$,
      this.filteredNames.bind(this)
    )
  }

  filteredNames(searchQuery: string, items: string[]) {
    console.log(searchQuery, 'items', items)
    return items;
    // return items.filter((name) => {
    //   if(name.toLowerCase().includes(searchQuery)) {
    //     return name
    //   } else return name
    // });
  }
}
