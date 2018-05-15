import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee/employee';

@Component({
  selector: 'employee',
  templateUrl: 'employee.html'
})
export class EmployeePage {
  employee: any = {};
  canDelete = false;
  canUpdate = false;  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private employeeProvider: EmployeeProvider,
    public viewCtrl: ViewController
  ) {

  }

  ionViewDidEnter(){
    var employee = this.navParams.get('employee');
    if(employee){
      this.employee = employee;
      this.canDelete = true;
      this.canUpdate = true;
    }
  }

  addOrUpdate() {

    if (this.canUpdate) {
      this.employeeProvider.update(this.employee)
        .catch(()=>{});
    } else {
      this.employeeProvider.create(this.employee)
        .catch(()=>{});
    }

    this.viewCtrl.dismiss(this.employee);

  }

  delete() {
    this.employeeProvider.delete(this.employee)
      .catch(()=>{});

    this.viewCtrl.dismiss(this.employee);
  }

}