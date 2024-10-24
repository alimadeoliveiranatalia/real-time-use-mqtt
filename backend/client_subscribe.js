import { randomUUID } from "crypto";
import mqtt from "mqtt";
import { Server } from "socket.io";

const port_node_server = 3400

const url_dev = "mqtt://localhost:1883";

const url_senai = process.env.BROKER_SENAI
/**
 * credenciais de conecxão ao broker
 */
const options = {
    username: process.env.USER,
    password: process.env.PASS,
    clientId: `client-${randomUUID()}`
}
/**
 * client MQTT se conecta ao Broker
 */
const client = mqtt.connect(url_senai, options)

/**
 * Definição do Servidor Websocket
 */

const io = new Server(port_node_server, {
    cors: {
        origin: process.env.INTERFACE_NEXT
    }
})

const TOPIC = "iot/ventilador/corrente"

client.on("connect", () => {
    client.subscribe(`${TOPIC}`, (err) => {
        
        if(!err){            
            console.log(`Inscrito no Tópico: ${TOPIC}`)  
            // io.emit("status broker", `Inscrito no Tópico: ${TOPIC}`)          
            //socket.emit("status broker", 'Inscrito no tópico: cibercompartilhamento/n1/117/Temperatura')       
        } else {
            console.error(err)
        }
    })
})

let messages = [];

client.on("message", (topic, message) => {
    //console.info('MQTT-Client: listening topic ', topic)
    console.info(`message:${message.toString('utf8')} in ${new Date().getSeconds()}`)
    io.emit('message', message.toString('utf8'))   

})

io.on("connection", (socket) => {
    console.info(`SocketIO-Client: Server is running at http://localhost:${port_node_server}`)
    console.log(`SocketIO-Client: connect ${socket.id} in ${new Date().getSeconds()}s`)
    socket.emit("status connect", `connect ${socket.id} in ${new Date().getSeconds()}s`)   
})


