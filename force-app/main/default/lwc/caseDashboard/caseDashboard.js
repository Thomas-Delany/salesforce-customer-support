import { LightningElement, wire, track } from 'lwc';
import getCases from '@salesforce/apex/CaseController.getCases';

export default class CaseDashboard extends LightningElement {
    @track status = '';
    @track category = '';
    @track cases = [];
    @track error;

    statusOptions = [
        { label: 'All', value: '' },
        { label: 'New', value: 'New' },
        { label: 'Working', value: 'Working' },
        { label: 'Closed', value: 'Closed' },
    ];

    categoryOptions = [
        { label: 'All', value: '' },
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
    ];

    columns = [
        { label: 'Case Number', fieldName: 'CaseNumber' },
        { label: 'Subject', fieldName: 'Subject' },
        { label: 'Status', fieldName: 'Status' },
        { label: 'Priority', fieldName: 'Priority' },
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' },
    ];

    connectedCallback() {
        this.fetchCases();
    }

    handleStatusChange(event) {
        this.status = event.detail.value;
        this.fetchCases();
    }

    handleCategoryChange(event) {
        this.category = event.detail.value;
        this.fetchCases();
    }

    fetchCases() {
        getCases({ statusFilter: this.status, categoryFilter: this.category })
            .then(result => {
                this.cases = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error.body.message;
                this.cases = [];
            });
    }
}
