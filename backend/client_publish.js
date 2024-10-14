import mqtt from "mqtt";
import { randomUUID } from "crypto";


const url_dev = "mqtt://localhost:1883"

const url_senai = "mqtt://broker.hubsenai.com"

const options = {
    username: "admin-broker-109",
    password: "Senai@BrokerAdm109",
    clientId: `client-${randomUUID()}`
}

const client = mqtt.connect(url_dev)

client.on("connect", () => {
    console.log('Connecting Mosquitto Broker')
    const msg = "Hello MQTT";

    client.publish('exemploTopico', msg , (err) => {
        if(!err){
            console.log('Seting message')
        } else {
            console.error(err)
        }
    })
})