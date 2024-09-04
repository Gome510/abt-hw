import express from "express";
import dotenv from "dotenv"
import { createClient } from 'redis';

dotenv.config()
const {REDIS_URL, REDIS_KEY} = process.env;

const app = express()
const port = 3000;


const client = createClient({
    password: REDIS_KEY,
    socket: {
        host: REDIS_URL,
        port: 18810
    }
});

app.use(express.json({limit: "10kb"}))

app.get("/", (req, res) =>{
  res.json({});
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

  const id  = ulid.uild();
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

    await client.disconnect();
    res.json(newLottery)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Failed to create lottery"})
  }
})

app.listen(port, () =>{
  console.log(`Server listening on port ${port}`)
})

/* {
  "id": "unique ID",
  "name": "lottery name",
  "type": "type of the lottery, there will be multiple types",
  "prize": "Description of a prize, e.g. iPhone 13 Pro Max or $10000",
  "status": "running or completed"
  // depending on type there can be additional fields.
} */