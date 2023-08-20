const express = require("express");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/error-handler.middleware");
const { connectDb } = require("./config/database.config");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

//Dotenv configurations
dotenv.config();

//Call to the database connection
connectDb();

//Initialize the express app
const app = express();

//Initialize the body parser request size limitations
app.use(bodyParser.json({ limit: "10mb", extended: true }));

//Initialize the CORS
app.use(cors());

//Accepting the requests body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Setting up the base route
app.use(`/${process.env.URL_PREFIX}/${process.env.API_VERSION}`, routes);

//Handling the errors
app.use(errorHandler);

//Listen to the PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on PORT : ${PORT}`);
});