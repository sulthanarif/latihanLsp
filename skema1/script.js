function dynamicBubbleSort(data, sortType) {
    var n = data.length;
    for (var i = 0; i < n-1; i++) {
      var isSorted = true;
      for (var j = 0; j < n-i-1; j++) {
        
        if (sortType === "asc") {
          if (data[j] > data[j+1]) {
            // swap data[j] and data[j+1]
            var temp = data[j];
            data[j] = data[j+1];
            data[j+1] = temp;
            isSorted = false;
          }
        } 
        
        else if (sortType === "desc") {
          if (data[j] < data[j+1]) {
            // swap data[j] and data[j+1]
            var temp = data[j];
            data[j] = data[j+1];
            data[j+1] = temp;
            isSorted = false;
          }
        } else {
          console.log("Invalid sort type. Choose either 'asc' or 'desc'.");
          return data;
        }
      }
      if (isSorted) {
        break;
      }
    }
    return data;
}

function calculateMean(data) {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
      sum += data[i];
    }
    var mean = sum / data.length;
    return parseFloat(mean.toFixed(2));
}
  
function calculateMedian(data) {
var n = data.length;
if (n % 2 === 0) {
  return (data[n/2-1] + data[n/2]) / 2;
} else {
  return data[Math.floor(n/2)];
}
}

function calculateMode(data) {
  var mode = {};
  var maxCount = 0;
  var modes = [];
  for (var i in data) {
    mode[data[i]] = (mode[data[i]] || 0) + 1;
    if (mode[data[i]] > maxCount) {
      modes = [data[i]];
      maxCount = mode[data[i]];
    } else if (mode[data[i]] === maxCount) {
      modes.push(data[i]);
    }
  }
  if (modes.length === Object.keys(mode).length || maxCount < 2) {
    return "-";
  }
  return modes;
}

function calculateMax(data) {
  var max = Math.max(...data);
  return max;
}

function calculateMin(data) {
  var min = Math.min(...data);
  return min;
}

function sortData() {
var inputData = document.getElementById("inputData").value;
var data = inputData.split(",").map(Number);
var sortType = document.getElementById("sortType").value;
var sortedData = dynamicBubbleSort(data, sortType);
var result = `Data Yang Diurutkan (${sortType}): ${sortedData}` + "<br>";

var mean = calculateMean(sortedData);
var median = calculateMedian(sortedData);
var mode = calculateMode(sortedData);
var max = calculateMax(sortedData);
var min = calculateMin(sortedData);

if (inputData.trim() === "") { // cek apakah input kosong
  document.getElementById("result").innerHTML = "Data kosong!";
  return;
}

if(sortType != 'asc' && sortType != 'desc') { // cek apakah sort type valid atau tidak
  document.getElementById("result").innerHTML = "invalid sort type: " + sortType;
  return

}

result += "<br>Rata-Rata: " + mean + "<br>Nilai Tengah: " + median + "<br>Banyak data yang sering muncul: " + mode + "<br>Nilai Max: " + max + "<br> Nilai Min: " + min;
document.getElementById("result").innerHTML = result;
console.log(result);
} 

function clearData() {
  document.getElementById("inputData").value = "";
  document.getElementById("sortType").value = "sortType";
  document.getElementById("result").innerHTML = "";
}
