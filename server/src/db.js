import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const connectOptions = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASS),
  port: process.env.DB_PORT,
  options: "-c client_encoding=utf8",
};

const pool = new Pool(connectOptions);

// Установка слушателя базы данных
pool.on("connect", () => {
  // Регистрация слушателя на события изменения
  pool
    .query("LISTEN load_stat_upd")
    .then(() => {
      console.log("Ожидание изменений в таблице...");
    })
    .catch((err) => console.error("Ошибка прослушивания канала:", err));
});

// Обработка событий изменения базы данных
pool.on("notification", (msg) => {
  const [tableName, operation] = msg.payload.split(":");
  console.log(`Изменение в таблице ${tableName}: операция ${operation}`);
  handleDatabaseEvent(msg.payload);
});

async function query(text) {
  try {
    const result = await pool.query(text);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
  }
}

export { query };
