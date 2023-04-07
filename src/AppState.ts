import { reactive } from 'vue';
import { AppStateInterface } from './Interfaces/AppStateInterface';
import { Account } from './models/Account';

export const AppState: AppStateInterface = reactive({
    user: {},
    account: new Account(),
    // Store the business data here
});