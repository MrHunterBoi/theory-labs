const plotly = require('plotly')("Huntah", "36jaRqwzNzlj6iQtLA6k");
const fs = require('fs');
const N = 200

let numbers = [];

for (let i = 0; i < N; i++) {
  let rnd = parseFloat((Math.random() * 100 + 30).toFixed(1))
  numbers.push(rnd);
  fs.writeFile('numbers.txt', `${rnd} `, { flag: 'a+' }, err => {});
}

numbers.sort((a, b) => a - b);
const min = numbers[0], max = numbers[N - 1], h = Math.round((max - min) / (1 + 3.322 * Math.log10(N)));

let intervals = [], k = 0, data = [];

for (let i = min - h / 2; i < numbers[N - 1]; i += h) {
  let start, end;
  k === 0 ? start = Math.round(min - h / 2) : start = intervals[k - 1].end
  end = start + h
  intervals.push({
    start, end, numbers: []
  });
  numbers.map(n => {
    if (n >= start && n < end) intervals[k].numbers.push(n)
  });
  data.push([(start + end) / 2, intervals[k].numbers.length, intervals[k].numbers.length / N,
    intervals[k].numbers.length / N / h]);
  k++;
}

plotHistogram(numbers, min - h / 2, max, h, data)
logTable(data, ['Xi*', 'ni', 'ωi', 'ωi/h'], intervals);
additionalCalculations(data, N)

function logTable(values, names, intervals) {
  console.log(`[Xi; Xi+1]   |${names.map(i => `${Array(Math.round((15 - i.length) / 2))
    .join(" ")}${i}${Array(Math.round((15 - i.length) / 2)).join(" ")}${i.length % 2 === 0 ? '' : ' '}`).join('|')}|`);
  values.map((i, index) => {
    console.log(`-------------|${names.map(i => `${Array(15).join("-")}`).join('|')}|`)
    console.log(`[${Number(intervals[index].start.toFixed(1))} - ${Number(intervals[index].end
      .toFixed(1))})${Array(9 - Number(intervals[index].start.toFixed(1)).toString().length -
      Number(intervals[index].end.toFixed(1)).toString().length).join(" ")}|${names.map((it, id) =>
      `${Array(Math.round((15 - Number(values[index][id].toFixed(4)).toString().length) / 2))
        .join(" ")}${Number(values[index][id].toFixed(4))}${Array(Math.round((15 -
        Number(values[index][id].toFixed(4)).toString().length) / 2)).join(" ")}${Number(values[index][id]
        .toFixed(4)).toString().length % 2 === 0 ? '' : ' '}`).join('|')}|`)
  });
  console.log()
}

function additionalCalculations (data, N) {
  let m = 0;
  data.map(i => m += i[0] * i[1]);
  m /= N
  console.log(`m = ${m}`)

  let D = 0;
  data.map(i => {
    D += Math.pow(i[0] - m, 2) * i[1]
  });
  D /= N - 1
  console.log(`D = ${D}`)
}

function plotHistogram(values, min, max, h, result) {
  let trace = {
    x: values,
    type: "histogram",
    histnorm: 'probability density',
    name: "Гістограма вибірки",
    autobinx: false,
    xbins: {
      end: max,
      size: h,
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

  let dotsX = [], dotsY = [], start = min, k = 0;
  while (start <= max) {
    dotsX.push(start);
    dotsY.push(result[k][3])
    k++;
    start += h;
  }

  let trace2 = {
    x: dotsX,
    y: dotsY,
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
}