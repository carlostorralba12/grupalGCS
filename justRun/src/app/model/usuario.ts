export class Usuario {
    constructor(//Defino las propiedades dentro del constructor y así no las tengo que volver a definir cuando lo usemos

    public _id: string,
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public image: string        
    ){}
}

/**
 * name: String,
    surname: String,
    email: String,
    password: String, 
    image: String,
    role:String
 */