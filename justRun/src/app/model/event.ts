export class Event {
    constructor(
        public _id: string,
        public title: string,
        public content: string,
        public user:any,
        public image:string,
        public comments: any
    ){}
}
