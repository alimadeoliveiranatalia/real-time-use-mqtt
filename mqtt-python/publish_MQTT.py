import paho.mqtt.client as mqtt
import time 
import json

client = mqtt.Client() #Cria um cliente MQTT
print("Conectando...")
client.username_pw_set("admin-broker-109", "Senai@BrokerAdm109") #Configura o login e senha do broker (apenas é necessário se o broker tiver senha)
client.connect("broker.hubsenai.com", 1883, 60) #Se conecta a um broker


assets = [
    {
		"id":"bd3d3895-6a7a-487d-a46e-6cf7a1f8b80e",
		"name_asset":"Dinamometro Automotivo",
		"icon_asset":"dinamometro.svg",
		"type":1,
		"description":"Dinamometro Automotivo Veicular",
		"url":"https://drive.google.com/file/d/1ax0k8200s6AGwwocPfNqa2qmPl4FCivG/preview",
		"createdAt":"2024-09-30T17:25:21.535Z"
	},
	{
		"id":"d0e263a2-c654-4292-a5d3-f62b47888810",
		"name_asset":"Planta Smart N1",
		"type":1,
		"icon_asset":"smart_4.0.svg",
		"description":"Planta de Manufatura Didatica N1",
		"url":"https://drive.google.com/file/d/15qpSjR7uk-95pooT2QiXhmuGzOScwh_-/preview",
		"createdAt":"2024-09-30T17:25:21.535Z"
	}
]

payload = json.dumps(assets[1])

client.publish("exemploTopico", payload) 
