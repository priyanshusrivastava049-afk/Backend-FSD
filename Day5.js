const EventEmitter=require("events");
class MyEvent extends EventEmitter{}
event = new MyEvent();
event.on("greet" , (name)=>{
    console.log(`Hello, ${name}!`);
});
const events=new EventEmitter();
events.once("greet",()=>{
    console.log("this is event emitter");
})
event.on("exit",()=>{})
events.emit("greet");
events.emit("exit");
    