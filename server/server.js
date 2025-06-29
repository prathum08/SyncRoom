import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io"

const app = express();
const server = http.createServer(app)

//Initialise socket.io
export const io = new Server(server , {
    cors: {origins: "*"}
})

//store online users
export const userSocketMap = {}  // {userId: socketId}

//Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit online users to all connected users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ✅ Correct event listener
  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});


//Middleware
app.use(express.json({limit: "4mb"}));
app.use(cors());


//Router Setup
app.get("/api/status" ,(req ,res) => res.send("Server is live"));
app.use("/api/auth" , userRouter);
app.use("/api/messages" , messageRouter)

await connectDB();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
}

// exporting server for vercel

export default server;

