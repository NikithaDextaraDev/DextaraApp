import { LightningElement, track, api, wire} from 'lwc';
// import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccountRecords from '@salesforce/apex/AccountTableController.getAccountRecords';
import loadAccountRecords from '@salesforce/apex/AccountTableController.loadAccountRecords';

export default class LwcLazyTest extends LightningElement {

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
    @track accountData;
    @track enableInfiniteLoading = true;
    @track initialRows = 5;
    @track currentCount = 5;
    @track totalRows = 0;
    // @track loadOffset = 1;
    @track tableLoadingState;

    @wire(getAccountRecords, { initialRows: '$initialRows' })
    contacts({ error, data }) {
        if (data) {
            this.totalRows = data.totalRecords;
            this.accountData = data.accountsList;
            this.enableInfiniteLoading = true;
        } else if (error) {
          this.dispatchEvent(
            new ShowToastEvent({
              message: String(error),
              variant: "error",
            })
          );
          // console.log("error "+JSON.stringify(error));
        }
      }

    constructor(){
      super();
      console.log('constructor called in lazy datatable');
    }
    connectedCallback() {
        console.log('connected callback called in lazy datatable');
    }

    // // render(){
    // //   console.log('render called..');
    // // }

    disconnectedCallback() {
      console.log('disconnected callback in lazy datatable');
    }

    renderedCallback(){
      console.log('render callback called in lazy datatable');
    }

    errorCallback(){
      console.log('error callback called in lazy datatable');
    }

    onLoadMoreHandler(){
      if(!(this.currentCount >= this.totalRows)){
        this.enableInfiniteLoading = false;
        this.tableLoadingState = true;
        // console.log('total number of rows--> '+this.totalRows+' current count '+this.currentCount);
        this.loadData()
          .then(result => {
            this.tableLoadingState = false;
            this.accountData = this.accountData.concat(result);
            this.enableInfiniteLoading = true;
          })
          .catch(error => {
            // console.log('error in onloadif '+error);
          });
      }
      else{
        this.enableInfiniteLoading = false;
      }
    }

    loadData(){     
      return new Promise((resolve, reject) => {        
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
              // console.log("promise error"+JSON.stringify(error));
            }); 
      });


    }

}