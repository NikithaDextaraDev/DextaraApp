public with sharing class lwcLifetimeSpendingController {
    @AuraEnabled (cacheable=true)
  public static List<Opportunity> getAccountLifetimeSpending(){
    return [SELECT StageName,LeadSource FROM Opportunity WHERE AccountId = '0010b00002UYDn5AAH'];
  }    
}