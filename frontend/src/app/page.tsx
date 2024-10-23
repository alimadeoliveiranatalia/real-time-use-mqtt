'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import GaugeComponent from "react-gauge-component";

const socket = io('http://localhost:3400', { transports : ["websocket"]})

export default function Home() {

  const [isConnected, setIsConnected ] = useState(false);
  const [ messageSocket, setMessageSocket ] = useState('');
  const [messageBroker, setMessageBrocker] = useState('');
  const [transport, setTransport ] = useState("N/A");
  const [statusLigar, setStatusLigar ] = useState('');

  function onConnect(){
    setIsConnected(true)
    socket.on("status connect", (arg) => {
      setMessageSocket(String(arg))
    })
    setTransport(socket.io.engine.transport.name || "N/A")

    socket.io.engine.on("upgrade", (transport) => {
      setTransport(transport.name)
    })

    socket.on("status broker", (arg) => {
      setMessageSocket(String(arg))
    })

  }

  function onDisconnect(){
    setIsConnected(false)
    setTransport("N/A")
  }

  function captureMessages(item:string){
   setMessageBrocker(item)
   const stringItem = new String(item)
   console.log('stringItem lenght:', stringItem.length)
  }

  function ligar(){
    setStatusLigar('ventilador')
  }

  useEffect(() => {
    if(socket.connected){
      onConnect()
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", (arg) => {
      captureMessages(String(arg))
    })


    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
    }
  }, [])
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>Status: {isConnected ? "connected": "disconnected"}</p>
        <p>Transport: {transport } </p>
        <p>My socket ID: {messageSocket != '' ? messageSocket : "message none"}</p>
        <ul>
          <p>messages</p>
          <li>{messageBroker}</li>
        </ul>
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            // gradient: true,
            subArcs: [
              {
                limit: 5,
                color: '#EA4228',
                showTick: true,
                tooltip: {
                  text: 'Too low temperature!'
                },
                onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
              },
              {
                limit: 7,
                color: '#F5CD19',
                showTick: true,
                tooltip: {
                  text: 'Low temperature!'
                }
              },
              {
                limit: 8,
                color: '#5BE12C',
                showTick: true,
                tooltip: {
                  text: 'OK temperature!'
                }
              },
              {
                limit: 9, color: '#F5CD19', showTick: true,
                tooltip: {
                  text: 'High temperature!'
                }
              },
              {
                color: '#EA4228',
                tooltip: {
                  text: 'Too high temperature!'
                }
              }
            ]
          }}
          pointer={{
            color: '#345243',
            length: 0.80,
            width: 15,
            // elastic: true,
          }}
          labels={{
            valueLabel: { formatTextValue: value => value + 'ºC' },
            tickLabels: {
              type: 'outer',
              defaultTickValueConfig: { 
                formatTextValue: (value: any) => value + 'ºC' ,
                style: {fontSize: 10}
            },
              ticks: [
                { value: 13 },
                { value: 22.5 },
                { value: 32 }
              ],
            }
          }}
          value={(Number(messageBroker))}
          minValue={0}
          maxValue={10}
        />
        <button onClick={ligar} disabled={statusLigar === 'ventilador' ? true : false }>ligar</button>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://github.com/alimadeoliveiranatalia"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/github.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Dev Profile
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
