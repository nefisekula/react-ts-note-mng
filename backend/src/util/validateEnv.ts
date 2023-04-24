import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
    MONGO_CONN_STR: str(),
    PORT: port(),
})