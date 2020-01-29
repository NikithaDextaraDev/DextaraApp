import { LightningElement, api, track } from 'lwc';

export default class contactFormReuse extends LightningElement {


    @api
    get userInformation(){
      return this.user_info;
    }

    set userInformation(value) {
      // console.log('value in set after value 2'+JSON.stringify(value));
      this.setAttribute('user_info', value);
      this.user_info = value;
      this.setup();
    }


    // private
    @track user_info;

    connectedCallback() {
      this.setup();
    }

    setup() {
      // console.log('hello from dataTable wrapper example');
    }

}
