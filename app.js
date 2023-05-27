import express from "express";
import customerRouter from './src/routes/customer.js'
import cardRouter from './src/routes/card.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//routing middleware -- mounting--------------------------------------------------------------------

app.use("/api/customer", customerRouter)

app.use("/api/cards", cardRouter)

export default app;