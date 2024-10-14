# Interface Consumo Protocolo MQTT
Interface Web para exibição de dados do broker MQTT mosquitto 
 
## Sobre o Next.js

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Server Mosquitto

Para consumir dados será necessário já haver um servidor no [mosquitto](https://mosquitto.org/) já configurado e com a comunicação websocket já habilitada.

Neste demo vamos utilizar um cointainer mosquitto no [docker](https://www.docker.com/).

Faça a criação de um arquivo Dockerfile na raiz do projeto, com as seguintes especificações:

```docker
FROM eclipse-mosquitto

COPY mosquitto.conf /mosquitto/config/mosquitto.conf

CMD ["mosquitto", "-c", "/mosquitto/config/mosquitto.conf"]
```

Faça a criação de um arquivo mosquitto.conf na raiz do projeto, com as seguintes especificações:

```conf
listener 1883
listener 9001
protocol websockets
allow_anonymous true
```
***Atenção:*** Ao definir `allow_anonymous true`, é uma opção altamente insegura, em ambiente de produção, habilite mecanismos de autenticação.

Execute o seguinte comando no terminal, no mesmo diretório do arquivo Dockerfile e mosquitto.conf, para criar a imagem do servidor mosquito no docker

```bash
docker build -t mosquitto-websocket .
```

Em seguida, execute o seguinte comando a a criação do servidor mosquitto em um container docker:

```bash
docker run --name mosquitto_server -p 1883:1883 -p 9001:9001 mosquitto-websocket
```



