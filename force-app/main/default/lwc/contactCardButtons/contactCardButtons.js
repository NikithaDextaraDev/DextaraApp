import { LightningElement } from 'lwc';

export default class pcontactCardButtons extends LightningElement {
    previousHandler() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler() {
        this.dispatchEvent(new CustomEvent('next'));
    }
}
