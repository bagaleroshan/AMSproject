import { config } from "dotenv";

config();

export const port = process.env.PORT || 8000;
export const dbUrl = process.env.DB_URL || "mongodb://0.0.0.0:27017/ams";
export const mailUser = process.env.MAIL_USER || "jenishona123@gmail.com";
export const mailPass = process.env.MAIL_PASS || "misd oait jhwa vmxd";
export const mailProvider = process.env.MAIL_PROVIDER || "Jenis Hona";
export const secretKey = process.env.SECRET_KEY || "ams2024";
export const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
export const serverUrl = process.env.SERVER_URL || "http://localhost:8000";
export const defaultPassword = process.env.DEFAULT_PASS;

export const HttpStatus = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  MOVED_TEMPORARILY: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  REQUEST_TOO_LONG: 413,
  REQUEST_URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  IM_A_TEAPOT: 418,
  INSUFFICIENT_SPACE_ON_RESOURCE: 419,
  METHOD_FAILURE: 420,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  INSUFFICIENT_STORAGE: 507,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
};
export const staticFolder = process.env.STATIC_FOLDER || "./public";
export const validExtensions = [
  ".jpeg",
  ".jpg",
  ".JPG",
  ".JPEG",
  ".png",
  ".svg",
  ".doc",
  ".pdf",
  ".mp4",
  ".PNG",
];

export const options = {
  definition: {
    openapi: "3.0.0", // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description:
        "A sample API for learning Swagger in Express and TypeScript",
    },
    servers: [
      {
        url: "http://localhost:8000", // Your server URL
      },
    ],
  },
  apis: ["./src/Routes/*.ts"], // Path to your API routes
};
