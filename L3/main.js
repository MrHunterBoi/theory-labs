const plotly = require('plotly')("Huntah", "36jaRqwzNzlj6iQtLA6k")
const N = 100
let firstColumn = [], secondColumn = [], thirdColumn = [], firstColumnB = [], secondColumnB = [], thirdColumnB = [];

for (let i = 0; i < N; i++) {
  firstColumn.push(Math.floor(Math.random() * 101));
}

firstColumn.sort((a, b) => a - b);
console.log(firstColumn)

let sum = 0;
firstColumn.map(i => sum += i)
const tAverage = sum / N;

firstColumn.map(i => secondColumn.push(Number(Math.pow((i - tAverage), 2).toFixed(2))))

sum = 0;
secondColumn.map(i => sum += i);
const dispersion = Math.sqrt(sum / N);
const maxHeight = 1 / (Math.sqrt(2 * Math.PI) * dispersion)

const min = Math.min.apply(null, firstColumn), max = Math.max.apply(null, firstColumn),
  delta = (max - min) / Math.sqrt(N);

let trace = {
  x: firstColumn,
  type: "histogram",
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

const layout = {fileopt: "overwrite", filename: "simple-node-example"};

plotly.plot(trace, layout, function (err, msg) {
  if (err) return console.log(err);
  // console.log('URL:', msg.url);
});

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

let table3 = [];

for (let i = 0; i < 3; i++) {
  let s = tAverage - dispersion * (i + 1), e = tAverage + dispersion * (i + 1), sum = 0;
  firstColumn.map(n => {if (n >= s && n <= e) sum += 1})
  table3.push([s, e, sum, sum / N])
}

console.log(table3)