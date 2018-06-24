import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';

export const slideToRight = trigger('routeAnim', [
  state('void', style({
    position: 'fixed',
    width: '100%',
    height:'calc(100% - 128px)',
    opacity:0
  })),
  state('*', style({
    position: 'fixed',
    width: '100%',
    height: 'calc(100% - 128px)',
    opacity:1
  })),
  transition('void => *', [
    style({
      transform: 'translateX(-100%)',
      opacity:0
    }),
    animate('800ms ease-in-out', style({
      transform: 'translateX(0)',
      opacity:1
    }))
  ]),
  transition('* => void', [
      style({
        transform: 'translateX(0)',
        opacity:1
      }),
    animate('500ms', style({
      transform: 'translateX(100%)',
      opacity:0
    }))
  ])
])
