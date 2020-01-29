import {LightningElement,track,wire } from 'lwc';
//import fetchContact from '@salesforce/apex/ContactsList.fetchContact';
import retrieveContacts from '@salesforce/apex/ContactController.retrieveContacts';
// import getContactsCount from '@salesforce/apex/ContactsList.getContactsCount ';
/* eslint-disable no-console */
const actions = [
  { label: 'Open Flow', name: 'flow_details'}
  // , 
  // { label: 'Edit', name: 'edit'}, 
  // { label: 'Delete', name: 'delete'}
];

const dataTablecolumns = [{
    label: 'First Name', 
    fieldName: 'FirstName',
    sortable : true, 
    type: 'text'
  },
  {
    label : 'Last Name',
    fieldName : 'LastName',
    type : 'text',
    sortable : true
  },
  {
    label: 'Email',
    fieldName: 'Email',
    type: 'Email',
    sortable: true
  },
  {
    label: 'Phone',
    fieldName: 'Phone',
    type: 'phone',
    sortable: true
  },
  {
    type: 'button',
    typeAttributes: {
        rowActions: actions,
        menuAlignment: 'right',
        label: 'View Details',
        title: 'View Details',
        name: 'viewDetails',
        value: 'viewDetails',
        variant: 'brand',
        class: 'scaled-down'
    }
  }
]

export default class LwcMyTestLazy extends LightningElement {
  
    @track results=[];
    @track columns = dataTablecolumns;
    @track sortBy='FirstName';
    @track sortDirection='asc';
    @track page = 1; 
    @track items = []; 
    @track data = []; 
    @track columns; 
    @track startingRecord = 1; 
    @track endingRecord = 0;
    @track pageSize = 5; 
    @track totalRecountCount = 0; 
    @track totalPage = 0;
    
    
    @wire(retrieveContacts)
    wiredContacts({ error, data }) {
        if (data) {
          this.items = data;
          this.totalRecountCount = data.length;
          this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
          this.data = this.items.slice(0,this.pageSize); 
          this.endingRecord = this.pageSize;
          this.columns =columns;

          this.error = undefined;
      } else if (error) {
          this.error = error;
          this.data = undefined;
      }
  }

  
  previousHandler() {
      if (this.page > 1) {
          this.page = this.page - 1; 
          this.displayRecordPerPage(this.page);
      }
  }

 
  nextHandler() {
      if((this.page<this.totalPage) && this.page !== this.totalPage){
          this.page = this.page + 1; 
          this.displayRecordPerPage(this.page);            
      }             
  }

 
  displayRecordPerPage(page){

      
      this.startingRecord = ((page -1) * this.pageSize) ;
      this.endingRecord = (this.pageSize * page);

      this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                          ? this.totalRecountCount : this.endingRecord; 

      this.data = this.items.slice(this.startingRecord, this.endingRecord);

      
      this.startingRecord = this.startingRecord + 1;
  }    
}
    
          