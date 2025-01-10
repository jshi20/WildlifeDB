import express from "express";
import cors from "cors";
import { testRouter } from "./controllers/testController.js";
import { insertRouter } from "./controllers/insertController.js";
import { updateRouter } from "./controllers/updateController.js";
import { joinRouter } from "./controllers/joinController.js";
import { initializeDatabase } from "./db/db.js";
import { projectRouter } from "./controllers/projectController.js";
import { groupByRouter } from "./controllers/groupByController.js";
import { divideRouter } from "./controllers/divideController.js";
import { deleteRouter } from "./controllers/deleteController.js";
import { selectionRouter } from "./controllers/selectionController.js";
import { havingRouter } from "./controllers/havingController.js";
import { nestedGroupByRouter } from "./controllers/nestedGroupByController.js";

const PORT = 4000;
const app = express();

// CORS settings to allow requests from any origin, allowing frontend to make requests to backend
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

await initializeDatabase();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/test", testRouter);
app.use("/update", updateRouter);
app.use("/insert", insertRouter);
app.use("/join", joinRouter);
app.use("/project", projectRouter);
app.use("/groupBy", groupByRouter);
app.use("/divide", divideRouter);
app.use("/delete", deleteRouter);
app.use("/select", selectionRouter);
app.use("/having", havingRouter);
app.use("/nestedGroupBy", nestedGroupByRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
