let count = 0;

const Supersector = {
"0000": "Total nonfarm",
"0500": "Total private",
"0600": "Goods-producing",
"0700": "Service-providing",
"0800": "Private service-providing",
"1000": "Mining and logging",
"2000": "Construction",
"3000": "Manufacturing",
"3100": "Durable Goods",
"3200": "Nondurable Goods",
"4000": "Trade, transportation, and utilities",
"4142": "Wholesale trade",
"4200": "Retail trade",
"4300": "Transportation and warehousing",
"4422": "Utilities",
"5000": "Information",
"5500": "Financial activities",
"6000": "Professional and business services",
"6500": "Education and health services",
"7000": "Leisure and hospitality",
"8000": "Other services",
"9000": "Government"
};
let SupersectorKeys = Object.keys(Supersector);


const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    salmon: 'rgb(250, 128, 114)',
    coral: 'rgb(255, 127, 80)',
    gold: 'rgb(255, 215, 0)',
    lightblue: 'rgb(153, 255, 255)',
    darkgreen: 'rgb(19, 114, 22)',
    darkblue: 'rgb(0, 0, 102)',
    darkred: 'rgb(153, 0, 0)',
    skyblue: 'rgb(153, 204, 255)',
    olive: 'rgb(128, 128, 0)',
    aqua: 'rgb(0, 255, 255)',
    teal: 'rgb(0, 153, 153)',
    lime: 'rgb(0, 255, 0)',
    thistle: 'rgb(216, 191, 216)',
    lightgreen: 'rgb(146, 255, 150)',
    wheat: 'rgb(245, 222, 179)'
  };
let CHART_COLORS_KEYS = Object.keys(CHART_COLORS);
  
const CHART_COLORS_50_Percent = {
  red: 'rgba(255, 99, 132, 0.5)',
  orange: 'rgba(255, 159, 64, 0.5)',
  yellow: 'rgba(255, 205, 86, 0.5)',
  green: 'rgba(75, 192, 192, 0.5)',
  blue: 'rgba(54, 162, 235, 0.5)',
  purple: 'rgba(153, 102, 255, 0.5)',
  grey: 'rgba(201, 203, 207, 0.5)',
  salmon: 'rgba(250, 128, 114, 0.5)',
  coral: 'rgba(255, 127, 80, 0.5)',
  gold: 'rgba(255, 215, 0, 0.5)',
  lightblue: 'rgba(153, 255, 255, 0.5)',
  darkgreen: 'rgba(19, 114, 22, 0.5)',
  darkblue: 'rgba(0, 0, 102, 0.5)',
  darkred: 'rgba(153, 0, 0, 0.5)',
  skyblue: 'rgba(153, 204, 255, 0.5)',
  olive: 'rgba(128, 128, 0, 0.5)',
  aqua: 'rgba(0, 255, 255, 0.5)',
  teal: 'rgba(0, 153, 153, 0.5)',
  lime: 'rgba(0, 255, 0, 0.5)',
  thistle: 'rgba(216, 191, 216, 0.5)',
  lightgreen: 'rgba(146, 255, 150, 0.5)',
  wheat: 'rgba(245, 222, 179, 0.5)'
    };
let CHART_COLORS_50_Percent_KEY = Object.keys(CHART_COLORS_50_Percent);

let flag = false; 
function responseHandler() {
    if (this.status == 200) {
      let dataArray = this.response.Results.series[0].data;
 let seriesID = this.response.Results.series[0].seriesID;
      let givenLine = {
 label: "",
 data:[],
 borderColor: "",
 backgroundColor: "",
 hidden:true
}




givenLine.label = (Supersector[seriesID.substring(3,7)]);
givenLine.borderColor = (CHART_COLORS_KEYS[count]);
givenLine.backgroundColor = (CHART_COLORS_50_Percent_KEY[count]);
if(flag == false){
 for (let i = dataArray.length -1; i >= 0; i--) { 
data.labels.push(dataArray[i].periodName + " " + dataArray[i].year);
flag = true; 
}}
for(let i = dataArray.length -1; i >= 0; i--) {
givenLine.data.push(dataArray[i].value); 
}




data.datasets.push(givenLine);
count++

    console.log(this.response);
    }else {
    console.log ("error");
    }
}
    const data = {
      labels: [],
      datasets: []
    };


    
const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'US Labor Statistics: Number of Employees (thousands)'
        }
      }
    }
  };


const myChart = new Chart(
    document.getElementById('myChart'),
      config);


for (i = 0; i < SupersectorKeys.length; i++){
let test = new XMLHttpRequest()
test.addEventListener("load", responseHandler);
let x = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
let z = "000001?registrationkey=a1dcdbd8737247f583070bf7e429b164";
test.open("GET", x + SupersectorKeys[i] + z);
test.responseType = "json";
test.send();
}
