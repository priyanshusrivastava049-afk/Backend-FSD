const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.on('click', () => {
    console.log('Button clicked!');
});
emitter.on('mouseover', () => {
    console.log('Mouse over button!');
});
emitter.emit('click');
emitter.emit('mouseover');