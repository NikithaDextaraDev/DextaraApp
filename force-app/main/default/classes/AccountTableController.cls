public class AccountTableController {
    
    //To return initial account records
    @AuraEnabled(cacheable=true)
    public static AccountWrapper getAccountRecords(Integer initialRows){
        AccountWrapper accountWrapper= new AccountWrapper();
        try{
            accountWrapper.accountsList = [SELECT ID,Name,Rating,AccountSource FROM Account ORDER BY Name ASC LIMIT :initialRows OFFSET 0];
            accountWrapper.totalRecords = [SELECT COUNT() FROM Account];
            accountWrapper.message = 'Account records are loaded';
            accountWrapper.success = true;
        }
        catch(Exception e){
            accountWrapper.message = e.getMessage();
            accountWrapper.success = false;
        }
        return accountWrapper;
    }



//      @AuraEnabled
//   public static List<Contact> getContactsByAccountId(String accountId) {
//     try {
//       return [
//         SELECT
//           Name,
//           Email,
//           Phone,
//           Id
//         FROM
//         Contact  
//         WHERE
//         Id =: accountId      
//       ];
//     } catch (Exception e) {
//       throw new AuraHandledException(e.getMessage());
//     }
//   }


    @AuraEnabled(cacheable=true)
    public static AccountWrapper getAccountRecordsDesc(Integer initialRows){
        AccountWrapper accountWrapper= new AccountWrapper();
        try{
            accountWrapper.accountsList = [SELECT ID,Name,Rating,AccountSource FROM Account ORDER BY Name DESC LIMIT :initialRows OFFSET 0];
            accountWrapper.totalRecords = [SELECT COUNT() FROM Account];
            accountWrapper.message = 'Account records are loaded';
            accountWrapper.success = true;
        }
        catch(Exception e){
            accountWrapper.message = e.getMessage();
            accountWrapper.success = false;
        }
        return accountWrapper;
    }
       

      @AuraEnabled(cacheable=true)
    public static Account AccountRecords(string recid){
        Account accrec=[SELECT ID,Name,Phone from Account where id=:recid];
       return accrec;
    }


@AuraEnabled(cacheable=true)
    public static Contact ContactRecords(string recid){
        system.debug('contact id-->'+recid);
       contact conrec=[SELECT ID,Name,Email,Phone from Contact where id=:recid];
       system.debug('contact info-->'+conrec);
        return conrec;
    }


 

    //To return additional records based on offset
    @AuraEnabled(cacheable=true)
    public static List<Account> loadAccountRecords(Integer rowLimit,Integer rowOffset){
        return [SELECT ID,Name,Rating,AccountSource FROM Account ORDER BY Name ASC LIMIT :rowLimit OFFSET :rowOffset];
    }

    @AuraEnabled
    public static void saveAccountRecord(Account objAcc){
        system.debug('obj details------->>>>>>>' + objAcc);
        try{
            insert objAcc;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
    
    // wrapper class
    public class AccountWrapper{
         @AuraEnabled
        public Integer totalRecords = 0;
        @AuraEnabled
        public List<Account> accountsList = new List<Account>();
        @AuraEnabled
        public String message;
        @AuraEnabled
        public Boolean success;
    }
    
}