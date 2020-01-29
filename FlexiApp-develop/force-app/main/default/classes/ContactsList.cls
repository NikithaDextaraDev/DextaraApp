public with sharing class ContactsList {
    @AuraEnabled (Cacheable=true)
    public static List<Contact> fetchContactLocal(){
        return [SELECT Id, FirstName, LastName 
                FROM CONTACT Order By FirstName ASC];
    }
    @AuraEnabled (Cacheable=true)
    public static List<Contact> fetchContact(String field, String sortOrder){
        return Database.query('SELECT Id, FirstName, LastName FROM Contact ORDER BY '+field+' '+sortOrder);
    }
}