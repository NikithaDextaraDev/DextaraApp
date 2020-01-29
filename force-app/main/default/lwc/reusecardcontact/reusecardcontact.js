import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import getUserInfo from '@salesforce/apex/AccountTableController.ContactRecords';
/* eslint-disable no-console */
const fields = [
    'Contact.Name',
    'Contact.Title',
    'Contact.Phone',
    'Contact.Email'
];  

export default class reusecardcontact extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    contact;

    @wire(getUserInfo,{recordId: '$recordId'}) contact_one;

    get name() {
        return this.contact.data.fields.Name.value;
    }

    get title() {
        return this.contact.data.fields.Title.value;
    }

    get phone() {
        return this.contact.data.fields.Phone.value;
    }

    get email() {
        return this.contact.data.fields.Email.value;
    }

    renderedCallback(){
        console.log('contact info----'+JSON.stringify(this.contact.data));
    }

}