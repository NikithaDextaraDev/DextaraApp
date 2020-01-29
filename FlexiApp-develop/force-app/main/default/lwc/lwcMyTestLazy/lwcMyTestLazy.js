import { LightningElement,track,wire } from 'lwc';
import fetchContact from '@salesforce/apex/ContactsList.fetchContact';
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
  }]

export default class LwcMyTestLazy extends LightningElement {
    @track results=[];
    @track columns = dataTablecolumns;
    @track sortBy='FirstName';
    @track sortDirection='asc';
    //since we have used the dynamic wiring, 
    //the list is automatically refreshed when the sort direction or order changes.


    @wire(fetchContact,{field : '$sortBy',sortOrder : '$sortDirection'}) contactList({error, data}) {
      if(data)
        this.results=Object.assign([], data);
      if(error)
        console.log(error);
    }

    
    updateColumnSorting(event){
      let fieldName = event.detail.fieldName;
      let sortDirection = event.detail.sortDirection;
      //assign the values. This will trigger the wire method to reload.
      this.sortBy = fieldName;
      this.sortDirection = sortDirection;
    }
}


