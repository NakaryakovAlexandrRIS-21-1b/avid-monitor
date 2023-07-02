import dotenv from "dotenv";
import ssh from "ssh2";
import * as parsers from "./parsers.js";

dotenv.config();
const { Client } = ssh;

let connGlobal; //дежурное подключения для быстрых запросов
createSSHConnection()
  .then((client) => {
    connGlobal = client;
  })
  .catch((err) => {
    console.error(err);
  });

export function createSSHConnection(user = "") {
  const conn = new Client();

  const connectOptions = {
    host: process.env.SSH_HOST,
    username: user || process.env.SSH_USER,
    password: user || process.env.SSH_USER,
  };

  return new Promise((resolve, reject) => {
    // Обработчик готовности соединения
    conn.on("ready", () => {
      console.log(`SSH подключение ${connectOptions.username} установлено`);
      resolve(conn);
    });
    // Обработчик ошибок соединения
    conn.on("error", (err) => {
      reject(new Error(`Ошибка SSH подключения: ${err.message}`));
    });

    // Обработчик закрытия соединения
    conn.on("close", () => {
      console.log("SSH подключение завершено");
    });

    conn.connect(connectOptions);
  });
}

export function closeSshConnection(conn) {
  conn.end();
}

export function executeCommand(command, conn) {
  const prom = new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) reject(err);

      let stdout = "";
      let stderr = "";

      stream.on("data", (data) => {
        stdout += data.toString();
      });

      stream.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      stream.on("close", (code, signal) => {
        resolve({ stdout, stderr, code, signal });
      });
    });
  });

  return prom;
}

export async function getSSHResult(command, conn = connGlobal) {
  if (!conn || !conn._sock) {
    // Проверка наличия SSH-соединения и сокета
    console.log("SSH подключение не готово к использованию");
    return "";
  }

  const result = await executeCommand(command, conn);

  if (
    command === "llstat" &&
    result.stdout.includes(
      "Nodes  CPU Memory Swap   KO Tasks  Nodes(Master)[Slave] Jobname"
    )
  ) {
    return parsers.parse_llstat(result.stdout);
  }

  return result.stdout;
}
