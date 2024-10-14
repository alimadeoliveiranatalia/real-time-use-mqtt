import mqtt from "mqtt";
import { randomUUID } from "crypto";

const url_dev = "mqtt://localhost:1883";

const url_senai = "mqtt://broker.hubsenai.com"

const options = {
    username: "admin-broker-109",
    password: "Senai@BrokerAdm109",
    clientId: `client-${randomUUID()}`
}

const client = mqtt.connect(url_dev)

client.on("connect", () => {
    client.subscribe("exemploTopico", (err) => {
        if(!err){
            console.log('Inscrito no tópico: exemploTopico')
        } else {
            console.error(err)
        }
    })
})

client.on("message", (topic, message) => {
    console.info('listening topic: ', topic)
    console.info('message: ', message.toString())
})