class Usuario{
    
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return (`Fullname: ${this.nombre} ${this.apellido}`);
    }
    

    addMascota(newMascota){
        this.mascotas.push(newMascota);
    }

    countMascotas(){
        return (`Cantidad de mascotas que tiene el usuario: ${this.mascotas.length}`);
    }


    addBook(nombre, autor){
        this.libros.push({nombreLibro:nombre, autorLibro:autor});
    }


    getBookNames(){
        return this.libros.map(item => item.nombreLibro);
        
    }
}

const usuario = new Usuario('Dilia', 'Lopez', [{nombreLibro: 'El señor de las moscas',autorLibro: 'William Golding'}, {nombreLibro: 'Fundacion', autorLibro: 'Isaac Asimov'}], ['Perro', 'Gato'])

console.log(usuario.getFullName());
console.log(usuario.addMascota('Hasmter'));
console.log(usuario.countMascotas());
console.log(usuario.addBook('La casa de los Espiritus','Isabel Allende'));
console.log(usuario.getBookNames());
console.log(usuario);
