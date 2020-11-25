import express from "express";
import cors from "cors";
import bodyParse from "body-parser";
import mongoose from "mongoose";
import postroutes from "./routes/post.js";
const app = express();
app.use("/posts", postroutes);

app.use(bodyParse.json({ limit: "30mb", extended: true }));
app.use(bodyParse.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://admin:admin@cluster0.eqsdg.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log("SERVER IS RUNNING     " + PORT))
  )
  .catch((error) => console.log(error.message));
mongoose.set("useFindAndModify", false);
