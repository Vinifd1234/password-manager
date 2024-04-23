


export class Password {
    id: number;
    name: string;
    category: string;
    createdAt: Date;
    password: string;

    constructor (id: number, name: string, category: string, createdAt: Date, password: string) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.createdAt = createdAt;
        this.password = password;
    }

    /* private hashPassword(password: string, salt: string): string {
        const encoder = new TextEncoder();
        returnencoder.encode(password);
    } */

}

export interface IPassword {
    id: number;
    name: string;
    category: string;
    createdAt: Date;
    password: string;
}
