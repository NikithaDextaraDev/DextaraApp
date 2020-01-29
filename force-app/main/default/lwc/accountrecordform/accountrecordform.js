import {LightningElement,api}from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Contact';
import 	Name from '@salesforce/schema/Account.Name';
import Website from '@salesforce/schema/Account.Website';
import 	Fax from '@salesforce/schema/Account.Fax';
import Phone from '@salesforce/schema/Account.Phone';
/* eslint-disable no-console */
export default class accountrecordform extends LightningElement {
    @api recordId ;
    accountObject = ACCOUNT_OBJECT;
     myFields = [Name,Website,Fax,Phone];
     handleSubmit(event) {
        console.log(event.detail);
    }
    handleSuccess(event) {
        console.log('Record iD' + event.detail.id);
 
    }
}