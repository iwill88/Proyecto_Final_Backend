import  app from "./app.js";
import cluster from "cluster";
import os from "os";
import {Server as  IOServer} from 'socket.io'
import MessageService from "./services/messageServices.js";

const MessageServices = new MessageService()

import dotenv from "dotenv"
dotenv.config()



const PORT = process.env.PORT || 8081;


const modo = process.env.MODO == "";

if (modo && cluster.isPrimary){
    const numCPUs = os.cpus().length
      
      console.log(`Número de procesadores: ${numCPUs}`)
      console.log(`PID MASTER ${process.pid}`)
  
      for(let i=0; i<numCPUs; i++) {
          cluster.fork()
      }
  
      cluster.on('exit', worker => {
          console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
          cluster.fork()
      })
  }
  
  else {
  
    const server = app.listen(PORT, () => {
      console.log(`https://localhost:${PORT}`);
    })

    const io = new IOServer(server);
  
    
    io.on('connection', async (socket) => {
      console.log("socket id: ", socket.id);
      const messages = await MessageServices.getAllMessages()
      socket.emit('server-message', messages)
     
      socket.on('new-message', data => {
        try {
            if(!data.email) throw new Error()
           
            MessageServices.createMessage(data)

           } catch (err) {
            socket.emit('server-message' , 'ERROR: Por favor inicia sesion ')
          }

      })

    });
  
    server.on("error", (error) => console.log(error.message));
  
  }
