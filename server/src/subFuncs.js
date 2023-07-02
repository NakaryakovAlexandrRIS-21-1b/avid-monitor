function intervalToList(interval) {
  const parts = interval
    .replace(/ ?- ?/g, "-")
    .replace(/ ?, ?/g, ",")
    .split(",");
  let nums = [];
  for (let part of parts) {
    const [start, end] = part.split("-");
    for (let i = Number(start); i <= Number(end); i++) {
      nums.push(i);
    }
  }
  nums.sort((a, b) => a - b);
  const result = nums.join(", ");
  return result;
}

function listToInterval(list) {
  const nums = list.replace(/ ?, ?/g, ",").split(",").map(Number);
  nums.sort((a, b) => a - b);
  let intervals = "";
  let i = 0;
  while (i < nums.length) {
    let start = nums[i];
    let end = start;
    while (i < nums.length - 1 && nums[i + 1] === nums[i] + 1) {
      end = nums[i + 1];
      i++;
    }
    if (start === end) {
      intervals += `${start}`;
    } else {
      intervals += `${start}-${end}`;
    }
    if (i < nums.length - 1) {
      intervals += ", ";
    }
    i++;
  }
  return intervals;
}

function compareStrings(str1, str2) {
  const list1 = str1.replace(/ ?, ?/g, ",").split(",").map(Number);
  const list2 = str2.replace(/ ?, ?/g, ",").split(",").map(Number);

  const set2 = new Set(list2);
  const missingElems = [...set2]
    .filter((elem) => !list1.includes(elem))
    .map(String);
  return missingElems.join(", ");
}

function calculateStrings(old, add, rmv) {
  let lst1 = old.replace(/ ?, ?/g, ",").split(",").map(Number);
  let lst2 = add.replace(/ ?, ?/g, ",").split(",").map(Number);
  let lst3 = rmv.replace(/ ?, ?/g, ",").split(",").map(Number);

  // Удаляем из первого массива все элементы, которые есть в третьем массиве
  let set3 = new Set(lst3);
  let result_set = new Set(lst1.filter((x) => !set3.has(x)));
  // Объединяем первый массив с вторым
  lst2.forEach((x) => result_set.add(x));

  // Преобразуем множество чисел в строку и возвращаем её
  return Array.from(result_set)
    .sort((a, b) => a - b)
    .join(", ");
}

export { intervalToList, listToInterval, compareStrings, calculateStrings };
