import { LightningElement} from 'lwc';

export default class errorhandling extends LightningElement {   
    handleValidation() {
        const allValid = [...this.template.querySelectorAll('.validValue')]
            .reduce((validSoFar, inputCmp) => {
                        inputCmp.reportValidity();
                        return validSoFar && inputCmp.checkValidity();
            }, true);
        if (allValid) {
            //Submit information on Server
        } else {
            allValid.setCustomValidity("Please fill required and update all invalid form entries");
            //alert('Please fill required and update all invalid form entries');
        }
    } 
    handleCustomValidationFirstName(event) {
        let inputValue = event.target.value;
        let inputFirstName=this.template.querySelector(".inputFirstName"); 
        if(inputValue.indexOf('@')>=0) {
             //set an error
            inputFirstName.setCustomValidity("Please Don't include '@' in First name");
            inputFirstName.reportValidity();
        }else {         
             //reset an error
            inputFirstName.setCustomValidity('');
            inputFirstName.reportValidity(); 
           
        }
    }
    handleCustomValidationLastName(event) {
        let inputValue = event.target.value;
        let inputLastName=this.template.querySelector(".inputLastName"); 
        if(inputValue.indexOf('@')>=0) {
             //set an error
            inputLastName.setCustomValidity("Please Don't include '@' in Last name");
            inputLastName.reportValidity();
        }else {         
             //reset an error
            inputLastName.setCustomValidity('');
            inputLastName.reportValidity(); 
           
        }
    }
}