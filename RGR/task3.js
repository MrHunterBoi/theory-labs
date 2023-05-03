const string = 'Нехай маємо початковий алфавіт із шести символів, які зустрічаються з ймовірностями. ' +
  'Так як кодування двійкове, то послідовність розіб’ємо на дві групи таким чином, ' +
  'щоб не змінювався порядок послідовності і сума ймовірностей приблизна була рівна між ними:'

let symbols = []

for (const s of string) {
  if (s === ' ') continue
  let found = false;
  for (const l of symbols) {
    if (s.toLowerCase() === l.symbol) {
      l.number++;
      found = true;
    }
  }
  if (!found) symbols.push({symbol: s.toLowerCase(), number: 1});
}

symbols.sort((a, b) => a.number - b.number);

console.log(symbols)