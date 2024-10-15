import mqtt from "mqtt";
import fs from "node:fs";
import { randomUUID } from "crypto";
import csv from "csv-parser";


const url_dev = "mqtt://localhost:1883"

const url_senai = "mqtt://broker.hubsenai.com"

const options = {
    username: "admin-broker-109",
    password: "Senai@BrokerAdm109",
    clientId: `client-${randomUUID()}`
}

const client = mqtt.connect(url_senai, options)

let results = [];

client.on("connect", async () => {
    console.log('Connecting Mosquitto Broker')
    
    fs.createReadStream('test.csv')
        .pipe(csv({ separator: ';'}))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            //console.log(results);
            for(let item of results){
                
                client.publish('dados_temperatura', JSON.stringify(item) , (err) => {
                    if(!err){
                        console.log('Sending message')
                    } else {
                        console.error(err)
                    }
                })
            }
        })

    
    
})