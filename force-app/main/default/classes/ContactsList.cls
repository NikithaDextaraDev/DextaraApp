public with sharing class ContactsList {
    @AuraEnabled (Cacheable=true)
    public static List<Contact> fetchContactLocal(){
        return [SELECT Id, FirstName, LastName 
                FROM CONTACT Order By FirstName ASC limit 9];
    }

    @AuraEnabled(cacheable=true)
    public static Integer getContactsCount(){
        
        return [SELECT COUNT() FROM Contact];
    }  



    @AuraEnabled (Cacheable=true)
    public static List<Contact> fetchContact(String field, String sortOrder, Integer rowLimit,Integer rowOffset)
    {
        // return Database.query('SELECT Id, FirstName, LastName, Email, Phone FROM Contact ORDER BY '+field+' '+sortOrder+' LIMIT :pageSize OFFSET :skipRecords);
       // return [SELECT ID,Name,Rating,AccountSource FROM Account ORDER BY Name ASC LIMIT :rowLimit OFFSET :rowOffset];
    }

}
