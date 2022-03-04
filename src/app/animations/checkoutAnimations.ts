import {
    animate,
    animation,
    query,
    style,
    transition,
    trigger
  } from "@angular/animations";

  export const checkoutAnimation = trigger("toggleCheckout", [
   
     transition(":enter", [ //target dom elements entering
            style({
                position: 'relative',
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
            animate('.8s', style({
                opacity: 1,
                transform: 'translateX(0%)'
            })), //will animate back to its normal state or style can be included to animate to a style
        ]),

  ])
