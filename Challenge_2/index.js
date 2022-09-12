//Comment ..... This is my firts javascript code!
console.log('Hello World');

let name = 'Mosh';
console.log(name);

// const para que la variable no cambie, si puede cambiar de valor utilizar let


// object:
let person = {
    name:'Mosh',
    age:30
};

console.log(person);

// array:
let selectedColor = ['red','blue'];
selectedColor[2]='green';

console.log(selectedColor);

//functions:
function greet(name){
    console.log('Hello ' + name);

}
greet('Dilia');

//factory function

function createcircle(radius){
    return{
        radius,
        draw: function(){
            console.log('draw');
        }
    };
}

const circle = createcircle(1);
circle.draw();

// contruction function
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('draw');
    }
}

const another = new Circle(1);