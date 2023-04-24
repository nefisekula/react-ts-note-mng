import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT || 5000;

mongoose.connect(env.MONGO_CONN_STR)
    .then(() => {
    console.log("Mongoose connected");

    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
    })
    .catch(console.error);
