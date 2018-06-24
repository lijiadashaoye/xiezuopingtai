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
    transform: 'scale(1.05)',
    'box-shadow': '2px 2px 20px rgba(0,0,0,.5)',
    cursor: 'pointer',
  })),
  transition('out=>hover', animate('500ms')),
  transition('hover=>out', animate('200ms')),
])
