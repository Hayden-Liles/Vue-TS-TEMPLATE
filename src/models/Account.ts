export class Account {
    id: string;
    email: string;
    name: string;
    picture: string;
    // Define Additional Properties here

    constructor(data?: { id?: string; email?: string; name?: string; picture?: string }) {
        this.id = data?.id ?? '';
        this.email = data?.email ?? '';
        this.name = data?.name ?? '';
        this.picture = data?.picture ?? '';
        // TODO add additional properties if needed
    }
}
