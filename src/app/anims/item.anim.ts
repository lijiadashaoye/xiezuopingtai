import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';

export const itemAnim = trigger('item', [
  state('out', style({
    'border-left-width': '3px',
    cursor: 'pointer',
  })),
  state('in', style({
    'border-left-width': '8px',
    cursor: 'pointer',
  })),
  transition('out=>in', animate('100ms')),
  transition('in=>out', animate('100ms')),
])
