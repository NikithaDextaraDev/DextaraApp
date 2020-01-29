public  class conform {
    @AuraEnabled
    public static void saveaccount(Account objAcc){
        system.debug('obj details------->>>>>>>' + objAcc);
        try{
            insert objAcc;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
