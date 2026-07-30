//Promise for asynchronous :: A JavaScript Promise is an object representing the eventual completion or failure of an asynchronous operation
// A Promise is in one of these states:
// pending: initial state, neither fulfilled nor rejected.
// fulfilled: meaning that the operation was completed successfully.
// rejected: meaning that the operation failed.
//js is single threaded programming language
// const promise = new Promise((resolve,reject)=>{
//     console.log("Promise task");
//     resolve("promise resolved")
//     let msg =true;
//     if(msg!==true){
//         console.log("message using promise failed");
//     }
//     else{
//         console.log("error");
//     }
//     setTimeout(()=>{
//         console.log(resolve());
//     },2000);
// });
// promise.then((result)=>{
//     console.log(result);
// }).catch((error)=>{
// console.log(error);
// })
//create a promise that will print username and password using resolve and reject
//and if username and password not found then it will call
//reject state and print error message
// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         let error = false; 
//         if (!error) {
//             const username = "admin";
//             const password = "password123";
//             if (username === "admin" && password === "password123") {
//                 resolve({ username, password });
//             } else {
//                 reject(new Error("Invalid username or password"));
//             }
//         }
//     }, 2000);
// });

// promise.then((result) => {
//     console.log("Username:", result.username);
//     console.log("Password:", result.password);
// }).catch((error) => {
//     console.error("Error:", error.message);
// });
// async function test(){
// console.log("test function");
// const response =fetch("./studentdaata.json");
// await response.json().then((data)=>{
//     console.log(data);
// });
// }
// test();
// console.log("test function completed");
async function test() {
  console.log("message:1");

  try {
    const response = await fetch("./studentdaata.json");
    const stdn = await response.json();
    console.log(stdn);
    console.log("message 3");
    return stdn;
  } catch (error) {
    console.error("Error:", error);
  }
}

test();