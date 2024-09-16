//this file is a .js file instead of .mjs because type = module in package.json

import { createClient } from "redis";
import random from "random";
import dotenv from "dotenv";

dotenv.config()
const { REDIS_URL } = process.env;
const client = createClient({ REDIS_URL });
client.on("error", (error)=>{
  console.error(error);
})

async function finalizeLottery(){
  if (process.argv.length !== 3) {
    console.log("Incorrect usage. Usage: npm run finalize-lottery <LOTTERY_ID");
    return;
  }


  const lotteryId = process.argv[2];
  try {
    await client.connect()
    const lotteryStatus = await client.multi().hGet(`lottery.${lotteryId}`, "status").exec()
  
    if(!lotteryStatus){
      throw new Error("Lottery not found")
    }
    
    if( lotteryStatus === "finished"){
      throw new Error("Lottery finished")
    }

    const lotteryParticipants = await client.lRange(`lottery.${lotteryId}.participants`, 0, -1);
    const winIndex = random.int(0, lotteryParticipants.length - 1);
    const winner = lotteryParticipants[winIndex];

    await client.multi()
      .hSet(`lottery.${lotteryId}`,"status", "finished")
      .hSet(`lottery.${lotteryId}`, "winner", winner)
      .exec();

    console.log("Success. Winner:",  winner);
  } catch (error) {
    console.log("Error finalizing the lottery:", e.message)
  } finally {
    await client.disconnect()
  }
}

finalizeLottery();