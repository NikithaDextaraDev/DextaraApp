import { LightningElement, track, wire} from 'lwc';
import saveAccount from '@salesforce/apex/AccountTableController.saveAccountRecord';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import Phone_FIELD from '@salesforce/schema/Account.Phone';
import Industry_FIELD from '@salesforce/schema/Account.Industry';
import Type_FIELD from '@salesforce/schema/Account.Type';

export default class RecordCreation extends LightningElement {
    @track error;

    @wire(CurrentPageReference)pageRef;

    // this object have record information
    @track accRecord = {
        Name : NAME_FIELD,
        Industry : Industry_FIELD,
        Phone : Phone_FIELD,
        Type : Type_FIELD
    };


    handleNameChange(event) {
        // this.accRecord.Name = event.target.value;
        // window.console.log('Name ==> '+this.accRecord.Name);
        var name = this.template.querySelector(".accName");
        if(name.value){
            this.accRecord.Name = event.target.value;
            name.setCustomValidity("");
        }
        else{
            name.setCustomValidity("Please Enter a Valid Name");
        }
        name.reportValidity();
    }

    handlePhoneChange(event) {
    //     this.accRecord.Phone = event.target.value;
    //     window.console.log('Phone ==> '+this.accRecord.Phone);
        var phone = this.template.querySelector(".accPhone");
        if(phone.value){
            this.accRecord.Phone = event.target.value;
            phone.setCustomValidity("");
        }
        else{
            phone.setCustomValidity("Please Enter a Valid Phone Number");
        }
        phone.reportValidity();
    }

    handleTypeChange(event) {
    //     this.accRecord.Type = event.target.value;
    //     window.console.log('Type ==> '+this.accRecord.Type);
        var type = this.template.querySelector(".accType");
        if(type.value){
            this.accRecord.Type = event.target.value;
            type.setCustomValidity("");
        }
        else{
            type.setCustomValidity("Please Enter a Valid Account Type");
        }
        type.reportValidity();
    }

    handleIndustryChange(event) {
    //     this.accRecord.Industry = event.target.value;
    //     window.console.log('Industry ==> '+this.accRecord.Industry);
        var change = this.template.querySelector(".accInd");
        if(change.value){
            this.accRecord.Industry = event.target.value;
            change.setCustomValidity("");
        }
        else{
            change.setCustomValidity("Please Enter a Valid Account Industry");
        }
        change.reportValidity();
    }


    handleSave() {

        saveAccount({objAcc: this.accRecord})
        .then(result => {
            // Clear the user enter values
            this.accRecord = {};

            window.console.log('result ===> '+result);
            this.error="";
            // Show success messsage
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Account Created Successfully!!',
                variant: 'success'
            }),);
        })
        .catch(error => {
            this.error = "Please Enter the Information in the Given Fields";
            // console.log('error'+JSON.stringify(error));
        });
    }

    
    @track ref;
    renderedCallback(){
        console.log('rendered callback called in lazy record creation');
        // window.addEventListener('scroll',this.getRemainingData);      
        // console.log('page ref 1->'+this.pageRef+"-"+JSON.stringify(this.pageRef));
        // this.ref = this.pageRef;
        // console.log('my ref->'+this.ref+'---'+JSON.stringify(this.ref));
        // window.addEventListener('scroll',function(){
        // console.log('page ref 2->'+this.pageRef+"-"+JSON.stringify(this.pageRef)+'---'+this.ref+JSON.stringify(this.ref));
        //     fireEvent(this.pageRef, 'getDataOnScroll'); 
        // });

        // const contact = this.template.querySelector('.contact_form_div');
        // contact.addEventListener('scroll',function(){
        //     console.log('page ref ---->'+this.pageRef+"-"+JSON.stringify(this.pageRef));
        //     fireEvent(this.pageRef, 'getDataOnScroll'); 
        // });

    }

    // PubG(){
    //     // fireEvent(this.pageRef,'pubG');
    //     fireEvent(this.pageRef, 'getDataOnScroll');
    // }

    // getRemainingData(){
    //     console.log('im here to get the data'+this.pageRef);
    //     fireEvent(this.pageRef, 'getDataOnScroll');
    // }

    // handleClearTable(){
    //     fireEvent(this.pageRef, 'clearTable');
    // }


    constructor(){
        super();
        console.log('constructor callback called in lazy record creation');
    }

    connectedCallback(){
        console.log('connected callback called in lazy record creation');
    }

    disconnectedCallback(){
        console.log('disconnected callback called in lazy record creation');
    }

    errorCallback(){
        console.log('error callback called in lazy record creation');
    }
  



}