import { LightningElement,track } from 'lwc';

export default class LwcMyHomeLayout extends LightningElement {
    // handleToggleSection(event){
    //     let scrTop = event.target.scrollTop;
    //     let oftop = this.template.querySelector("h3").offsetTop;
    //     let ht = this.template.querySelector("h3").height;
    //     // console.log(scrTop+'---'+oftop+'----');
    // }
    // renderedCallback(){
    //     window.onscroll = function() {
    //         // console.log('checked my render event on top->');
    //     }
    // }
    @track displayCondition = false;

    connectedCallback(){
        // console.log('home layout connected callback..false to true**');
        window.addEventListener('scroll',this.displayComponents.bind(this));
    }

    disconnectedCallback(){
        // console.log('inside disc call');
        window.removeEventListener('scroll',this.displayComponents);
    }

    displayComponents(){
        this.displayCondition = true;
    }

    renderedCallback(){

    }

}
