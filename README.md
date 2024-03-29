# Unomok Practical Task

This project is a Node.js application that analyzes log data from a file and provides insights into API endpoints, HTTP status codes, and API calls per minute. You can use different commands to generate specific reports based on the log data.


## Example output

![sample output](https://github.com/Anushka7310/unomok_practical_task/assets/61081130/f147d0de-2ab0-4de7-aaa2-5ca56441c954)

# Note:
Edit index.ts file to provide path of log file or use filepath arg in the command line as mentioned below


## Installation

Before running this project, make sure you have Node.js and npm (Node Package Manager) installed on your system. You'll also need TypeScript to run the code.

To install the required dependencies, open your terminal and navigate to the project directory. Then, run the following command:

```bash
npm install
```

## Usage

### Analyzing Log Data

To analyze log data and generate reports, use the following command:

```bash
npm start
```

This command reads the log data from the default file path (./data/prod-api-prod-out.log) and provides a summary of API endpoints, HTTP status codes, and API calls per minute.

### Generating Specific Reports

You can generate specific reports using the following commands:

- ## Endpoint Report:

```bash
npm run endpoints
```

This command generates a report of API endpoints and their usage.

- ## Status Code Report:

```bash
npm run statuscodes
```

This command generates a report of HTTP status codes and their counts.

- ## Minute-wise API Calls Report:

```bash
npm run minutes
```

This command generates a report of API calls per minute.

## Customizing the Log File

By default, the application reads log data from ./data/prod-api-prod-out.log. If you have a different log file to analyze, you can specify the file path using the filepath option. For example:

```bash
npm start filepath=path/to/your/logfile.log
```
