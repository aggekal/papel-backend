import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

function connect(){
       const dbUri = config.get<string>("dbUri");
       return mongoose.connect(dbUri).then(()=>{
              logger.info('connected to db');
       }).catch((e)=>{
              logger.error(e,'Could not connect to db');
              process.exit(1);
       });
}

export default connect