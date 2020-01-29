import { LightningElement,track,wire } from 'lwc';
//import { getSObjectValue } from '@salesforce/apex';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chartjs';
import getAccountLifetimeSpending from '@salesforce/apex/lwcLifetimeSpendingController.getAccountLifetimeSpending';

/*const generateRandomNumber = () => {
    return Math.round(Math.random() * 100);
};*/
export default class Chartjs extends LightningElement {        
@track lifetimeAggResult;
@track error;
serviceAmount;
subcriptionAmount;        

@wire(getAccountLifetimeSpending) lifetimeAggregateResult({error,data}) {
    if (data) {                         
        this.lifetimeAggResult = data;
       // console.log('this.lifetimeAggResult: ' + this.lifetimeAggResult[0].Service);
        this.serviceAmount = this.lifetimeAggResult[0].StageName
        this.subcriptionAmount = this.lifetimeAggResult[0].LeadStatus;            
        this.error = undefined;
    } else if (error) {
        this.lifetimeAggResult = undefined;
        this.error = error;
       // console.log('Error: ' + this.error);
    }        
}
chart;
chartjsInitialized = false;

config = {
   // type: 'doughnut',        
    type: 'bar',
    data: {                        
        datasets: [
            {                    
                data: [
                    this.serviceAmount,
                    this.subcriptionAmount
                ],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                   
                ],
                label: 'Dataset 1'
            }
        ],
        labels: ['Stage', 'Lead Status']
    },
    options: {
        responsive: true,
        legend: {
            position: 'right'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
};

renderedCallback() {
    if (this.chartjsInitialized) {
        return;
    }
    this.chartjsInitialized = true;

    loadScript(this, chartjs)
        .then(() => {                
            const ctx = this.template
                .querySelector('canvas.donut')
                .getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
        })
        .catch(error => {
            this.error = error;
        });
}
} 