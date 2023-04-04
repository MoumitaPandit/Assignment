import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators';
import * as _ from 'underscore';
import { Store } from '@ngrx/store';
import { addItem } from './StateManage/addFav.action';

const CACHE_API_CALL = "httpCallCache"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UniversityApp';
  length: number = 40;
  searchText = "";
  searchTextCountry = "";
  universities: any = [];
  countries: any = new Set();
  country: any = [];
  result: any = [];
  tableData: any = [];
  rowCount = 10;
  currentPage = 1;
  totalPages = 1;
  actualData: any = [];
  flag = 0;

  label = "Click here to see favourite marked university";
  add$: Observable<[]> | undefined;


  constructor(private http: HttpClient,
    private store: Store<{ add: [] }>
  ) {

    //api call
    this.result = this.http.get<any>("http://universities.hipolabs.com/search")

    //caching api call to localstorage
    this.result.subscribe((next: any) => {
      localStorage[CACHE_API_CALL] = JSON.stringify(next);
    })

    //fetching the data from local storage
    this.result = this.result.pipe(
      startWith(JSON.parse(localStorage[CACHE_API_CALL] || '[]'))
    )
  }



  ngOnInit(): void {
  }


 

   // dropdown container to open & close
  selectedUniversity(event: any) {
    this.searchText = event.currentTarget.innerHTML;
    this.addClass("0");
  }
  selectedCountry(event: any) {
    this.searchTextCountry = event.currentTarget.innerHTML;
    this.addClass("1");
  }
  addClass(index: any) {
    let x = document.getElementsByClassName("dropdown-content");
    if (x[<number>index].className.includes('show')) {
      x[<number>index].className = x[0].className.replace('show', '');
    }
    else {
      x[<number>index].className = x[0].className + " show";
    }
  }

  //pagination
  left() {
    if (this.currentPage > 1)
      this.currentPage -= 1;
  }
  right() {
    this.currentPage += 1;
  }


  //marking favorite
  onSelect(item: any, event: any) {
    let index = this.tableData.map((object: { name: any; }) => object.name).indexOf(item.name);
    if (event.currentTarget.checked) {
      this.tableData[index].favorite = true;
      this.store.dispatch(addItem());
    }
    else {
      this.tableData[index].favorite = false;
    }
    console.log(item);
  }

  favorite(flag: any) {
    if (flag == 0) {
      this.flag = 1;
      this.label = "Go Back";
    }
    else if (flag == 1) {
      this.flag = 0;
      this.label = "Click here to see favourite marked university";

    }
  }

}
