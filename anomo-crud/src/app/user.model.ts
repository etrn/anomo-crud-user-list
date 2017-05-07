export class UserModel {
    constructor(
        public _id: string,
        public name: string,
        public email: string,
        public password: string,
        public avatar: string
    ) {}
}