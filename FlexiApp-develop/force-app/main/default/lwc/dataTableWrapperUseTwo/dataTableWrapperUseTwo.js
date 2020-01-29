import { LightningElement, track, wire } from 'lwc';
import getAccountRecords from '@salesforce/apex/AccountTableController.getAccountRecordsDesc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class DataTableWrapperUseTwo extends LightningElement {

    @track myTwoAccountData;
    @track enableInfiniteLoading = true;
    @track initialRows = 15;
    @track currentCount = 15;
    @track totalRows = 0;
    @track tableLoadingState;

    @wire(getAccountRecords, { initialRows: '$initialRows' })
    contacts({ error, data }) {
        if (data) {
            this.totalRows = data.totalRecords;
            this.myTwoAccountData = data.accountsList;
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

}