export class CommentPost {
    constructor(//Defino las propiedades dentro del constructor y así no las tengo que volver a definir cuando lo usemos
        public _id: string,
        public content: string,
        public date: string,
        public user: any
    ){}
}
