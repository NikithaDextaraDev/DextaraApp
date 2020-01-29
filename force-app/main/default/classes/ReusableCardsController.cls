public with sharing class ReusableCardsController {

   @AuraEnabled(cacheable=true)
public static QueryDetails getsObjectList(String sobj, String fields, Integer LIM, Integer offset){
String ObjType = sobj;
String fieldsstring = '';
Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
Schema.SObjectType objectSchema = schemaMap.get(ObjType);
Map<String, Schema.SObjectField> fieldMap = objectSchema.getDescribe().fields.getMap();
List<String> StringList = Fields.split(',');

List<String> FLs = new List<String>();
List<String> FTs = new List<String>();
 for(String s : StringList) {
        FLs.add(fieldMap.get(s).getDescribe().getLabel());
        FTs.add(String.Valueof(fieldMap.get(s).getDescribe().getType()).toLowercase());
        }
/*
for(String s : Fields){
fieldsstring = fieldsstring + s;
}
*/

system.debug('fields--------->>>>>' +fields);
String query = 'Select ' + fields + ' From ' + sobj + ' LIMIT ' + LIM + ' offset ' + offset;
system.debug('query query' + query);
String CountQuery = 'Select count(Id) RecCount From ' + sobj;

List<sObject> sObjectCount = Database.query(CountQuery);

            Integer sCount;

        for(sObject so : sObjectCount){
            sCount = (Integer) so.get('RecCount');
        }

        System.debug('LIM------->>>>>' + LIM);

        system.debug('sCount------->>>>>>' + sCount);



List<sObject> sObjectList = Database.query(Query);
// system.debug('sObjectList----->>>>>' +sObjectList);

QueryDetails QD = new QueryDetails(FLS,FTS,sObjectList,sCount);
return QD;

}

/*
@AuraEnabled(cacheable=true)
    Public static List<sObject> getsObjectWithOffset(String sobj, String Fields,  Integer LIM, Integer offset){
       List<sObject> sObjectList = new List<sObject>();
        List<sObject> sObjectCount = new List<sObject>();

        String Query = 'Select ' + Fields + ' From ' + sobj +  ' LIMIT ' + LIM + ' offset ' + offset;
        system.debug('Query----->>>>>' + Query);

        String CountQuery = 'Select count(Id) RecCount From ' + sobj;

        sObjectList = Database.query(Query);
        system.debug('sObjectList----->>>>>' + sObjectList);
        sObjectCount = Database.query(CountQuery);
        system.debug('sObjectCount------>>>>>>>' + sObjectCount);

        Integer sCount;

        for(sObject so : sObjectCount){
            sCount = (Integer) so.get('RecCount');
        }

        System.debug('LIM------->>>>>' + LIM);

        system.debug('sCount------->>>>>>' + sCount);

        
        
        return sObjectList;
    }

    */

 Public class QueryDetails {
    @AuraEnabled
        public List<String> FieldLabels {get;set;}
        @AuraEnabled
        Public List<String> FieldTypes {get;set;}
        @AuraEnabled
        Public List<sObject> FieldValueSobjectList {get;set;}
        @AuraEnabled 
        Public Integer RecordCount {get;set;}
 Public QueryDetails(List<String> Lbls, List<String> Types, List<sObject> FieldValLst, Integer RecCount){
    this.FieldLabels = Lbls;
    this.FieldTypes = Types;
    this.FieldValueSobjectList = FieldValLst;
    this.RecordCount = RecCount;
 }
 }
}