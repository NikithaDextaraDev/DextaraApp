import { LightningElement,track,wire } from 'lwc';
import fetchContact from '@salesforce/apex/ContactsList.fetchContact';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

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

export default class PageLazyDataLoad extends LightningElement {
    @track results=[];
    @track columns = dataTablecolumns;
    @track sortBy='FirstName';
    @track sortDirection='asc';

    @wire(CurrentPageReference)pageRef;
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

    // connectedCallback() {
    //     registerListener('getDataOnScroll', this.getScrData, this);
    // }

    // disconnectedCallback() {
    //     unregisterAllListeners(this);
    // }

    // getScrData(){
    //     console.log('subscriber event called...');
    // }

}


