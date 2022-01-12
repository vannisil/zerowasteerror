import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-riciclo',
  templateUrl: './riciclo.component.html',
  styleUrls: ['./riciclo.component.css']
})
export class RicicloComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'COMING SOON!', cols: 2, rows: 1 },

        ];
      }

      return [
        { title: 'COMING SOON!', cols: 2, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
