
import { LightningElement, track, wire} from 'lwc';
import saveAccount from '@salesforce/apex/AccountTableController.saveAccountRecord';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import Phone_FIELD from '@salesforce/schema/Account.Phone';
import Industry_FIELD from '@salesforce/schema/Account.Industry';
import Type_FIELD from '@salesforce/schema/Account.Type';

export default class formvalidation extends LightningElement {
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
        let valid_name = /^[A-Za-z]+$/;
        if(name.value.match(valid_name)){
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
        var valid_phoneno = /^\d{10}$/; //CHECKING THE PHONE NUMBER WITH 10 DIGITS, AND ACCEPTS DIGITS ONLY
    //    var valid_phoneno = /^[\s()+-]*([0-9][\s()+-]*){10,14}$/;
        // var valid_phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;   
        if(phone.value.match(valid_phoneno)){
            this.accRecord.Phone = event.target.value;
            phone.setCustomValidity("");
        }
        else{
            phone.setCustomValidity("Please Enter a Valid Phone Number");
        }
        phone.reportValidity();
    }

    handleEmailChange(event){
        var email = this.template.querySelector(".accEmail");
        // var valid_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   //
        var valid_email = /^\w+([\.-]?\w+)*[@gmail.com]*(\.\w{2,3})+$/  //for gmail only
        if(email.value.match(valid_email)){
            // this.accRecord.Phone = event.target.value;
            email.setCustomValidity("");
        }
        else{
            email.setCustomValidity("Please Enter a Valid Email");
        }
        email.reportValidity();
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

    
    

}