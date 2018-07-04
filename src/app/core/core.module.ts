import {
  NgModule,
  SkipSelf,
  Optional
} from '@angular/core';
import {
  SharedModule
} from '../shared/shared.module';
import {
  HeaderComponent
} from './header/header.component';
import {
  SidebarComponent
} from './sidebar/sidebar.component';
import {
  FooterComponent
} from './footer/footer.component'

import {
  MdIconRegistry
} from '@angular/material';
import {
  DomSanitizer
} from '@angular/platform-browser';
import {
  loadSvgResources
} from '../utils/sug.utils';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  HttpModule
} from '@angular/http';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import 'rxjs/operator/take'
import 'rxjs/operator/debounceTime'
import 'rxjs/operator/distinctUntilChanged'
import 'rxjs/operator/filter'
import 'rxjs/operator/map'
import 'rxjs/operator/mapTo'
import 'rxjs/observable/from'
import 'rxjs/operator/mergeMap'
import 'rxjs/operator/count'
import 'rxjs/operator/switchMap'
import 'rxjs/operator/concat'
import 'rxjs/operator/reduce'
import 'rxjs/operator/mergeMap'
import 'rxjs/operator/take'

import { AppStoreModule } from '../reducers';
import { AppEffectsModule } from '../effects'

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    AppStoreModule,
    AppEffectsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ], providers: [
    {
      provide: 'BASE_URL', useValue: {
        baseUrl: "http://localhost:3000"
      }
    }
  ],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MdIconRegistry,
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('模块已经加载，不能再次加载！')
    }
    loadSvgResources(ir, ds)
  }
}
