import { LightningElement, api, track} from 'lwc';
// import { CurrentPageReference } from 'lightning/navigation';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import getAccountRecords from '@salesforce/apex/AccountTableController.getAccountRecords';
import loadAccountRecords from '@salesforce/apex/AccountTableController.loadAccountRecords';
/* eslint-disable no-console */
export default class DataTableWrapperExample extends LightningElement {

    @api accountColumns = [
      {
        label : 'Name',
        fieldName : 'Name',
        type : 'text',
        // typeAttributes:{label:{fieldName:'Name'},target:'_blank'}
    },
    {
        label : 'Account Source',
        fieldName : 'AccountSource',
        type : 'text',
    },
    {
        label : 'Rating',
        fieldName : 'Rating',
        type : 'text',
    }
        ];


    @api
    get accountData(){
      return this._two;
    }


    set accountData(value) {
      // console.log('value in set after value '+JSON.stringify(value));
      this.setAttribute('two', value);
      this._two = value;
      this.setup();
    }

    @api
    get myData(){
      return this._two;
    }

    set myData(value) {
      // console.log('value in set after value 2'+JSON.stringify(value));
      this.setAttribute('two', value);
      this._two = value;
      this.setup();
    }


    // private
    @track _two;

    connectedCallback() {
      this.setup();
    }

    setup() {
      // console.log('hello from dataTable wrapper example');
    }

    renderedCallback(){
        
    }


   
    onLoadMoreHandler(){
      if(!(this.currentCount >= this.totalRows)){
        this.enableInfiniteLoading = false;
        this.tableLoadingState = true;
        // console.log('total number of rows----> '+this.totalRows+' current count '+this.currentCount);
        this.loadData()
          .then(result => {
            this.tableLoadingState = false;
            this.accountData = this.accountData.concat(result);
            this.enableInfiniteLoading = true;
          })
          .catch(error => {
             console.log('error in onloadif '+error);
          });
      }
      else{
        this.enableInfiniteLoading = false;
      }
    }

    loadData(){     
      return new Promise((resolve) => {        
        var limit = this.initialRows;
        var offset = this.currentCount;
        var totalRows = this.totalRows;  
        if(limit + offset > totalRows){
            limit = totalRows - offset;
        }  
      // console.log("limit "+limit+" offset "+offset+" totalrows "+totalRows);
            loadAccountRecords({ rowLimit: limit, rowOffset: offset })
            .then(data => {
              resolve(data);
              this.currentCount = this.currentCount + this.initialRows;
            })
            .catch(error => {
              console.log("promise error"+JSON.stringify(error));
            }); 
      });


    }

}