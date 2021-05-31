import { CommentEvent } from "./comment-event";
import { Usuario } from "./usuario";

export class Event {
    constructor(
        public _id: string,
        public title: string,
        public content: string,
        public user: Usuario,
        public image:string,
        public comments: CommentEvent[]
    ){}
}
