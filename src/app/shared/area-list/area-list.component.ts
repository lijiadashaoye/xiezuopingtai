import {
  Component,
  OnInit,
  Input,
  forwardRef,
  OnDestroy
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  NG_VALIDATORS
} from '@angular/forms'
import {
  Observable,
  Subscription,
  Subject,
} from 'rxjs';
import {
  Address,
} from '../../domain/user.model';
import {
  getAreaByCity,
  getCitiesByProvince,
  getProvince
} from '../../utils/area.utils'
@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    }
  ]
})
export class AreaListComponent implements ControlValueAccessor, OnInit, OnDestroy {
  sub: Subscription
  private propagateChange = (_: any) => {};
  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: '',
  }

  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street = new Subject();

  province$: Observable < string[] > ;
  cities$: Observable < string[] > ;
  district$: Observable < string[] > ;
  street$: Observable < string[] > ;

  constructor() {}

  ngOnInit() {
    let province$ = this._province.asObservable().startWith('');
    let city$ = this._city.asObservable().startWith('');
    let district$ = this._district.asObservable().startWith('');
    let street$ = this._street.asObservable().startWith('');

    let val$ = Observable.combineLatest([province$, city$, district$, street$], (_p, _c, _d, _s) => {
      return {
        province: _p,
        city: _c,
        district: _d,
        street: _s,
      }
    })
    this.sub = val$.subscribe(v => this.propagateChange(v));

    this.province$ = Observable.of(getProvince())
    this.cities$ = province$.map((p: string) => getCitiesByProvince(p))
    this.district$ = Observable.combineLatest(province$, city$, (p: string, c: string) => getAreaByCity(p, c));

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  writeValue(obj: Address): void {
    if (obj) {
      this._address = obj;
      if (this._address.province) {
        this._province.next(this._address.province)
      }
      if (this._address.city) {
        this._city.next(this._address.city)
      }
      if (this._address.district) {
        this._district.next(this._address.district)
      }
      if (this._address.street) {
        this._street.next(this._address.street)
      }
    }
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  };

  registerOnTouched(fn: any): void {};

  validate(c: FormControl) {
    let val = c.value;
    if (!val) {
      return null
    }
    if (
      val.province &&
      val.city &&
      val.district &&
      val.street
    ) {
      return null
    }
    return {
      addressInvalid: true
    }
  }
  onProvinceChange() {
    this._province.next(this._address.province)
  }
  onCityChange() {
    this._city.next(this._address.city)
  }
  onDistrictChange() {
    this._district.next(this._address.district)
  }
  onStreetChange() {
    this._street.next(this._address.street)
  }
}
