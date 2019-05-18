import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import expressGraphQL from "express-graphql";
import jwt from "express-jwt";
import mongoose from "mongoose";

require('dotenv').config();

import schema from "./graphql/";

const app = express();

const PORT = process.env.PORT || "4000";
const db = process.env.DB_URL;

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

  const auth = jwt({
    secret: process.env.JWT_TOKEN,
    credentialsRequired: false
  })

  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    auth,
    expressGraphQL(req => ({
      schema,
      graphiql: true,
      context: {
        user: req.user
      }
    }))
  );

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
