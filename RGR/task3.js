const string = 'Нехай маємо початковий алфавіт із шести символів, які зустрічаються з ймовірностями. ' +
  'Так як кодування двійкове, то послідовність розіб’ємо на дві групи таким чином, ' +
  'щоб не змінювався порядок послідовності і сума ймовірностей приблизна була рівна між ними:';

let symbols = [], pArr = [];

for (const s of string) {
  if (s === ' ') continue
  let found = false;
  for (const l of symbols) {
    if (s.toLowerCase() === l.symbol) {
      l.number++;
      found = true;
      break;
    }
  }
  if (!found) symbols.push({symbol: s.toLowerCase(), number: 1});
}

symbols.sort((a, b) => a.number - b.number);
let sum = 0;

for (const s of symbols) {
  sum += s.number;
}

const tAverage = sum / symbols.length, dispersion = Math.sqrt(tAverage);

for (const s of symbols) {
  s.p = Math.exp(-1 * Math.pow(s.number - tAverage, 2) / 2
  / Math.pow(dispersion, 2)) / Math.sqrt(2 * Math.PI) / dispersion
}

console.log(symbols.map(a => `${a.symbol} - ${a.number} - ${a.p}`).join('\n'));
let tree = [];
divideNode(symbols, tree);
logCombinations(tree, '');

function divideNode(root, tree) {
  let i = 0, j = root.length - 1, node1 = [], node2 = [], sum1 = 0, sum2 = 0;
  do {
    if (sum1 <= sum2) {
      node1.push(root[i]);
      sum1 += root[i].p
      i++;
    }
    else {
      node2.push(root[j]);
      sum2 += root[j].p
      j--;
    }
  } while (i <= j);

  node2 = node2.sort((a, b) => a.number - b.number);
  node1.length <= 1 ? tree.push(node1[0]) : tree.push([]);
  node2.length <= 1 ? tree.push(node2[0]) : tree.push([]);

  if (node1.length > 1) divideNode(node1, tree[0]);
  if (node2.length > 1) divideNode(node2, tree[1]);
}

function logCombinations (root, string) {
  if (root[0]) {
    if (root[0].symbol) console.log(`${root[0].symbol} - ${string}0`);
    if (root[0].length > 1) logCombinations(root[0], string + '0');
  }

  if (root[1]) {
    if (root[1].symbol) console.log(`${root[1].symbol} - ${string}1`);
    if (root[1].length > 1) logCombinations(root[1], string + '1');
  }
}