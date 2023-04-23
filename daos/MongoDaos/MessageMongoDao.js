import MongoDbContainer from "../../containers/mongoContainer.js";

class MessageDaoMongoDb extends MongoDbContainer {
    constructor() {
      super("Message", {
        timestamp: { type: String, required: true },
        email: {type: String, required: true},
        type: {type: String, required: true},
        text: {type: String, required: true},
        responses: {
            type: [{
                timestamp: { type: String, required: true },
                email: {type: String, required: true},
                response: {type: String, required: true}
            }],
            default: []
        }
      });
    }

  
  }
  
export default MessageDaoMongoDb;
