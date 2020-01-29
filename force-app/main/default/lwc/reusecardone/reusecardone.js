import { LightningElement, track, wire } from 'lwc';
import ContactRecords from '@salesforce/apex/AccountTableController.ContactRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';  

export default class Reusecardone extends LightningElement {
@track MyRecordInfo;
@track recordId;
@wire (ContactRecords,{ recid: '$recordId'})
contacts({ error, data }) {
    if (data) {
        this.MyRecordInfo = data.conrec;
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