@RestResource(urlMapping='/submit-case')
global with sharing class SupportCaseAPI {

    @HttpPost
    global static String createCase() {
        // Parse incoming JSON
        RestRequest req = RestContext.request;
        String body = req.requestBody.toString();
        
        Map<String, Object> data = (Map<String, Object>) JSON.deserializeUntyped(body);
        
        // Extract fields
        String email = (String) data.get('email');
        String subject = (String) data.get('subject');
        String description = (String) data.get('description');
        String priority = (String) data.get('priority');

        // Create new Case record
        Case newCase = new Case(
            SuppliedEmail = email,
            Subject = subject,
            Description = description,
            Priority = priority != null ? priority : 'Medium',
            Origin = 'Web'
        );

        insert newCase;

        // Return success response
        Map<String, Object> response = new Map<String, Object>{
            'success' => true,
            'caseId' => newCase.Id
        };

        return JSON.serialize(response);
    }
}
