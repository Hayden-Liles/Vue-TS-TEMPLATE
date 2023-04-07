import { Account } from '../models/Account';

export interface AppStateInterface {
    user: object;
    account: Account;
    // To dofine what the property will be
}
