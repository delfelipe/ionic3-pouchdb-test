import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { EmployeePage } from './../employee/employee';
import { EmployeeProvider } from '../../providers/employee/employee';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public employees;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public employeeProvider: EmployeeProvider
  ) {

  }

  ionViewDidEnter() {
    this.employeeProvider.createPouchDb();
    let employees = this.employeeProvider.read();
    this.employees = employees;
  }

  showDetails(employee) {
    let modal = this.modalCtrl.create(EmployeePage, { employee: employee });
    modal.present();
  }

}