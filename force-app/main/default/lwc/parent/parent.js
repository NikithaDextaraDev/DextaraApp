import { LightningElement } from "lwc";

export default class parent extends LightningElement {
  handleClick() {
    this.template
      .querySelectorAll("c-child")
      .forEach(element => {
        element.checkValidity();
      });
  }
}