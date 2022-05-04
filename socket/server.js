var addScore = require('./src/addScore');

var SerialPort = require('serialport');
var xbee_api = require('xbee-api');
var C = xbee_api.constants;
// var storage = require("./storage")
require('dotenv').config()


const SERIAL_PORT = process.env.SERIAL_PORT;

var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 2
});

let serialport = new SerialPort(SERIAL_PORT, {
    baudRate: 9600,
}, function(err) {
    if (err) {
        return console.log('Error: ', err.message)
    }
});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

serialport.on("open", function() {

    console.log("serial opened")
        // let frame_ob = { // AT Request to be sent
        //   type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
        //   destination64: "0013a20041a7133c",
        //   command: "D0",
        //   remoteCommandOption: [0X02],
        //   commandParameter: [0X00],
        // };
        // xbeeAPI.builder.write(frame_ob);

    let frame_obj = { // AT Request to be sent
        type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
        destination64: "0",
        command: "NI",
        commandParameter: [],
    };
    xbeeAPI.builder.write(frame_obj);

});

// All frames parsed by the XBee will be emitted here

storage.listSensors().then((sensors) => sensors.forEach((sensor) => console.log(sensor.data())))

xbeeAPI.parser.on("data", function(frame) {
    console.log(frame)
        //on new device is joined, register it

    //on packet received, dispatch event
    //let dataReceived = String.fromCharCode.apply(null, frame.data);
    if (C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET === frame.type) {
        //console.log("C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET");
        let dataReceived = String.fromCharCode.apply(null, frame.data);
        //console.log(">> ZIGBEE_RECEIVE_PACKET >", dataReceived);
        //console.log(dataReceived)


        //add score to the killer, decrease score to the killed
        addScore.addScores(frame.remote64, dataReceived)


        console.log("ZIGBEE_IO_DATA_SAMPLE_RX")
        console.log(frame.analogSamples.AD0)

        /*
        if (frame.digitalSamples.DIO2) {
          console.log("its open")

          var frame_obj = { // AT Request to be sent
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination64: "FFFFFFFFFFFFFFFF",
            command: "BH",
            commandParameter: [
              0x01
            ],
          };
          xbeeAPI.builder.write(frame_obj);

        } else {
          console.log("its not open")
        }*/
        //storage.registerSample(frame.remote64,frame.analogSamples.AD0 )

    } else if (C.FRAME_TYPE.REMOTE_COMMAND_RESPONSE === frame.type) {
        console.log("REMOTE_COMMAND_RESPONSE")
        console.debug(frame);
    } else {
        console.debug(frame);
        let dataReceived = String.fromCharCode.apply(null, frame.commandData)
        console.log(dataReceived);
    }


    if (C.FRAME_TYPE.NODE_IDENTIFICATION === frame.type) {
        let dataReceived = String.fromCharCode.apply(null, frame.nodeIdentifier);
        //console.log("NODE_IDENTIFICATION");
        storage.registerSensor(frame.remote64)

    } else if (C.FRAME_TYPE.ZIGBEE_IO_DATA_SAMPLE_RX === frame.type) {

        //console.log("ZIGBEE_IO_DATA_SAMPLE_RX")
        //console.log(frame.analogSamples.AD0)
        storage.registerSample(frame.remote64, frame.analogSamples.AD0)

    } else if (C.FRAME_TYPE.REMOTE_COMMAND_RESPONSE === frame.type) {
        //console.log("REMOTE_COMMAND_RESPONSE")
    } else {
        //console.debug(frame);
        let dataReceived = String.fromCharCode.apply(null, frame.commandData)
            //console.log(dataReceived);
    }

});