import { LightningElement, track, wire } from 'lwc';
import getAccountRecords from '@salesforce/apex/AccountTableController.getAccountRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class DataTableWrapperUseOne extends LightningElement {

    @track myAccountData;
    @track enableInfiniteLoading = true;
    @track initialRows = 15;
    @track currentCount = 15;
    @track totalRows = 0;
    @track tableLoadingState;

    @wire(getAccountRecords, { initialRows: '$initialRows' })
    contacts({ error, data }) {
        if (data) {
            this.totalRows = data.totalRecords;
            // this.myAccountData = {"krishna": data.accountsList,"wrapper_use_case": "one"};
            this.myAccountData = data.accountsList;
            this.enableInfiniteLoading = true;
        } else if (error) {
          this.dispatchEvent(
            new ShowToastEvent({
              message: String(error),
              variant: "error",
            })
          );
        }
      }

}