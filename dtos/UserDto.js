export class UserDTO {
    constructor({_id, email, name, address, age, phone, picture, isAdmin, cart}){
        this.id= _id,
        this.email = email,
        this.name= name,
        this.address= address,
        this.age = age,
        this.phone = phone,
        this.picture = picture,
        this.isAdmin = isAdmin,
        this.cart = cart
    }
}

