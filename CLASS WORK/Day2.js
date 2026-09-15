// console.log("task 3");
// function hello(){
//     console.log("Hello task 1");

// }
// hello();
// console.log("task 2");

// function hello(){
//     console.log("hello");
//     setTimeout(function(){
//         console.log("task2");
//     },2000
// )
// }
// hello();
// console.log("task 3");
function hello(n1,n2){
    console.log("task 1");
    return n1+n2;
}
let a=10;
let b=20;
console.log(hello(a,b));
function hi(){
    console.log("say hi");
}
hello(a,b,hi());
function demo(){
    console.log("Demo");
}
function Text(){
console.log("Text");
}
hello(a,b,Text());
hello(a,b,demo());