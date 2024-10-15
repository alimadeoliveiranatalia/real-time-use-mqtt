import mqtt from "mqtt";
import { Server } from "socket.io";
import { randomUUID } from "crypto";

const url_dev = "mqtt://localhost:1883";

const url_senai = "mqtt://broker.hubsenai.com"

const options = {
    username: "admin-broker-109",
    password: "Senai@BrokerAdm109",
    clientId: `client-${randomUUID()}`
}

const io = new Server(8080)

const client = mqtt.connect(url_senai, options)

/*io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`)
    socket.emit("status connect", `connect ${socket.id}`)*/
    
    client.on("connect", () => {
        client.subscribe("dados_temperatura", (err) => {
            
            if(!err){
                
                console.log('Inscrito no tópico: dados_temperatura')
                
                //socket.emit("status broker", 'Inscrito no tópico: exemploTopico')
            
            } else {
                console.error(err)
            }
        })
    })
/*})*/

/*io.on("listen message", (socket) => {*/
    client.on("message", (topic, message) => {
        console.info('listening topic: ', topic)
        console.info('message: ', message.toString())
        //socket.emit("message", message.toString())
    })
/*})*/