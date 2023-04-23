import { loggerError } from "../loggers/loggers.js";
import { MessageDAO } from '../daos/index.js';


export default class MessageService {
     
     constructor() {
          this.dao = MessageDAO
     }

     async getAllMessages () {

          try {
               const messages = await this.dao.getAll();
               if(!messages) {
                    loggerError.error(`No se encontraron los mensajes`);
                    throw new Error(`No se encontraron los mensajes`);
               }
               return messages
          } catch (err) {
               loggerError.error(`Se produjo un error al buscar a todos los mensajes: ${err}`);
               throw err;
          }    
        }

     async getMessageByEmail (email) {

          try {
               const messages = await this.dao.findByCategory(email)
               if(!messages) {
                    loggerError.error(`No se encontraron los mensajes`);
                    throw new Error(`No se encontraron los mensajes`);
               }
               return messages 
          } catch (err) {
               loggerError.error(`Se produjo un error al buscar a todos los mensajes: ${err}`);
               throw err;
          }
     }

     
        async createMessage(newMessage) {
          try {
               let data = {
                    timestamp:new Date().toISOString(),
                    ...newMessage,  
                }
                const message = await this.dao.save(data);
                if (!message) {
                    loggerError.error(`No se creo el mensaje correctamente`);
                    throw new Error(`No se creo el mensaje correctamente`);
                }
                return message
          } catch (err) {
               loggerError.error(`Se produjo un error al intentar crear un nuevo mensaje: ${err}`);
               throw err;
          }
        }

        async addResponse(id,newResponse) {
          try {
               let data = {
                    timestamp:new Date().toISOString(),
                    ...newResponse,  
                }
                const response = await this.dao.updateAndPush(id,data);
                if (!response) {
                    loggerError.error(`No se creo la respuesta correctamente`);
                    throw new Error(`No se creo la respuesta correctamente`);
                }
                return response
          } catch (err) {
               loggerError.error(`Se produjo un error al intentar crear una nueva respuesta: ${err}`);
               throw err;
          }
        }
     

}

