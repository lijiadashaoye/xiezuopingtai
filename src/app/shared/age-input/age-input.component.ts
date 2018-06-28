import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS } from '@angular/forms'
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
export class AgeInputComponent implements ControlValueAccessor {
  form: FormGroup;
  private propagateChange = (_: any) => { };
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.form = this.fb.group({
      birthday: [],
      age: this.fb.group({
        ageNum: [],
        ageUnit: []
      })
    })
  }
  writeValue(obj: any): void {
    // this.selected = obj;
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  };

  registerOnTouched(fn: any): void { };

  validate(c: FormControl) {
    // return this.selected ? null : { key: '表单组建验证错误' }
  }
}
