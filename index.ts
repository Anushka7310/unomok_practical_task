import * as process from "process"; // Import process module for command line arguments
import * as fs from "fs";
import httpStatusCodeNames from "./http-Error-Code-Names.json";
import { ApiCallsPerMinute, EndpointCalls, StatusCodes } from "./types";

const argv = process.argv.slice(2); // Extract command line arguments

// Determine the log file path from the command line arguments or use a default path
const logFilePath: string =
  argv[1]?.replace("filepath=", "") || "./data/prod-api-prod-out.log";

// Read the log file
fs.readFile(logFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Split the log file into lines
  const logLines: string[] = data.split("\n");

  // Initialize empty objects to store data
  const endpointCalls: EndpointCalls = {};
  const statusCodes: StatusCodes = {};
  const apiCallsPerMinute: ApiCallsPerMinute = {};

  // Iterate through each log line
  logLines.forEach((line) => {
    // Match the log line to extract timestamp, HTTP method, and HTTP status code
    const match = line.match(
      /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}).*?(GET|POST|PUT|DELETE|HEAD|OPTIONS|TRACE) .*? (\d{3})\b/
    );

    if (match) {
      const [_, timestamp, method, statusCode] = match;

      // Count occurrences of each HTTP status code
      const statusName = httpStatusCodeNames[statusCode];

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

    // Match the log line to extract the HTTP method and endpoint
    const endpointMatch = line.match(/"([A-Z]+) (\/\S+) HTTP\/1\.\d+"/);
    if (endpointMatch) {
      const [_, method, endpoint] = endpointMatch;

      // Count occurrences of each endpoint
      if (!endpointCalls[endpoint]) {
        endpointCalls[endpoint] = 1;
      } else {
        endpointCalls[endpoint]++;
      }
    }
  });

  // Determine which table to print based on the provided command line argument
  const table = argv[0]?.replace("--table=", "");
  if (table === "endpoint") {
    // Print the table of endpoint calls
    console.table(endpointCalls);
  } else if (table === "statusCode") {
    // Print the table of HTTP status codes and their counts
    console.table(statusCodes);
  } else if (table === "minute") {
    // Print the table of API calls per minute
    console.table(apiCallsPerMinute);
  } else {
    // If no valid table argument is provided, print all tables
    console.table(endpointCalls);
    console.table(statusCodes);
    console.table(apiCallsPerMinute);
  }
});
