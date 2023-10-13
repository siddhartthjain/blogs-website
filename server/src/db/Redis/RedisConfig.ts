import * as redis from 'redis'
export const redisclient = redis.createClient(); 

(async () => { 
    await redisclient.connect(); 
})(); 

redisclient.on("ready", () => { 
    console.log("Connected to redis!"); 
});   
redisclient.on("error", (err) => { 
    console.log("Error in the Connection"); 
}); 