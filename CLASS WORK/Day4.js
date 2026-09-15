//Event loop
console.log("synchronous function");
const f1=()=>{
    console.log("f1");
}
const f2=()=>{
    console.log("f2");
}
    function main(){
        console.log("main function");
        setTimeout(f1,1000);
        setTimeout(f2,2000);
        new Promise((resolve, reject) => {
            resolve("Promise resolved");
        }).then(result => console.log(result))
        new Promise((resolve, reject) => {
            reject("Promise rejected");
        }).then(result => console.log(result)).catch(error => console.log(error));

    }
    main();
 