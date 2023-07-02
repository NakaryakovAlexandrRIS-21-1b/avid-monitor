import dotenv from "dotenv";
import { Server } from "socket.io";
//import * as ssh from "./ssh.js";
import * as db from "./db.js";

dotenv.config();

const io = new Server(process.env.PORT_WS, {});
console.log(`Сервер слушает порт ${process.env.PORT_WS} (ws)`);

// Обработчик подключения нового клиента
io.on("connection", function (socket) {
  socket.data.username = socket.handshake.query.userAuth;
  console.log(
    "Новое подключение " +
      socket.id.toString().substring(0, 5) +
      " " +
      socket.data.username
  );

  // Обработчик сообщений от клиента
  socket.on("auth", async (req, res) => {
    try {
      const result = await db.query(
        `select id from users_tbl where login = '${req.log}'`
      );
      console.log(result);
      if (result.length === 0) {
        socket.emit("message", `Пользователь ${req.log} не найден`);
        socket.disconnect();
        console.log(`Пользователь ${req.log} не найден`);
      } else {
        // Ваши действия при успешной аутентификации пользователя
        socket.username = req.log;
        try {
          const ssh_res = await ssh.getSSHResult("llstat");
          socket.emit("message", ssh_res);
        } catch (err) {
          console.error(err);
        }
      }
    } catch (error) {
      socket.emit("message", "Отсутствует подключение к БД");
      socket.disconnect();
      console.log(error.message);
    }
  });
  socket.on("loadStat", async (req, res) => {
    try {
      const result = await db.query(
        "SELECT * FROM load_stat_tbl ORDER by date"
      );
      socket.emit("loadStat", result);
    } catch (error) {
      socket.emit("loadStat", {});
      console.log(error.message);
    }
  });

  // Обработчик сообщений от клиента
  socket.on("message", function (message) {
    console.log(
      `Получено сообщение от ${socket.id.toString().substring(0, 5)}:`,
      message
    );

    // Отправляем сообщение обратно клиенту
    socket.emit(
      "message",
      "Вы сказали: " +
        message +
        " ваш ID: " +
        socket.id.toString().substring(0, 5)
    );
  });

  // Обработчик закрытия соединения клиентом
  socket.on("disconnect", function () {
    console.log(
      "Соединение закрыто " +
        socket.id.toString().substring(0, 5) +
        " " +
        socket.data?.username ?? "Unauthorized"
    );
  });
});

//Функция для отправки сообщения
export function sendMessage(type, users, text) {
  if (users === "all") {
    if (text) io.emit(type, text);
  } else {
    // const sockets = io.of("/").sockets;
    // const clients = Array.from(sockets.keys()).map((client) =>
    //   client.slice(0, 5)
    // );
    // console.log(sockets.size + ": " + clients); // выводим ключи в виде массива
    // 	if (sockets.size > 1) {
    // 		//пример обращения к конкретному пользователю
    // 		const targetSocket = io.sockets.to(clients[0]);
    // 		targetSocket.emit("message", "Псс, тут еще кто то есть");
    // 	}
  }
}
