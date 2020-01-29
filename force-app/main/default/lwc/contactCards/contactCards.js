import { LightningElement, track, wire } from 'lwc';
import getContactsList from '@salesforce/apex/ContactController.getContactList';
/* eslint-disable no-console */
export default class ContactIterativeCardInfo extends LightningElement {
    @track contactsList;

    @wire(getContactsList)conactslist(result){
        if(result){
            console.log('result data..'+JSON.stringify(result));
            this.contactsList = result.data;
        }
        else{
            console.log('error called');
        }
    }
}