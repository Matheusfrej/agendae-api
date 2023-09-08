import { app } from "./app";
import { env } from "./env";

app.listen(env.PORT, () => console.log("Server is running at port", env.PORT));
