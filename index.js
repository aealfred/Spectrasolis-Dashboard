function displaySensorData(data) {
    document.getElementById('sensor-data').textContent = `Photodiode Sensor Value: ${data}`;
}

let sensorDataArray = [];
let altitudeDataArray = [];

function updateSensorChart(data) {
    // Append new data point
    sensorDataArray.push(data);

    // Keep only the last 50 data points
    if (sensorDataArray.length > 50) {
        sensorDataArray.shift();
    }

    // Set up dimensions and margins
    const margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = document.getElementById('chart-container').offsetWidth - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

    // Remove any existing SVG content
    d3.select("#sensor-chart").selectAll("*").remove();

    const svg = d3.select("#sensor-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x = d3.scaleLinear()
        .domain([0, sensorDataArray.length - 1])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(sensorDataArray)])
        .range([height, 0]);

    // Define the line
    const line = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d));

    // Add the line path
    svg.append("path")
        .datum(sensorDataArray)
        .attr("fill", "none")
        .attr("stroke", "#00d1b2")
        .attr("stroke-width", 2)
        .attr("d", line);

    // Add the X Axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y).ticks(5));
}


function updateAltitudeChart(data) {
    // Append new data point
    altitudeDataArray.push(data);

    // Keep only last 50 data points
    if (altitudeDataArray.length > 50) {
        altitudeDataArray.shift();
    }

    // Set up dimensions and margins
    const margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = document.getElementById('altitude-chart-container').offsetWidth - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

    // Remove any existing SVG content
    d3.select("#altitude-chart").selectAll("*").remove();

    // Create SVG
    const svg = d3.select("#altitude-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x = d3.scaleLinear()
        .domain([0, altitudeDataArray.length - 1])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 50]) // Altitude up to 50 km (stratosphere)
        .range([height, 0]);

    // Define the line
    const line = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d));

    // Add the line path
    svg.append("path")
        .datum(altitudeDataArray)
        .attr("fill", "none")
        .attr("stroke", "#ff3860")
        .attr("stroke-width", 2)
        .attr("d", line);

    // Add the X Axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y).ticks(5));

    // Add a line indicating the stratosphere boundary (50 km)
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(50))
        .attr("x2", width)
        .attr("y2", y(50))
        .attr("stroke", "#ffdd57")
        .attr("stroke-dasharray", "4")
        .attr("stroke-width", 1);

    // Add label for stratosphere boundary
    svg.append("text")
        .attr("x", width - 200)
        .attr("y", y(50) - 5)
        .attr("fill", "#ffdd57")
        .text("Stratosphere (50 km)");
}

function fetchSensorData() {
    // Simulated data for demonstration purposes
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
    // Simulated mission log entries
    const newEntry = `Log Entry ${missionLogIndex + 1}: Mission update at ${new Date().toLocaleTimeString()}`;
    missionLogEntries.push(newEntry);

    const missionLogList = document.getElementById('mission-log-list');

    // Add new entry to the mission log
    const listItem = document.createElement('li');
    listItem.textContent = newEntry;
    missionLogList.appendChild(listItem);

    // Scroll to the bottom of the mission log
    missionLogList.scrollTop = missionLogList.scrollHeight;

    missionLogIndex++;
}

// Fetch sensor data every second
setInterval(fetchSensorData, 1000);

// Update mission log every 5 seconds
setInterval(updateMissionLog, 5000);
