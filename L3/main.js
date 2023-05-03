const plotly = require('plotly')("MrHuntah", "gc88GvJUiL5oeeZX7ghM")
const N = 100
let firstColumn = [], secondColumn = [], thirdColumn = [], firstColumnB = [], secondColumnB = [], thirdColumnB = [];

for (let i = 0; i < N; i++) {
  firstColumn.push(Math.floor(Math.random() * 101));
}

firstColumn.sort((a, b) => a - b);

let sum = 0;
firstColumn.map(i => sum += i)
const tAverage = sum / N;

firstColumn.map(i => {
  secondColumn.push(Number(Math.pow((i - tAverage), 2).toFixed(2)))
})

sum = 0;
secondColumn.map(i => sum += i);
const fault = Math.sqrt(sum / N / (N - 1))
const dispersion = Math.sqrt(sum / N);
const maxHeight = 1 / (Math.sqrt(2 * Math.PI) * dispersion)

secondColumn.map(i => thirdColumn.push(Math.exp(-1 * i / 2
    / Math.pow(dispersion, 2)) / Math.sqrt(2 * Math.PI) / dispersion));

const min = Math.min.apply(null, firstColumn), max = Math.max.apply(null, firstColumn),
  delta = (max - min) / Math.sqrt(N);
let intervals = [];

for (let i = 0; i < Math.sqrt(N); i++) {
  let start, end;
  i === 0 ? start = min : start = intervals[i - 1].end
  end = start + delta
  intervals.push({
    start, end, numbers: []
  });
  firstColumn.map(n => {if (n >= start && n < end) intervals[i].numbers.push(n)});
  firstColumnB.push(intervals[i].numbers.length)
  secondColumnB.push(intervals[i].numbers.length / N / delta)
  if (i === 0) thirdColumnB.push(Math.exp(-1 * Math.pow(start - tAverage, 2)
    / 2 / Math.pow(dispersion, 2)) / Math.sqrt(2 * Math.PI) / dispersion)
  thirdColumnB.push(Math.exp(-1 * Math.pow(end - tAverage, 2) / 2
    / Math.pow(dispersion, 2)) / Math.sqrt(2 * Math.PI) / dispersion)
}

let table3 = [[], [], [], []];

for (let i = 0; i < 3; i++) {
  let s = tAverage - dispersion * (i + 1), e = tAverage + dispersion * (i + 1), sum = 0;
  firstColumn.map(n => {if (n >= s && n <= e) sum += 1})
  table3[0].push(s)
  table3[1].push(e)
  table3[2].push(sum)
  table3[3].push(sum / N)
}

let trace = {
  x: firstColumn,
  type: "histogram",
  histnorm: 'probability',
  name: "Гістограма вибірки",
  autobinx: false,
  xbins: {
    end: max,
    size: delta,
    start: min
  },
  marker: {
    color: "rgb(145, 71, 209)",
    line: {
      color: "rgb(255, 255, 255)",
      width: 1
    }
  },
}

let dots = [], start = min;
while (start <= max + 1) {
  dots.push(start)
  start += delta;
}

let trace2 = {
  x: firstColumn,
  y: thirdColumn,
  mode: 'lines',
  type: 'scatter',
  name: 'P',
  marker: {
    color: "rgb(100,164,208)"
  }
};

const data = {trace, trace2}

const layout = {fileopt: "overwrite", filename: "simple-node-example"};

plotly.plot(data, layout, function (err, msg) {
  if (err) return console.log(err);
  console.log('URL:', msg.url);
});

logTable([firstColumn, secondColumn, thirdColumn], ['t', '(t - {t})^2', 'p']);
logTable2([firstColumnB, secondColumnB, thirdColumnB], ['Δn', 'Δn/n/Δt', 'p'], intervals);
logTable3([table3[0], table3[1], table3[2], table3[3]], ['t1', 't2', 'n12', 'n12/N'], dispersion, tAverage)

console.log(`Випадкова похибка: ${fault * 1.67}`)

function logTable(values, names) {
  console.log(`     |${names.map(i => `${Array(Math.round((15 - i.length)/2))
    .join(" ")}${i}${Array(Math.round((15 - i.length)/2)).join(" ")}${i.length % 2 === 0 ? '' : ' '}`).join('|')}|`);
  values[0].map((i, index) => {
    console.log(`-----|${names.map(i => `${Array(15).join("-")}`).join('|')}|`)
    console.log(`t${index+1}${Array(5 - (index+1).toString().length).join(" ")}|${names.map((it, id) => 
    `${Array(Math.round((15 - Number(values[id][index].toFixed(4)).toString().length)/2))
      .join(" ")}${Number(values[id][index].toFixed(4))}${Array(Math.round((15 - 
      Number(values[id][index].toFixed(4)).toString().length)/2)).join(" ")}${Number(values[id][index]
      .toFixed(4)).toString().length % 2 === 0 ? '' : ' '}`).join('|')}|`)
  });
  console.log()
}

function logTable2(values, names, intervals) {
  console.log(`t1 - t2      |${names.map(i => `${Array(Math.round((15 - i.length)/2))
    .join(" ")}${i}${Array(Math.round((15 - i.length)/2)).join(" ")}${i.length % 2 === 0 ? '' : ' '}`).join('|')}|`);
  values[0].map((i, index) => {
    console.log(`-------------|${names.map(i => `${Array(15).join("-")}`).join('|')}|`)
    console.log(`${Number(intervals[index].start.toFixed(1))} - ${Number(intervals[index].end
      .toFixed(1))}${Array(11 - Number(intervals[index].start.toFixed(1)).toString().length - 
      Number(intervals[index].end.toFixed(1)).toString().length).join(" ")}|${names.map((it, id) => 
    `${Array(Math.round((15 - Number(values[id][index].toFixed(4)).toString().length)/2))
      .join(" ")}${Number(values[id][index].toFixed(4))}${Array(Math.round((15 - 
      Number(values[id][index].toFixed(4)).toString().length)/2)).join(" ")}${Number(values[id][index]
      .toFixed(4)).toString().length % 2 === 0 ? '' : ' '}`).join('|')}|`)
  });
  console.log()
}

function logTable3(values, names, dispersion, average) {
  console.log(`{t} ± σ          |${names.map(i => `${Array(Math.round((15 - i.length)/2))
    .join(" ")}${i}${Array(Math.round((15 - i.length)/2)).join(" ")}${i.length % 2 === 0 ? '' : ' '}`).join('|')}|`);
  values[0].map((i, index) => {
    console.log(`-----------------|${names.map(i => `${Array(15).join("-")}`).join('|')}|`)
    console.log(`${average.toFixed(2)} ± ${(dispersion * (index + 1))
      .toFixed(3)}${Array(5 - (index+1).toString().length).join(" ")}|${names.map((it, id) => 
    `${Array(Math.round((15 - Number(values[id][index].toFixed(4)).toString().length)/2))
      .join(" ")}${Number(values[id][index].toFixed(4))}${Array(Math.round((15 - 
      Number(values[id][index].toFixed(4)).toString().length)/2)).join(" ")}${Number(values[id][index]
      .toFixed(4)).toString().length % 2 === 0 ? '' : ' '}`).join('|')}|`)
  });
  console.log()
}