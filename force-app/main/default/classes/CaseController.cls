public with sharing class CaseController {

    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(String statusFilter, String categoryFilter) {
        String baseQuery = 'SELECT Id, CaseNumber, Subject, Status, Priority, CreatedDate FROM Case WHERE Id != null';
        
        if (String.isNotBlank(statusFilter)) {
            baseQuery += ' AND Status = :statusFilter';
        }

        if (String.isNotBlank(categoryFilter)) {
            baseQuery += ' AND Priority = :categoryFilter'; // Example: using Priority as category
        }

        baseQuery += ' ORDER BY CreatedDate DESC LIMIT 50';

        return Database.query(baseQuery);
    }
}
