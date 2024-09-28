import express from "express";
import dotenv from "dotenv"
import { createClient } from 'redis';
import { ulid } from "ulid";
import cors from "cors" 

dotenv.config()

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

const { REDIS_URL } = process.env;
const client = createClient ({url: REDIS_URL});

const app = express()
const port = 3000;

app.use(express.json({limit: "10kb"}))

app.get("/lotteries", async (req, res) =>{
  try {
    await client.connect()
    const lotteryIds = await client.lRange("lotteries", 0, -1)
    
    const transaction = client.multi();
    lotteryIds.forEach((id) => transaction.hGetAll(`lottery.${id}`));
    const lotteries = await transaction.exec();
    res.json({lotteries: lotteries})

  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Failed to get lotteries"})

  } finally {
    client.disconnect()
  }
})

app.post("/lotteries", async (req,res)=>{
  const { type, name, prize } = req.body

  if (type !== "simple") {
    res.status(422).json({ error: "Invalid lottery type" });
    return;
  }

  if (typeof name !== "string" || name.length < 3) {
    res.status(422).json({ error: "Invalid lottery name" });
    return;
  }

  if (typeof prize !== "string" || prize.length < 3) {
    res.status(422).json({ error: "Invalid lottery prize" });
    return;
  }

  const id  = ulid();
  const newLottery = {
    id,
    name,
    prize,
    type,
    status: "running"
  }

  try {
    await client.connect();
    await client
      .multi()
      .hSet(`lottery.${id}`, newLottery)
      .lPush("lotteries", id)
      .exec();
    
    res.json(newLottery)

  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Failed to create lottery"})
  } finally {
    await client.disconnect();
  }
})

app.get("/lottery/:id", async (req,res)=>{
  const id =  req.params.id;
  try {
    await client.connect();
    const results = await client.multi().hGetAll(`lottery.${id}`).exec()
    const lottery = results[0]
    res.json(lottery)

  } catch (error) {
    console.error(error)
    res.status(404).json({error: "Failed to get lottery"})

  } finally {
    await client.disconnect()
  }
})

app.post("/register", async (req,res)=>{
  const {lotteryId, name} = req.body;

  if(!(lotteryId && name) || (typeof lotteryId !== "string" || typeof name !== "string")){
    res.status(400).json({error: "lotteryId and name must be strings"})
    return
  }

  try {
    await client.connect()
    const lotteryStatus = await client.multi().hGet(`lottery.${lotteryId}`, "status").exec()
  
    if(!lotteryStatus){
      throw new Error("Lottery not found")
    }
    
    if( lotteryStatus === "finished"){
      throw new Error("Lottery finished")
    }

    await client.lPush(`lottery.${lotteryId}.participants`, name);
    res.json({ status: "Success"})

  } catch (error) {
    console.error(error);
    res.status(404).json({error: "Registration failed: " + error.message})

  } finally {
    await client.disconnect()
  }
})

app.listen(port, () =>{
  console.log(`Server listening on port ${port}`)
})
