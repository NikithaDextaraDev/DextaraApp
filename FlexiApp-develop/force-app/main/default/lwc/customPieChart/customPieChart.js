import { LightningElement, api,track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import C3 from '@salesforce/resourceUrl/c3';
import D3 from '@salesforce/resourceUrl/d3';
import chartjs from '@salesforce/resourceUrl/chart';

// import WhoWeAre from '@salesforce/resourceUrl/whoweare';

// const generateRandomNumber = () => {
//   return Math.round(Math.random() * 100);
// };

export default class CustomPieChart extends LightningElement {

  @api chartData;
  @track chart;
  @track loadingInitialized=false;
  librariesLoaded = false;

  @track error;
  chart;
  @track bar;
  chartjsInitialized = false;

  // @track chartValues;
  // chartValues = [
  //   generateRandomNumber(),
  //   generateRandomNumber(),
  //   generateRandomNumber(),
  //   generateRandomNumber(),
  //   generateRandomNumber()
  // ];

  // @track chartLabels;
  // chartLabels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue']

  @track krishna;
  krishna = {"Jan": 45, "Feb": 40,"March": 45,"April":40,"May":45,
  "June": 40, "July": 36,"Aug": 45,"Sept":40,"Oct":45,"Nov": 50,"Dec":60};

  @track myKeys;
  myKeys = Object.keys(this.krishna);

  @track myValues;
  myValues = Object.values(this.krishna);
  
  config = {
    type: 'line',
    data: {
        datasets: [
            {
                data: this.myValues,
                // backgroundColor: [
                //     'rgb(255, 99, 132)',
                //     'rgb(255, 159, 64)',
                //     'rgb(255, 205, 86)',
                //     'rgb(75, 192, 192)',
                //     'rgb(54, 162, 235)'
                // ],
                fillColor : "rgba(172,194,132,0.4)",
                strokeColor : "#ACC26D",
                pointColor : "#fff",
                pointStrokeColor : "#9DB86D",
                label: 'Annual Data'
            }
        ],
        labels: this.myKeys
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

bar_config = {
  type: 'bar',
  data: {
      datasets: [
          {
              data: this.myValues,
              fillColor : "rgba(73,188,170,0.4)",
              strokeColor : "rgba(72,174,209,0.4)",
              label: 'Annual Data'
          }
      ],
      labels: this.myKeys
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
    if(this.librariesLoaded)
      this.drawChart();
      //this.librariesLoaded = true;
    if(!this.loadingInitialized) {
      this.loadingInitialized = true;
      /*
        We have added the a parameter t and assigned the current time to it. 
        This is done to make sure the cache is refrehed everytime the scripts are loaded.
        If we do not do this then there is an issues if we add multiple charts in a single component.
      */

      Promise.all([
        // loadScript(this, D3 + '/d3.min.js?t='+new Date().getTime()),
        loadScript(this, D3 + '/d3/d3.v5.min.js'),
        loadScript(this, C3 + '/c3/c3.min.js?t='+new Date().getTime()),
        loadStyle(this, C3 + '/c3/c3.min.css?t='+new Date().getTime()),
        loadScript(this, chartjs)
      ])
      .then(() => {
        this.librariesLoaded = true;

        this.drawChart();

        const canvas = document.createElement('canvas');
        this.template.querySelector('div.chart').appendChild(canvas);
        const ctx = canvas.getContext('2d');
        this.chart = new window.Chart(ctx, this.config);

        const barcanvas = document.createElement('canvas');
        this.template.querySelector('div.bar').appendChild(barcanvas);
        const barctx = barcanvas.getContext('2d');
        this.bar = new window.Chart(barctx, this.bar_config);
        // console.log('calling charts data'+this.chartData);
      })
      .catch(error => {
        console.log('The error ', error);
      });

    }

  }
  drawChart() {    
    this.chart = c3.generate({
      bindto: this.template.querySelector('div.c3'),
      data: {
        columns: this.chartData,
        type : 'donut'
      },
      donut : {
        title : 'Opportunities',
        label: {
          format: function(value, ratio, id) {
            return value;
          }
        }
      }
    });
  }

  //destroy the chart once the elemnt is destroyed
  disconnectedCallback() {
    this.chart.destroy();
  }

}