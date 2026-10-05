import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Observable, of, switchMap } from 'rxjs';
import { TestQuery } from '../../core/state/test.query';
import { TestService } from '../../core/state/test.service';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, TuiInputModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  searchQuery: string | null = '';

  searchForm = this.fb.group({
    value: [''],
  });

  characters$: Observable<string[]> = new Observable<string[]>();
  container: HTMLDivElement | undefined
  text: HTMLElement | string | undefined

  constructor(
    private fb: FormBuilder,
    private query: TestQuery,
    private testService: TestService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.characters$ = this.query.items$;

    this.testService.items();

    this.searchForm
      .get('value')
      ?.valueChanges.pipe(
        switchMap((value, index) => {
          console.log('Value', value, 'index', index);
          if (index === 0) {
            return [value];
          } else {
            console.log('Else');
            return of(value).pipe(debounceTime(4000));
          }
        })
      )
      .subscribe((value) => {
        this.searchQuery = value;
      });
  }

  get filtered() {
    return this.characters$.pipe(
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
}
