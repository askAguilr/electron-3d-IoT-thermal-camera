const { Board, Pin, Button } = require("johnny-five");
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const board = new Board();

const delay = (ms) => new Promise(r=>setTimeout(r,ms));

const readTemp = (pin)=>{
  return new Promise(resolve=>{
    pin.read(function(error, value) {
      resolve(value)
    });
  })
  
}

board.on("ready", () => {
  const proximitySensor = new Button(12);
  const temperatureSensor = new Pin({pin: "A0"});
  const temperatureTrigger = new Pin(13); 
  console.log("Ready!");
  let color = 'NONE';
  proximitySensor.on("up", async function() {
    console.log( "Head detected" );
    temperatureTrigger.low();
    await delay(1000);
    console.log( "reading temp" );
    const temp = await readTemp(temperatureSensor);
    if(temp>600){
      color="RED";
    }else if(temp>80){
      color="GREEN";
    }else{
      color="AMBER";
    }
    console.log(color+": "+temp);
    io.emit('temperatureRead', { temperature: temp, color: color });
    await delay(500);
    temperatureTrigger.high();
    await delay(500);
  });
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(555, () => {
  console.log('listening on *:555');
});