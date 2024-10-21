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

const TOPIC = "exampleTopico"

client.on("connect", async () => {
    console.log('Connecting Mosquitto Broker')
    
    fs.createReadStream('test.csv')
        .pipe(csv( 
            {
                separator: ';',
                newline: '\n',
                /*mapHeaders: ({temperatura}) => temperatura.toLowerCase(),
                mapValues: ({value}) => value.toLowerCase()*/
            }
        ))
        .on('data', (data) => {
            Array(data).forEach(
                (element) => {results.push(element)
                //console.log('element:',element)
                }
            )
        })
        .on('end', () => {
            for(let item of results){                
                /*setInterval(() => {*/
                    client.publish(`${TOPIC}`, JSON.stringify(item) , (err) => {
                        if(!err){
                            console.log(`Published ${results.length--} in topic: ${TOPIC}`)
                        } else {
                            console.error(err)
                        }
                    })
                /*}
                , 5000)*/
            }
        })
   
})