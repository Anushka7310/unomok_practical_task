const fs = require("fs");
const logFilePath = "./data/prod-api-prod-out.log";
const httpStatusCodeName = require("./http-Error-Code-Names.json");
const argv = process.argv.slice(2);

fs.readFile(logFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const logLines = data.split("\n");
  const endpointCalls = {};
  const statusCodes = {};
  const apiCallsPerMinute = {};

  logLines.forEach((line) => {
    const match = line.match(
      /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}).*?(GET|POST|PUT|DELETE|HEAD|OPTIONS|TRACE) .*? (\d{3})\b/
    );
    if (match) {
      const timestamp = match[1];
      const statusCode = match[3];
      const statusName = httpStatusCodeName[statusCode];

      if (!statusCodes[statusName]) {
        statusCodes[statusName] = {
          statusCode,
          count: 1,
        };
      } else {
        statusCodes[statusName].count++;
      }

      // Calculate API calls per minute
      const minuteTimestamp = timestamp.substring(0, 16); // Extract the minute portion
      if (!apiCallsPerMinute[minuteTimestamp]) {
        apiCallsPerMinute[minuteTimestamp] = 1;
      } else {
        apiCallsPerMinute[minuteTimestamp]++;
      }
    }

    const endpointMatch = line.match(/"([A-Z]+) (\/\S+) HTTP\/1\.\d+"/);
    if (endpointMatch) {
      const endpoint = endpointMatch[2];

      if (!endpointCalls[endpoint]) {
        endpointCalls[endpoint] = 1;
      } else {
        endpointCalls[endpoint]++;
      }
    }
  });
  const table = argv[0].replace("--table=", "");
  if (table === "endpoint") {
    console.table(endpointCalls);
  } else if (table === "statusCode") {
    console.table(statusCodes);
  } else if (table === "minute") {
    console.table(apiCallsPerMinute);
  } else {
    console.table(endpointCalls);
    console.table(statusCodes);
    console.table(apiCallsPerMinute);
  }
});
