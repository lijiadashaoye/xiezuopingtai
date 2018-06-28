import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS } from '@angular/forms'
import { Observable, Subscription } from 'rxjs';
import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInYears,
  differenceInMonths,
  isBefore,
  parse,
  format,
  isValid,
  isDate,
  isFuture
} from 'date-fns';
import { isValidDate } from '../../utils/date.util';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}
export interface Age {
  age: number;
  unit: AgeUnit
}
@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnDestroy {
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() debounceTime = 300;
  @Input() forma = 'YYY-MM-DD'

  form: FormGroup;
  selectecUnit = AgeUnit.Year;
  ageUnits = [
    { value: AgeUnit.Year, label: '岁' },
    { value: AgeUnit.Month, label: '月' },
    { value: AgeUnit.Day, label: '天' },
  ];
  sub: Subscription
  private propagateChange = (_: any) => { };
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, { validator: this.validateAge('ageNum', 'ageUnit') })
    })

    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges
      .map(d => {
        return { date: d, from: 'birthday' }
      }).debounceTime(this.debounceTime)
      // .distinctUntilChanged();
      .filter(_ => birthday.valid)
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(this.debounceTime)
    // .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(this.debounceTime)
    // .distinctUntilChanged();

    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (a, b) => {
      return this.toDate({ age: a, unit: b })
    }).map(d => {
      return { date: d, from: 'age' }
    })
      .filter(_ => this.form.get('age').valid)

    const merged$ = Observable.merge(birthday$, age$)
      .filter(_ => this.form.valid)

    this.sub = merged$.subscribe(d => {
      let age = this.toAge(d.date);
      if (d.from == 'birthday') {
        if (age.age != ageNum.value) {
          ageNum.patchValue(age.age, { emitEvent: false })
        }
        if (age.unit != ageUnit.value) {
          this.selectecUnit = age.unit;
          ageUnit.patchValue(age.unit, { emitEvent: false })
        }
        this.propagateChange(d.date)
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (
          age.age != ageToCompare.age ||
          age.unit != ageToCompare.unit
        ) {
          birthday.patchValue(d.date, { emitEvent: false });
          this.propagateChange(d.date)
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date) ?
      { age: differenceInDays(now, date), unit: AgeUnit.Day } :
      isBefore(subMonths(now, this.monthsTop), date) ?
        { age: differenceInMonths(now, date), unit: AgeUnit.Month } :
        { age: differenceInYears(now, date), unit: AgeUnit.Year }
  }
  toDate(age: Age): string {
    const now = Date.now();
    const dateFormat = 'YYYY-MM-DD'
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), dateFormat)
      };
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), dateFormat)
      };
      case AgeUnit.Day: {
        return format(subDays(now, age.age), dateFormat)
      };
    }
  }
  writeValue(obj: any): void {
    if (obj) {
      let date = format(obj, this.forma)
      this.form.get('birthday').patchValue(date);
      let age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  };

  registerOnTouched(fn: any): void { };

  validate(c: FormControl) {
    let val = c.value;
    if (!val) {
      return null
    }
    if (isValidDate(val)) {
      return null
    }
    return { dateOfBirthInvalid: true }
  }

  validateDate(c: FormControl) {
    const val = c.value;
    return isValidDate(val) ? null : { birthdayInvalid: true }
  }
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup) => {
      let ageNum = group.controls[ageNumKey];
      let ageUnit = group.controls[ageUnitKey];
      let result = false;
      let ageNumVal = ageNum.value;

      const now = Date.now();
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop
        }; break;
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop
        }; break;
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop
        };
      }
    }
  }
}
