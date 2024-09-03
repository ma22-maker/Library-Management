import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import connectDB from "./config/Mongooseconfig.js"; //importing the config file for mongoose database
import { router as BookRoutes } from "./routes/bookRoutes.js";
import { router as GenreRoutes } from "./routes/genreRoutes.js";
import { router as AuthorRoutes } from "./routes/authorRoutes.js";
import { router as UserRoutes } from "./routes/userRoutes.js";
import { router as UserBookRoutes } from "./routes/UserBookRecRoutes.js";
import { router as HomeRoutes } from "./routes/authRoutes.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGOOSE_URL;

app.use(express.json()); //body parser from clint to the server
app.use(cookieParser()); //cookie parer
// app.get("/", function (req, res) {
//   res.send("<b>My</b> Home page");
// });

app.use("/", HomeRoutes);
app.use("/book", BookRoutes);
app.use ("/genre", GenreRoutes);
app.use ("/author", AuthorRoutes);
app.use ("/user", UserRoutes);
app.use ("/userRec", UserBookRoutes);

// Connect to MongoDB and start the server
connectDB(MONGO_URL).then(() => {
    app.listen(port, function () {
      console.log(`Example app listening on port ${port}.`);
    });
  });
