function displaySensorData(data) {
    document.getElementById('sensor-data').textContent = `Photodiode Sensor Value: ${data}`;
}

let sensorDataArray = [];
let altitudeDataArray = [];

function updateSensorChart(data) {
    sensorDataArray.push(data);

    if (sensorDataArray.length > 50) {
        sensorDataArray.shift();
    }

    const margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = document.getElementById('chart-container').offsetWidth - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

    d3.select("#sensor-chart").selectAll("*").remove();

    const svg = d3.select("#sensor-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, sensorDataArray.length - 1])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(sensorDataArray)])
        .range([height, 0]);

    const line = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d));

    svg.append("path")
        .datum(sensorDataArray)
        .attr("fill", "none")
        .attr("stroke", "#00d1b2")
        .attr("stroke-width", 2)
        .attr("d", line);

    // X Axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5));

    // Y Axis
    svg.append("g")
        .call(d3.axisLeft(y).ticks(5));
}


function updateAltitudeChart(data) {
    altitudeDataArray.push(data);

    if (altitudeDataArray.length > 50) {
        altitudeDataArray.shift();
    }

    const margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = document.getElementById('altitude-chart-container').offsetWidth - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

    d3.select("#altitude-chart").selectAll("*").remove();

    const svg = d3.select("#altitude-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleLinear()
        .domain([0, altitudeDataArray.length - 1])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 50]) // Altitude up to 50 km (stratosphere)
        .range([height, 0]);

    const line = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d));

    svg.append("path")
        .datum(altitudeDataArray)
        .attr("fill", "none")
        .attr("stroke", "#ff3860")
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5));

    svg.append("g")
        .call(d3.axisLeft(y).ticks(5));

    svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(50))
        .attr("x2", width)
        .attr("y2", y(50))
        .attr("stroke", "#ffdd57")
        .attr("stroke-dasharray", "4")
        .attr("stroke-width", 1);

    svg.append("text")
        .attr("x", width - 200)
        .attr("y", y(50) - 5)
        .attr("fill", "#ffdd57")
        .text("Stratosphere (50 km)");
}

function fetchSensorData() {
    const simulatedSensorData = parseFloat((Math.random() * 100).toFixed(2));
    displaySensorData(simulatedSensorData);
    updateSensorChart(simulatedSensorData);

    // Simulated altitude data (increasing over time up to 50 km)
    const simulatedAltitudeData = Math.min(50, altitudeDataArray.length * 1); // Increase by 1 km per second
    updateAltitudeChart(simulatedAltitudeData);
}

let missionLogEntries = [];
let missionLogIndex = 0;

function updateMissionLog() {
    const newEntry = `Log Entry ${missionLogIndex + 1}: Mission update at ${new Date().toLocaleTimeString()}`;
    missionLogEntries.push(newEntry);

    const missionLogList = document.getElementById('mission-log-list');

    const listItem = document.createElement('li');
    listItem.textContent = newEntry;
    missionLogList.appendChild(listItem);

    missionLogList.scrollTop = missionLogList.scrollHeight;

    missionLogIndex++;
}

setInterval(fetchSensorData, 1000);

setInterval(updateMissionLog, 5000);
