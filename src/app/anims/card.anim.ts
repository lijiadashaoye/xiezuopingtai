import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';

export const cardAnim = trigger('card', [
  state('out', style({
    transform: 'scale(1)',
    'box-shadow': 'none',
    cursor: 'pointer',
  })),
  state('hover', style({
    transform: 'scale(0.95)',
    'box-shadow': '0px 0px 30px rgba(0,0,0,.5)',
    cursor: 'pointer',
  })),
  transition('out=>hover', animate('250ms')),
  transition('hover=>out', animate('200ms')),
])
