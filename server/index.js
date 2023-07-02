import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import * as ws from "./src/webSocket.js";
import * as ssh from "./src/ssh.js";
import * as db from "./src/db.js";
import * as parsers from "./src/parsers.js";
import * as sF from "./src/subFuncs.js";

const app = express();
dotenv.config();

//Middleware
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT_HTTP, process.env.HOST, () => {
  console.log(`Сервер слушает порт ${process.env.PORT_HTTP} (http)`);
});

app.get("/api/hello", async (req, res) => {
  const ssh_res = await ssh.getSSHResult("llstat");
  res.json({ message: ssh_res });
});
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM load_stat_tbl ORDER by date");
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get("/fill", async (req, res) => {
  const users = parsers.parse_users(fs.readFileSync("users.txt", "utf-8"));
  users.forEach(async (data) => {
    try {
      const numIterations = Math.min(
        data.VNC337.split(",").length,
        data.VNC338.split(",").length
      );
      for (let i = 0; i < numIterations; i++) {
        const result = await db.query(`
          INSERT INTO users_tbl (login, role, name, vnc337, vnc338)
          VALUES ('${data.ko}/${data.login}', ${data?.role ?? false}, ${
          data.name ? "'" + data.name + "'" : "'none'"
        }, ${data.VNC337.split(",")[i] ? data.VNC337.split(",")[i] : 0}, ${
          data.VNC338.split(",")[i] ? data.VNC338.split(",")[i] : 0
        });
        `);
      }
    } catch (error) {
      console.log(error.message);
      console.log(`
        INSERT INTO users_tbl (login, role, name, vnc337, vnc338)
        VALUES (${data.login}, ${data?.role ?? false}, ${
        data.name ? data.name : "none"
      }, ${data.VNC337 ? data.VNC337 : 0}, ${data.VNC338 ? data.VNC338 : 0});
        `);
    }
  });
});

// // Обработчик подключения нового клиента
// const io = new Server(process.env.PORT_WS, {});
// io.on("connection", function (socket) {
//   socket.data.username = socket.handshake.query.userAuth;
//   console.log(
//     "Новое подключение " +
//       socket.id.toString().substring(0, 5) +
//       " " +
//       socket.data.username
//   );

//   // Обработчик сообщений от клиента
//   socket.on("auth", async (req, res) => {
//     try {
//       const result = await db.query(
//         `select id from users_tbl where login = \'${req.log}\'`
//       );
//       console.log(result);
//       if (result.length === 0) {
//         socket.emit("message", "Пользователь не найден");
//         socket.disconnect();
//       }
//     } catch (error) {
//       socket.emit("message", "Отсутствует подключение к БД");
//       socket.disconnect();
//       console.log(error.message);
//     }
//   });

//   socket.on("fill", function (message) {
//     //const config = parsers.parse_config(fs.readFileSync("config.txt", "utf-8"));
//     const users = parsers.parse_users(fs.readFileSync("users.txt", "utf-8"));

//     // Читаем содержимое файла и парсим его как JSON объект
//     //const data = JSON.parse(users);

//     console.log(users[0].ko);

//     users.forEach(async (data) => {
//       try {
//         const result = await db.query(`
//             INSERT INTO users_tbl (login, role, name, vnc337, vnc338)
//             VALUES (\'${data.login}\', ${data?.role ?? false}, ${
//           data.name ? "'" + data.name + "'" : "'none'"
//         }, ${data.VNC337.split(",")[0] ? data.VNC337.split(",")[0] : 0}, ${
//           data.VNC338.split(",")[0] ? data.VNC338.split(",")[0] : 0
//         });
//             `);
//       } catch (error) {
//         console.log(error.message);
//         console.log(`
//             INSERT INTO users_tbl (login, role, name, vnc337, vnc338)
//             VALUES (${data.login}, ${data?.role ?? false}, ${
//           data.name ? data.name : "none"
//         }, ${data.VNC337 ? data.VNC337 : 0}, ${data.VNC338 ? data.VNC338 : 0});
//             `);
//       }
//     });

//     socket.emit("message", "Заполняю базу");
//   });

//   // Обработчик сообщений от клиента
//   socket.on("message", function (message) {
//     console.log(
//       `Получено сообщение от ${socket.id.toString().substring(0, 5)}:`,
//       message
//     );

//     // Отправляем сообщение обратно клиенту
//     socket.emit(
//       "message",
//       "Вы сказали: " +
//         message +
//         " ваш ID: " +
//         socket.id.toString().substring(0, 5)
//     );
//   });

//   // Обработчик закрытия соединения клиентом
//   socket.on("disconnect", function () {
//     console.log(
//       "Соединение закрыто " +
//         socket.id.toString().substring(0, 5) +
//         " " +
//         socket.data?.username ?? "Unauthorized"
//     );
//   });
// });

// Каждые 10 секунд вызываем функцию для отправки оповещения
setInterval(async () => {
  try {
    const ssh_res = await ssh.getSSHResult("llstat");
    ws.sendMessage("report", "all", { message: ssh_res });
  } catch (err) {
    console.error(err);
  }
}, 10000);

//fs.writeFileSync("output.json", JSON.stringify(users, null, 2)); // записываем данные в файл output.json
