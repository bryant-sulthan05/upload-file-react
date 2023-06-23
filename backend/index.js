import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import db from "./config/Database.js";
import ProductRoute from "./routes/ProductRoute.js";

dotenv.config();

const app = express();

// (async () => {
//     await db.sync();
// })();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(ProductRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});