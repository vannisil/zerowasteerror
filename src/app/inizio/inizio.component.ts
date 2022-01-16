import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-inizio',
  templateUrl: './inizio.component.html',
  styleUrls: ['./inizio.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0}),
        animate(1100)
      ])
    ])
  ]
})
export class InizioComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Cosa è Zero Waste Error?', cols: 2, rows: 1 },
 
        ];
      }

      return [
        { title: 'Cosa è Zero Waste Error?', cols: 2, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
