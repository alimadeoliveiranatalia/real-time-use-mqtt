import paho.mqtt.client as mqtt
import json
import time 

#Função que será chamada no momento que a conexão com o broker for feita
def on_connect(client, userdata, flags, rc):    
    print("Connected with result code "+str(rc))    
    client.subscribe("exemploTopico1") #Se inscreve em um tópico
#Função que vai ser chamada sxempre que chegar uma mensagem do tópico que está inscrito
def on_message(client, userdata, msg):    
    print(msg.topic+" "+str(msg.payload)) 
    mensagem = msg.payload
    dado = json.loads(mensagem)
    print('\n\n\n\n', dado["icon_asset"])


    
client = mqtt.Client() #Cria um cliente MQTT
client.on_connect = on_connect #Define qual a função que será chamada quando se concetar ao broker
client.on_message = on_message #Define qual a função que será chamada quando receber uma mensagem
print("Conectando...")
client.username_pw_set("admin-broker-109", "Senai@BrokerAdm109") #Configura o login e senha do broker (apenas é necessário se o broker tiver senha)
client.connect("broker.hubsenai.com", 1883, 60) #Se conecta a um broker
    
#client.loop_forever()

while True: #Loop    
    client.loop() #chama verifica se alguma informação chegou 