import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects'
import { QuoteEffects } from './quote.effects';
import { AuthEffects } from './auth.effect';

@NgModule({
    imports: [
        EffectsModule.run(QuoteEffects),
        EffectsModule.run(AuthEffects)
    ],
})
export class AppEffectsModule { }