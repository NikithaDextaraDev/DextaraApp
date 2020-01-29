import { LightningElement, api, track } from 'lwc';
import cardImage from '@salesforce/resourceUrl/cardImage'
export default class iterativeCards extends LightningElement {
  

   myImage = cardImage;

    @api
    get contactsListData(){
      return this.contacts;
    }

    set contactsListData(value) {
      // console.log('value in set after value 2'+JSON.stringify(value));
      this.setAttribute('contacts', value);
      this.contacts = value;
      this.setup();
    }


    // private
    @track contacts;

    connectedCallback() {
      this.setup();
     }

     setup() {
     //console.log('hello ........');
     }
   }    


