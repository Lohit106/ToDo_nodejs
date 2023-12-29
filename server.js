import { app } from "./app.js";
import { connectdb } from "./data/db.js";

connectdb();

app.listen(process.env.PORT,()=>{
    console.log(`Server is Working on port:${process.env.PORT}`)
});