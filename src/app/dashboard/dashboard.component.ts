import { Component, OnInit } from '@angular/core';
import { IngresoService } from '../ingreso/ingreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor( public ingresoService: IngresoService ) { }

  ngOnInit() {
    this.ingresoService.initIngresoListener();
  }

}
