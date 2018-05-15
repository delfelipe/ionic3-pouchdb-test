import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';  
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

/*
  Generated class for the EmployeeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmployeeProvider {

  public pdb;
  public employees;

  constructor(public http: HttpClient) {
    
  }

  createPouchDb() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this.pdb = new PouchDB(
      'employees.db',
      {
        adapter: 'cordova-sqlite'
      }
    );
  }

  create(employee) {
    return this.pdb.post(employee);
  }

  update(employee) {
    return this.pdb.put(employee);
  }

  delete(employee) {
    return this.pdb.delete(employee);
  }

  read() {
    function allDocs() {
      this.pdb.allDocs({ include_docs: true })
        .then(docs => {
          this.employees = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });
          return this.employees;
        });
    }
    this.pdb.changes({ live: true, since: 'now', include_docs: true })
      .on('change', () => {
        allDocs();
      });
  }

}
