import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-inizio',
  templateUrl: './inizio.component.html',
  styleUrls: ['./inizio.component.css']
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
