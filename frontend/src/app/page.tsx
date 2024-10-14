'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io()

export default function Home() {

  const [isConnected, setIsConnected ] = useState(false);
  const [transport, setTransport ] = useState("N/A")

  function onConnect(){
    setIsConnected(true)
    setTransport(socket.io.engine.transport.name || "N/A")

    socket.io.engine.on("upgrade", (transport) => {
      setTransport(transport.name)
    })
  }

  function onDisconnect(){
    setIsConnected(false)
    setTransport("N/A")
  }

  useEffect(() => {
    if(socket.connected){
      onConnect()
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect)

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
