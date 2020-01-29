import {LightningElement, track} from 'lwc';
import saveAccountRecord from '@salesforce/apex/AccountTableController.saveAccountRecord';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import Phone_FIELD from '@salesforce/schema/Account.Phone';
import Industry_FIELD from '@salesforce/schema/Account.Industry';
import Type_FIELD from '@salesforce/schema/Account.Type';
/* eslint-disable no-console */
export default class CustomValidations extends LightningElement {
    @track error;

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
        let inputValue = event.target.value;
        let name = this.template.querySelector(".accName");
        if(inputValue.indexOf('@')>=0) {
            //set an error
            name.setCustomValidity("Please Don't include '@' in name");
            name.reportValidity();
       }else {         
            //reset an error
            name.setCustomValidity('');
            name.reportValidity(); 
          
       }
        //  if(name.value){
        //      this.accRecord.Name = event.target.value;
        //      name.setCustomValidity("");
        //  }
        //  else{
        //      name.setCustomValidity("Please Enter a Valid Name");
        //  }
        //  name.reportValidity();
     }
     
    handlePhoneChange() {
      
     
        let phone = this.template.querySelector(".accPhone");
        let phoneRegexFormat =/^[0-9]\d{10}$/;
        
        if(phone.test(phoneRegexFormat)) {
            //set the custom error message
            console.log('check failure');
            phone.setCustomValidity("Enter valid phone number");
        }else{
            //reset the error message
            phone.setCustomValidity("");
            console.log('check success');
        }
    }
    //handlePhoneChange() {
    //     this.accRecord.Phone = event.target.value;
    //     window.console.log('Phone ==> '+this.accRecord.Phone);
  /*  let phoneRegexFormat = /^\d{10}$/;
    let phone = this.template.querySelector(".accPhone"); */
    
    //    var phone = this.template.querySelector(".accPhone");
    //     if(phone.value){
    //         this.accRecord.Phone = event.target.value;
    //         phone.setCustomValidity("");
    //     }
    //     else{
    //         phone.setCustomValidity("Please Enter a Valid Phone Number");
    //     }
    //     phone.reportValidity();
        
      /*  if(!phone(phoneRegexFormat)) {
            //set the custom error message
            phone.setCustomValidity("Enter valid phone number");
         }else{
            //reset the error message
            phone.setCustomValidity("");
         }
    }*/

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

        saveAccountRecord({objAcc: this.accRecord})
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
            console.log('error'+JSON.stringify(error));
           // this.error="error";
        });
    }
}