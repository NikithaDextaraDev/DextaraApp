import { LightningElement } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import FAX_FIELD from '@salesforce/schema/Contact.Fax';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
export default class contactform extends LightningElement {
     Contact = CONTACT_OBJECT;
     Name = NAME_FIELD;
     Phone = PHONE_FIELD;
     Fax = FAX_FIELD;
     Email = EMAIL_FIELD;
    AddContact(evnt){
        var input= this.template.querySelector(".inputFirstName");
        var value = evnt.input.value;
        if(value === "")
        {
            input.setCustomValidity("field must be populated");
        } 
        input.reportValidity(); 
  }
}