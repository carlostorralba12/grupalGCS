export class Post {
    constructor(//Defino las propiedades dentro del constructor y así no las tengo que volver a definir cuando lo usemos
        public _id: string,
        public title: string,
        public content: string,
        public user:any,
        public image:string,
        public comments: any
    ){}
}


/**
 * Comentarios
 * 
 * content: String,
    date: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref:'User'}
 * 
 */

/**
 * 
 *   title: String,
    content: String,
    date: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref:'User'},
    comments: [CommentSchema]
 * 
 */