// console.log("task 3");
// function hello(){
//     console.log("Hello task 1");

// }
// hello();
// console.log("task 2");

function hello(){
    console.log("hello");
    setTimeout(function(){
        console.log("task2");
    },2000
)
}
hello();
console.log("task 3");