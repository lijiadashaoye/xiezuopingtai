import {
  trigger,
  state,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

export const staggerAnims = trigger('staggerAnim', [
  transition('*=>*', [
    query(":enter", style({
      opacity: 0
    }),{optional:true}),
    query(":enter", stagger(200, [
      animate('500ms', style({
        opacity: 1
      }))
    ]),{optional:true}),
    query(":leave", style({
      opacity: 1
    }),{optional:true}),
    query(":leave", stagger(100, [
      animate('100ms', style({
        opacity: 0
      }))
    ]),{optional:true}),
  ])
])
