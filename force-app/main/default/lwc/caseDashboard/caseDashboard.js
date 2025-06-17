import { LightningElement, track } from 'lwc';
import getCases from '@salesforce/apex/CaseController.getCases';
import searchCases from '@salesforce/apex/CaseController.searchCases';

export default class CaseDashboard extends LightningElement {
    @track status = '';
    @track category = '';
    @track searchKey = '';
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

    handleSearchChange(event) {
        this.searchKey = event.target.value;

        if (this.searchKey.length > 2) {
            this.searchCasesByKeyword();
        } else if (this.searchKey.length === 0) {
            this.fetchCases();
        }
    }

    searchCasesByKeyword() {
        searchCases({ searchKey: this.searchKey })
            .then(result => {
                this.cases = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error.body.message;
                this.cases = [];
            });
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
