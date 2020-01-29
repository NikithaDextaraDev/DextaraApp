import { LightningElement, api, wire, track} from 'lwc';
import getsObjectList from '@salesforce/apex/ReusableCardsController.getsObjectList';


export default class GenericCards extends LightningElement {

    @api sObject = this.sObject;
    @api Fields = this.Fields;
    @track act_data;
   // @api LIMIT = this.LIMIT;
    @track paginationRange = [];
    @track totalRecords;
    @track isLoaded = false;
    @track TotalPageNumbers;
 
    @track value = '4';
    @track offset = '0';
    @track PageNumber = '1';
    @track startingrecord='1';
    @track endingrecord='4';
    @track HidePreviousButton="true";

    


    handleNext(event) {
        this.offset = parseInt(this.offset) + parseInt(this.value);
        this.PageNumber = parseInt(this.PageNumber) + 1;
        this.isLoaded = false;
        this.startingrecord = parseInt(this.startingrecord) + parseInt(this.value);
        this.endingrecord = parseInt(this.endingrecord) + parseInt(this.value);
        this.HidePreviousButton= false;
        
        if(this.PageNumber == this.TotalPageNumbers)
        {
            this.HideNextButton = true;
        }
}


handlePrevious(event){
    if(parseInt(this.offset) !== 0){
    this.offset = parseInt(this.offset) - parseInt(this.value);
    this.isLoaded = false;
    this.HideNextButton = false;
    }
     if(this.offset==0)
     {
         this.HidePreviousButton=true;
     }
    this.PageNumber = parseInt(this.PageNumber) - 1;
    this.startingrecord = parseInt(this.startingrecord) - parseInt(this.value);
    this.endingrecord = parseInt(this.endingrecord) - parseInt(this.value);


    if(parseInt(this.PageNumber) === 0){
        this.offset = 0;
        this.PageNumber = 1;
    }
}



    @wire (getsObjectList, {sobj : '$sObject', fields : '$Fields', LIM : '$value', offset : '$offset'}) getsObjectList({data,error}){
        if(data){
            console.log('data Required All---->>>>' + JSON.stringify(this.data));
            var Fields = this.Fields;    
            console.log('Fields----->>>>>' + Fields);  
            var FieldLabels = data.FieldLabels;
            console.log('FieldLabels------' + FieldLabels);
            var FieldTypes = data.FieldTypes;
            console.log('FieldTypes------>>>>>' +FieldTypes);

            this.totalRecords = data.RecordCount;
            this.TotalPageNumbers = Math.ceil(parseInt(this.totalRecords)/parseInt(this.value));
            console.log('this.totalRecords------' + this.totalRecords);

            this.act_data = data.FieldValueSobjectList;  
            console.log('act_data------>>>>>' +act_data);
            this.isLoaded = true;
            

            
                for(let i=0;i<FieldLabels.length;i++){
                       let lab = {label : FieldLabels[i], fieldName : arr[i], type : FieldTypes[i]};
                    data.push(lab);
                }
        // this.data = act_data;
            }
            if(error){
                console.log(error);
            }
    
        }
        constructor(){
            super();
          //  if(this.LIMIT === undefined){
            //    this.LIMIT = "";
           // }
        }
    }


    
        
       
    
    