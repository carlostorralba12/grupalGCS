import { CommentEvent } from "./comment-event";
import { Usuario } from "./usuario";

export class Event {
    constructor(
        public _id: string,
        public title: string,
        public content: string,
        public date: number,
        public user: any,
        public image:string,
        public comments: CommentEvent[]
    ){}
}
