function parse_llstat(input) {
  const lines = input.trim().split("\n");
  const h_nodes = [
    "ID",
    "CPU",
    "RAM",
    "SWAP",
    "TASKS",
    "NODES",
    "MASTER",
    "SLAVES",
    "JOBNAME",
  ];
  const h_jobs = [
    "ID",
    "PRIORITY",
    "STATUS",
    "NODES",
    "TYPE",
    "POOL",
    "NAME",
    "PATH",
  ];
  let job_count = 0;
  let output = { time: [], nodes: [], jobs: [] };
  const data = lines.slice(1).map((line) => {
    let columns = line
      .replace("                ", " ? ")
      .replace(/ +/g, " ")
      .replace(/; /g, ";")
      .split(" ");
    if (line.startsWith("p")) {
      const obj = {};
      obj[h_nodes[0]] = parseInt(columns[0].match(/\d+/));
      obj[h_nodes[1]] = columns[1];
      obj[h_nodes[2]] = columns[2];
      obj[h_nodes[3]] = columns[3];
      obj[h_nodes[4]] = columns[4] === "?" ? "" : columns[4];
      obj[h_nodes[5]] = columns[5]?.split("(")[0] ?? "";
      obj[h_nodes[6]] = columns[5]?.split("(")[1]?.split(")")[0] ?? "";
      obj[h_nodes[7]] = columns[5]?.split("[")[1]?.split("]")[0] ?? "";
      obj[h_nodes[8]] = columns.slice(6).join("");
      output.nodes.push(obj);
    } else if (line.startsWith("Scheduled")) {
      line =
        "Scheduled job (15177836) waiting free node(s): 10-12 solver  ++--- p0182.37731.0     ko201/Platunova/POZ_100/100-07/100_07_8858_2mm/var1/job.cmd";
      const obj = {};
      obj[h_jobs[0]] = job_count;
      obj[h_jobs[1]] = columns[2]?.split("(")[1]?.split(")")[0] ?? "";
      obj[h_jobs[2]] = columns.slice(3).join(" ").split(":")[0];

      columns = columns.slice(3).join(" ").split(":")[1].trim().split(" ");
      obj[h_jobs[3]] = columns[0];
      obj[h_jobs[4]] = columns[1];
      obj[h_jobs[5]] = columns[2];
      obj[h_jobs[6]] = columns[3];
      obj[h_jobs[7]] = columns[4];
      job_count++;
      output.jobs.push(obj);
    } else if (line.startsWith("Time"))
      output.time.push(columns.slice(1).join(" "));
  });
  return output;
}

function parse_config(input) {
  // Поиск строк в секции &global.
  const globalRegex = /&global{([\S\s]+?)}/;
  const globalMatch = input.match(globalRegex);

  // Поиск строк в секции &pools.
  const poolsRegex = /&pools{([\S\s]+?)}/;
  const poolsMatch = input.match(poolsRegex);

  // Поиск строк в секции &reservs.
  const reservsRegex = /&reservs{([\S\s]+?)}/;
  const reservsMatch = input.match(reservsRegex);

  // Поиск строк в секции &node_notes.
  const nodeNotesRegex = /&node_notes{([\S\s]+?)}/;
  const nodeNotesMatch = input.match(nodeNotesRegex);

  // Поиск строк в секции &notes.
  const notesRegex = /&notes{([\S\s]+?)}/;
  const notesMatch = input.match(notesRegex);

  // Преобразование строк в формат JSON.
  const result = {};

  if (globalMatch) {
    const globalData = globalMatch[1].trim().split("\n");

    // Создаем объект со свойствами, аналогичными структуре внутри &global.
    const subResult = {};
    let currentKey = "";
    globalData.forEach((item) => {
      const [key, value] = item.split(":");
      if (key.trim() !== "") {
        subResult[key.trim()] = value?.trim() || "";
      }
    });

    result["global"] = subResult;
  }
  if (poolsMatch) {
    const poolsData = poolsMatch[1].trim().split("\n");

    // Создаем объект со свойствами, аналогичными структуре внутри &pools.
    const subResult = {};
    poolsData.forEach((item) => {
      const [key, value] = item.split(":");
      const ranges = value.trim().split(/,\s*/);
      subResult[key.trim()] = ranges.join(", ");
    });

    result["pools"] = subResult;
  }
  if (reservsMatch) {
    const reservsData = reservsMatch[1].trim().split("\n");

    // Создаем объект со свойствами, аналогичными структуре во всех полях внутри &reservs.
    const subResult = {};
    let currentGroup = ">default";
    reservsData.forEach((item) => {
      if (item.startsWith(">")) {
        currentGroup = item.substring(1).trim();
        subResult[currentGroup] = {};
      } else {
        const [key, value] = item.split(":");
        subResult[currentGroup][key.trim()] = value?.trim() ?? "";
      }
    });

    result["reservs"] = subResult;
  }
  if (nodeNotesMatch) {
    const nodeNotesData = nodeNotesMatch[1].trim().split("\n");

    // Создаем объект со свойствами на основе значений из &node_notes.
    const subResult = {};
    nodeNotesData.forEach((item) => {
      const [name, value] = item.split("-");
      subResult[name.trim()] = value.trim();
    });

    result["node_notes"] = subResult;
  }
  if (notesMatch) {
    result["notes"] = notesMatch[1];
  }

  return result;
}

function parse_users(input) {
  const rows = input.trim().split("\n");
  const headers = rows[0].trim().split(/\s*\|\s*/);
  const result = [];

  for (let i = 1; i < rows.length; i++) {
    if (!rows[i]) continue;
    const row = {};
    const columns = rows[i].trim().split(/\s*\|\s*/);
    if (columns.every((column) => !column)) continue; // проверяем, что не все значения столбцов пустые
    for (let j = 0; j < columns.length; j++) {
      row[headers[j]] = columns[j].trim();
    }
    result.push(row);
  }
  return result;
}

export { parse_llstat, parse_config, parse_users };
