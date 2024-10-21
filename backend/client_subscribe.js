import { randomUUID } from "crypto";
import mqtt from "mqtt";
import { Server } from "socket.io";

const port_node_server = 3400

const url_dev = "mqtt://localhost:1883";

const url_senai = "mqtt://broker.hubsenai.com"
/**
 * credenciais de conecxão ao broker
 */
const options = {
    username: "admin-broker-109",
    password: "Senai@BrokerAdm109",
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
        origin: "http://localhost:3000"
    }
})

const TOPIC = "exampleTopico" //"cibercompartilhamento/n1/117/Umidade"

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
    console.info('MQTT-Client: listening topic ', topic)
    console.info('message: ', JSON.parse(message.toString('utf8')))
    io.emit('message', message.toString('utf8'))   

})

io.on("connection", (socket) => {
    console.info(`SocketIO-Client: Server is running at http://localhost:${port_node_server}`)
    console.log(`SocketIO-Client: connect ${socket.id}`)
    socket.emit("status connect", `connect ${socket.id}`)   
})

