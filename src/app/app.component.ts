import { AfterViewInit, Component ,ViewChild, ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs'
import { map, startWith } from 'rxjs/operators';
import * as _ from 'underscore';
import { Store } from '@ngrx/store';
import { addItem ,removeItem} from './StateManage/addFav.action';
import { State } from './StateManage/addFav.reducer'


const CACHE_API_CALL = "httpCallCache"

export interface favStatus {
  status: string;
  favUniversityList: universityDetails[];
}

export interface universityDetails {
  name: string;
  country: string;
  alpha_two_code: string;
  web_pages: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  @ViewChild("maxPage", { read: ElementRef }) maxPage: ElementRef | undefined;
  @ViewChild("fabMaxPage", { read: ElementRef }) fabMaxPage: ElementRef | undefined;
  
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
  favCurrentPage=1;
  totalPages = 1;
  fabTotalPages=1;
  actualData: any = [];
  flag = 0;
  existInFav: boolean = true;
  favData: any = [];
  favUniversityName: any = [];
  public favStatus: favStatus | undefined;

  label = "Click here to see favourite marked university";
  add$: Observable<[]> | undefined;


  constructor(private http: HttpClient,
    private store: Store<{ add: State }>
  ) {

    //api call
     this.result = this.http.get<any>("https://raw.githubusercontent.com/MoumitaPandit/Assignment/main/src/app/Data/search.json");

    // this.result = this.http.get<any>("http://universities.hipolabs.com/search");
   

    //caching api call to localstorage
    this.result.subscribe((next: any) => {
      localStorage[CACHE_API_CALL] = JSON.stringify(next);
    })

    //fetching the data from local storage
    this.result = this.result.pipe(
      startWith(JSON.parse(localStorage[CACHE_API_CALL] || '[]'))
    )
  }
  ngAfterViewInit(): void {
    this.totalPages= parseInt(this.maxPage?.nativeElement.innerHTML.split('of')[1]);
    this.fabTotalPages=parseInt(this.fabMaxPage?.nativeElement.innerHTML.split('of')[1]);
  }

  ngOnInit(): void {

    this.favData = this.fetchDataFromStore();
    for(let i=0;i<this.favData;i++)
    {
      this.favUniversityName.push(this.favData[i].name);
    }
    console.log(this.favUniversityName);
  }

  
  //marking favorite
  onSelect(item: any, event: any) {
 
    if (event.currentTarget.checked) {
      
      let x = this.favData.map((object: { name: any; }) => object.name).indexOf(item.name);
      if (x == -1) {
        this.store.dispatch(addItem({
          name: item.name,
          country: item.country,
          alpha_two_code: item.alpha_two_code,
          web_pages: item.web_pages[0]
        }));

        this.favUniversityName.push(item.name)
      }

    }
    else {
      let x = this.favData.map((object: { name: any; }) => object.name).indexOf(item.name);
      this.store.dispatch(removeItem({
        //  index:x
        index:item.name
      }));
      this.fetchDataFromStore();
    }
    
  }

    fetchDataFromStore() {
     this.store.select('add').subscribe(
      x => {
        console.log(x);
         this.favData = x.favStatus.favUniversityList;
       
      }
    )
    return this.favData;

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
    if(this.flag==0)
    {
      if (this.currentPage > 1)
      this.currentPage -= 1;
    }
    else if(this.flag==1)
    {
      if (this.favCurrentPage > 1)
      this.favCurrentPage -= 1;
    }
   
  }
  right() {
    if(this.flag==0)
    {
      if(this.currentPage < this.totalPages){
        this.currentPage += 1;
      }
    }
    else if(this.flag==1)
    {
      if (this.favCurrentPage < this.fabTotalPages)
      this.favCurrentPage += 1;
    }
   
    
  }




  favorite(flag: any) {
    if (flag == 0) {
      this.flag = 1;
      this.label = "Go Back";
      // this.fetchDataFromStore();
    }
    else if (flag == 1) {
      this.flag = 0;
      this.label = "Click here to see favourite marked university";

    }
  }

}
