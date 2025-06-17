public with sharing class CaseController {

    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(String statusFilter, String categoryFilter) {
        String baseQuery = 'SELECT Id, CaseNumber, Subject, Status, Priority, CreatedDate FROM Case WHERE Id != null';

        if (String.isNotBlank(statusFilter)) {
            baseQuery += ' AND Status = :statusFilter';
        }

        if (String.isNotBlank(categoryFilter)) {
            baseQuery += ' AND Priority = :categoryFilter'; // Priority used as category
        }

        baseQuery += ' ORDER BY CreatedDate DESC LIMIT 50';

        return Database.query(baseQuery);
    }

    @AuraEnabled(cacheable=true)
    public static List<Case> searchCases(String searchKey) {
        if (String.isBlank(searchKey)) {
            return new List<Case>();
        }

        List<List<SObject>> searchResults = Search.query(
            'FIND :searchKey IN ALL FIELDS RETURNING Case(Id, CaseNumber, Subject, Status, Priority, CreatedDate)'
        );

        return (List<Case>)searchResults[0];
    }
}
