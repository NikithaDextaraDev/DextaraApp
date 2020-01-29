import { LightningElement,api,wire,track } from 'lwc';
import opportunityAggregation from '@salesforce/apex/OpportunityDataService.aggregateOpportunities'
export default class CustomChart extends LightningElement {
  @api recordId; 
  @track opportunityData=[];
  
  @wire(opportunityAggregation) opptyData({error, data}){
    if(data){
      let oppData = Object.assign({},data);
      /*
        format
        [['Closed Won',2],['Closed Lost',4],['Negotiation',5]];
      */
    //  console.log('op data '+JSON.stringify(oppData));
      for(let key in oppData){
        if(oppData.hasOwnProperty(key)){
          let tempData=[key, oppData[key]];
          this.opportunityData.push(tempData);
        }
      }
    }
    if(error)
      console.log(error);
  }

  constructor(){
      super();
      console.log('constructor callback called in lazy custom chart');
  }

  connectedCallback(){
      console.log('connected callback called in lazy custom chart');
  }

  disconnectedCallback(){
      console.log('disconnected callback called in lazy custom chart');
  }

  errorCallback(){
      console.log('error callback called in lazy custom chart');
  }

  renderedCallback(){
    console.log('rendered callback in lazy custom chart');
  }


}