// Define types for data structures
export type HttpErrorCodeName = {
  [statusCode: string]: string;
};

export type LogEntry = {
  timestamp: string;
  method: string;
  statusCode: string;
};

export type EndpointCalls = {
  [endpoint: string]: number;
};

export type StatusCodes = {
  [statusName: string]: {
    statusCode: string;
    count: number;
  };
};

export type ApiCallsPerMinute = {
  [minuteTimestamp: string]: number;
};
