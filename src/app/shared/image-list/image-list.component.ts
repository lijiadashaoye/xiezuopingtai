import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS } from '@angular/forms'

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListComponent),
      multi: true
    }
  ]
})
export class ImageListComponent implements ControlValueAccessor {
  private propagateChange = (_: any) => { };
  @Input() items = [];
  @Input() title = '选择';
  @Input() cols = 8;
  @Input() useSvgIcon = false;
  @Output() changeImage = new EventEmitter()
  selected = null;
  toggleTitle = '使用图片';
  constructor() { }

  onChage(index) {
    this.selected = this.items[index];
    this.propagateChange(this.selected)
  }
  writeValue(obj: any): void {
    this.selected = obj;
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  };

  registerOnTouched(fn: any): void { };
  validate(c: FormControl) {
    return this.selected ? null : { key: '表单组建验证错误' }
  }
  onChange(e) {
    this.selected = null;
    this.selected = null;
    this.changeImage.emit(e);
    e.checked ? this.toggleTitle = '使用图标' : this.toggleTitle = '使用图片';
  }
}
