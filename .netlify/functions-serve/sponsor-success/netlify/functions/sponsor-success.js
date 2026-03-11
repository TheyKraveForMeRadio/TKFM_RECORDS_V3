var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/node_modules/stripe/cjs/crypto/CryptoProvider.js
var require_CryptoProvider = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/crypto/CryptoProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CryptoProviderOnlySupportsAsyncError = exports2.CryptoProvider = void 0;
    var CryptoProvider = class {
      /**
       * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
       * The output HMAC should be encoded in hexadecimal.
       *
       * Sample values for implementations:
       * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
       * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
       */
      computeHMACSignature(payload, secret) {
        throw new Error("computeHMACSignature not implemented.");
      }
      /**
       * Asynchronous version of `computeHMACSignature`. Some implementations may
       * only allow support async signature computation.
       *
       * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
       * The output HMAC should be encoded in hexadecimal.
       *
       * Sample values for implementations:
       * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
       * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
       */
      computeHMACSignatureAsync(payload, secret) {
        throw new Error("computeHMACSignatureAsync not implemented.");
      }
      /**
       * Computes a SHA-256 hash of the data.
       */
      computeSHA256Async(data) {
        throw new Error("computeSHA256 not implemented.");
      }
    };
    exports2.CryptoProvider = CryptoProvider;
    var CryptoProviderOnlySupportsAsyncError = class extends Error {
    };
    exports2.CryptoProviderOnlySupportsAsyncError = CryptoProviderOnlySupportsAsyncError;
  }
});

// netlify/functions/node_modules/stripe/cjs/crypto/NodeCryptoProvider.js
var require_NodeCryptoProvider = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/crypto/NodeCryptoProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NodeCryptoProvider = void 0;
    var crypto2 = require("crypto");
    var CryptoProvider_js_1 = require_CryptoProvider();
    var NodeCryptoProvider = class extends CryptoProvider_js_1.CryptoProvider {
      /** @override */
      computeHMACSignature(payload, secret) {
        return crypto2.createHmac("sha256", secret).update(payload, "utf8").digest("hex");
      }
      /** @override */
      async computeHMACSignatureAsync(payload, secret) {
        const signature = await this.computeHMACSignature(payload, secret);
        return signature;
      }
      /** @override */
      async computeSHA256Async(data) {
        return new Uint8Array(await crypto2.createHash("sha256").update(data).digest());
      }
    };
    exports2.NodeCryptoProvider = NodeCryptoProvider;
  }
});

// netlify/functions/node_modules/stripe/cjs/net/HttpClient.js
var require_HttpClient = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/net/HttpClient.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.HttpClientResponse = exports2.HttpClient = void 0;
    var HttpClient = class _HttpClient {
      /** The client name used for diagnostics. */
      getClientName() {
        throw new Error("getClientName not implemented.");
      }
      makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        throw new Error("makeRequest not implemented.");
      }
      /** Helper to make a consistent timeout error across implementations. */
      static makeTimeoutError() {
        const timeoutErr = new TypeError(_HttpClient.TIMEOUT_ERROR_CODE);
        timeoutErr.code = _HttpClient.TIMEOUT_ERROR_CODE;
        return timeoutErr;
      }
    };
    exports2.HttpClient = HttpClient;
    HttpClient.CONNECTION_CLOSED_ERROR_CODES = ["ECONNRESET", "EPIPE"];
    HttpClient.TIMEOUT_ERROR_CODE = "ETIMEDOUT";
    var HttpClientResponse = class {
      constructor(statusCode, headers) {
        this._statusCode = statusCode;
        this._headers = headers;
      }
      getStatusCode() {
        return this._statusCode;
      }
      getHeaders() {
        return this._headers;
      }
      getRawResponse() {
        throw new Error("getRawResponse not implemented.");
      }
      toStream(streamCompleteCallback) {
        throw new Error("toStream not implemented.");
      }
      toJSON() {
        throw new Error("toJSON not implemented.");
      }
    };
    exports2.HttpClientResponse = HttpClientResponse;
  }
});

// netlify/functions/node_modules/stripe/cjs/net/NodeHttpClient.js
var require_NodeHttpClient = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/net/NodeHttpClient.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NodeHttpClientResponse = exports2.NodeHttpClient = void 0;
    var http_ = require("http");
    var https_ = require("https");
    var HttpClient_js_1 = require_HttpClient();
    var http3 = http_.default || http_;
    var https2 = https_.default || https_;
    var defaultHttpAgent = new http3.Agent({ keepAlive: true });
    var defaultHttpsAgent = new https2.Agent({ keepAlive: true });
    var NodeHttpClient = class extends HttpClient_js_1.HttpClient {
      constructor(agent) {
        super();
        this._agent = agent;
      }
      /** @override. */
      getClientName() {
        return "node";
      }
      makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        const isInsecureConnection = protocol === "http";
        let agent = this._agent;
        if (!agent) {
          agent = isInsecureConnection ? defaultHttpAgent : defaultHttpsAgent;
        }
        const requestPromise = new Promise((resolve, reject) => {
          const req = (isInsecureConnection ? http3 : https2).request({
            host,
            port,
            path,
            method,
            agent,
            headers,
            ciphers: "DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5"
          });
          req.setTimeout(timeout, () => {
            req.destroy(HttpClient_js_1.HttpClient.makeTimeoutError());
          });
          req.on("response", (res) => {
            resolve(new NodeHttpClientResponse(res));
          });
          req.on("error", (error) => {
            reject(error);
          });
          req.once("socket", (socket) => {
            if (socket.connecting) {
              socket.once(isInsecureConnection ? "connect" : "secureConnect", () => {
                req.write(requestData);
                req.end();
              });
            } else {
              req.write(requestData);
              req.end();
            }
          });
        });
        return requestPromise;
      }
    };
    exports2.NodeHttpClient = NodeHttpClient;
    var NodeHttpClientResponse = class extends HttpClient_js_1.HttpClientResponse {
      constructor(res) {
        super(res.statusCode, res.headers || {});
        this._res = res;
      }
      getRawResponse() {
        return this._res;
      }
      toStream(streamCompleteCallback) {
        this._res.once("end", () => streamCompleteCallback());
        return this._res;
      }
      toJSON() {
        return new Promise((resolve, reject) => {
          let response = "";
          this._res.setEncoding("utf8");
          this._res.on("data", (chunk) => {
            response += chunk;
          });
          this._res.once("end", () => {
            try {
              resolve(JSON.parse(response));
            } catch (e2) {
              reject(e2);
            }
          });
        });
      }
    };
    exports2.NodeHttpClientResponse = NodeHttpClientResponse;
  }
});

// netlify/functions/node_modules/stripe/cjs/utils.js
var require_utils = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseHeadersForFetch = exports2.parseHttpHeaderAsNumber = exports2.parseHttpHeaderAsString = exports2.getAPIMode = exports2.jsonStringifyRequestData = exports2.concat = exports2.createApiKeyAuthenticator = exports2.determineProcessUserAgentProperties = exports2.validateInteger = exports2.flattenAndStringify = exports2.isObject = exports2.emitWarning = exports2.pascalToCamelCase = exports2.callbackifyPromiseWithTimeout = exports2.normalizeHeader = exports2.normalizeHeaders = exports2.removeNullish = exports2.protoExtend = exports2.getOptionsFromArgs = exports2.getDataFromArgs = exports2.extractUrlParams = exports2.makeURLInterpolator = exports2.queryStringifyRequestData = exports2.isOptionsHash = void 0;
    var OPTIONS_KEYS = [
      "apiKey",
      "idempotencyKey",
      "stripeAccount",
      "apiVersion",
      "maxNetworkRetries",
      "timeout",
      "host",
      "authenticator",
      "stripeContext",
      "additionalHeaders",
      "streaming"
    ];
    function isOptionsHash(o) {
      return o && typeof o === "object" && OPTIONS_KEYS.some((prop) => Object.prototype.hasOwnProperty.call(o, prop));
    }
    exports2.isOptionsHash = isOptionsHash;
    function queryStringifyRequestData(data, _apiMode) {
      return stringifyRequestData(data);
    }
    exports2.queryStringifyRequestData = queryStringifyRequestData;
    function encodeQueryValue(value) {
      return encodeURIComponent(value).replace(/!/g, "%21").replace(/\*/g, "%2A").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/'/g, "%27").replace(/%5B/g, "[").replace(/%5D/g, "]");
    }
    function valueToString(value) {
      if (value instanceof Date) {
        return Math.floor(value.getTime() / 1e3).toString();
      }
      if (value === null) {
        return "";
      }
      return String(value);
    }
    function stringifyRequestData(data) {
      const pairs = [];
      function encode(key, value) {
        if (value === void 0) {
          return;
        }
        if (value === null || typeof value !== "object" || value instanceof Date) {
          pairs.push(encodeQueryValue(key) + "=" + encodeQueryValue(valueToString(value)));
          return;
        }
        if (Array.isArray(value)) {
          for (let i2 = 0; i2 < value.length; i2++) {
            if (value[i2] !== void 0) {
              encode(key + "[" + i2 + "]", value[i2]);
            }
          }
          return;
        }
        for (const k of Object.keys(value)) {
          encode(key + "[" + k + "]", value[k]);
        }
      }
      if (typeof data === "object" && data !== null) {
        for (const key of Object.keys(data)) {
          encode(key, data[key]);
        }
      }
      return pairs.join("&");
    }
    exports2.makeURLInterpolator = /* @__PURE__ */ (() => {
      const rc = {
        "\n": "\\n",
        '"': '\\"',
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
      };
      return (str) => {
        const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0]);
        return (outputs) => {
          return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) => {
            const output = outputs[$1];
            if (isValidEncodeUriComponentType(output))
              return encodeURIComponent(output);
            return "";
          });
        };
      };
    })();
    function isValidEncodeUriComponentType(value) {
      return ["number", "string", "boolean"].includes(typeof value);
    }
    function extractUrlParams(path) {
      const params = path.match(/\{\w+\}/g);
      if (!params) {
        return [];
      }
      return params.map((param) => param.replace(/[{}]/g, ""));
    }
    exports2.extractUrlParams = extractUrlParams;
    function getDataFromArgs(args) {
      if (!Array.isArray(args) || !args[0] || typeof args[0] !== "object") {
        return {};
      }
      if (!isOptionsHash(args[0])) {
        return args.shift();
      }
      const argKeys = Object.keys(args[0]);
      const optionKeysInArgs = argKeys.filter((key) => OPTIONS_KEYS.includes(key));
      if (optionKeysInArgs.length > 0 && optionKeysInArgs.length !== argKeys.length) {
        emitWarning(`Options found in arguments (${optionKeysInArgs.join(", ")}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`);
      }
      return {};
    }
    exports2.getDataFromArgs = getDataFromArgs;
    function getOptionsFromArgs(args) {
      const opts = {
        host: null,
        headers: {},
        settings: {},
        streaming: false
      };
      if (args.length > 0) {
        const arg = args[args.length - 1];
        if (typeof arg === "string") {
          opts.authenticator = createApiKeyAuthenticator(args.pop());
        } else if (isOptionsHash(arg)) {
          const params = Object.assign({}, args.pop());
          const extraKeys = Object.keys(params).filter((key) => !OPTIONS_KEYS.includes(key));
          if (extraKeys.length) {
            emitWarning(`Invalid options found (${extraKeys.join(", ")}); ignoring.`);
          }
          if (params.apiKey) {
            opts.authenticator = createApiKeyAuthenticator(params.apiKey);
          }
          if (params.idempotencyKey) {
            opts.headers["Idempotency-Key"] = params.idempotencyKey;
          }
          if (params.stripeAccount) {
            opts.headers["Stripe-Account"] = params.stripeAccount;
          }
          if (params.stripeContext) {
            if (opts.headers["Stripe-Account"]) {
              throw new Error("Can't specify both stripeAccount and stripeContext.");
            }
            opts.headers["Stripe-Context"] = params.stripeContext;
          }
          if (params.apiVersion) {
            opts.headers["Stripe-Version"] = params.apiVersion;
          }
          if (Number.isInteger(params.maxNetworkRetries)) {
            opts.settings.maxNetworkRetries = params.maxNetworkRetries;
          }
          if (Number.isInteger(params.timeout)) {
            opts.settings.timeout = params.timeout;
          }
          if (params.host) {
            opts.host = params.host;
          }
          if (params.authenticator) {
            if (params.apiKey) {
              throw new Error("Can't specify both apiKey and authenticator.");
            }
            if (typeof params.authenticator !== "function") {
              throw new Error("The authenticator must be a function receiving a request as the first parameter.");
            }
            opts.authenticator = params.authenticator;
          }
          if (params.additionalHeaders) {
            opts.headers = params.additionalHeaders;
          }
          if (params.streaming) {
            opts.streaming = true;
          }
        }
      }
      return opts;
    }
    exports2.getOptionsFromArgs = getOptionsFromArgs;
    function protoExtend(sub) {
      const Super = this;
      const Constructor = Object.prototype.hasOwnProperty.call(sub, "constructor") ? sub.constructor : function(...args) {
        Super.apply(this, args);
      };
      Object.assign(Constructor, Super);
      Constructor.prototype = Object.create(Super.prototype);
      Object.assign(Constructor.prototype, sub);
      return Constructor;
    }
    exports2.protoExtend = protoExtend;
    function removeNullish(obj) {
      if (typeof obj !== "object") {
        throw new Error("Argument must be an object");
      }
      return Object.keys(obj).reduce((result, key) => {
        if (obj[key] != null) {
          result[key] = obj[key];
        }
        return result;
      }, {});
    }
    exports2.removeNullish = removeNullish;
    function normalizeHeaders(obj) {
      if (!(obj && typeof obj === "object")) {
        return obj;
      }
      return Object.keys(obj).reduce((result, header) => {
        result[normalizeHeader(header)] = obj[header];
        return result;
      }, {});
    }
    exports2.normalizeHeaders = normalizeHeaders;
    function normalizeHeader(header) {
      return header.split("-").map((text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()).join("-");
    }
    exports2.normalizeHeader = normalizeHeader;
    function callbackifyPromiseWithTimeout(promise, callback) {
      if (callback) {
        return promise.then((res) => {
          setTimeout(() => {
            callback(null, res);
          }, 0);
        }, (err) => {
          setTimeout(() => {
            callback(err, null);
          }, 0);
        });
      }
      return promise;
    }
    exports2.callbackifyPromiseWithTimeout = callbackifyPromiseWithTimeout;
    function pascalToCamelCase(name) {
      if (name === "OAuth") {
        return "oauth";
      } else {
        return name[0].toLowerCase() + name.substring(1);
      }
    }
    exports2.pascalToCamelCase = pascalToCamelCase;
    function emitWarning(warning) {
      if (typeof process.emitWarning !== "function") {
        return console.warn(`Stripe: ${warning}`);
      }
      return process.emitWarning(warning, "Stripe");
    }
    exports2.emitWarning = emitWarning;
    function isObject(obj) {
      const type = typeof obj;
      return (type === "function" || type === "object") && !!obj;
    }
    exports2.isObject = isObject;
    function flattenAndStringify(data) {
      const result = {};
      const step = (obj, prevKey) => {
        Object.entries(obj).forEach(([key, value]) => {
          const newKey = prevKey ? `${prevKey}[${key}]` : key;
          if (isObject(value)) {
            if (!(value instanceof Uint8Array) && !Object.prototype.hasOwnProperty.call(value, "data")) {
              return step(value, newKey);
            } else {
              result[newKey] = value;
            }
          } else {
            result[newKey] = String(value);
          }
        });
      };
      step(data, null);
      return result;
    }
    exports2.flattenAndStringify = flattenAndStringify;
    function validateInteger(name, n, defaultVal) {
      if (!Number.isInteger(n)) {
        if (defaultVal !== void 0) {
          return defaultVal;
        } else {
          throw new Error(`${name} must be an integer`);
        }
      }
      return n;
    }
    exports2.validateInteger = validateInteger;
    function determineProcessUserAgentProperties() {
      return typeof process === "undefined" ? {} : {
        lang_version: process.version,
        platform: process.platform
      };
    }
    exports2.determineProcessUserAgentProperties = determineProcessUserAgentProperties;
    function createApiKeyAuthenticator(apiKey) {
      const authenticator = (request) => {
        request.headers.Authorization = "Bearer " + apiKey;
        return Promise.resolve();
      };
      authenticator._apiKey = apiKey;
      return authenticator;
    }
    exports2.createApiKeyAuthenticator = createApiKeyAuthenticator;
    function concat(arrays) {
      const totalLength = arrays.reduce((len, array) => len + array.length, 0);
      const merged = new Uint8Array(totalLength);
      let offset = 0;
      arrays.forEach((array) => {
        merged.set(array, offset);
        offset += array.length;
      });
      return merged;
    }
    exports2.concat = concat;
    function dateTimeReplacer(key, value) {
      if (this[key] instanceof Date) {
        return Math.floor(this[key].getTime() / 1e3).toString();
      }
      return value;
    }
    function jsonStringifyRequestData(data) {
      return JSON.stringify(data, dateTimeReplacer);
    }
    exports2.jsonStringifyRequestData = jsonStringifyRequestData;
    function getAPIMode(path) {
      if (!path) {
        return "v1";
      }
      return path.startsWith("/v2") ? "v2" : "v1";
    }
    exports2.getAPIMode = getAPIMode;
    function parseHttpHeaderAsString(header) {
      if (Array.isArray(header)) {
        return header.join(", ");
      }
      return String(header);
    }
    exports2.parseHttpHeaderAsString = parseHttpHeaderAsString;
    function parseHttpHeaderAsNumber(header) {
      const number = Array.isArray(header) ? header[0] : header;
      return Number(number);
    }
    exports2.parseHttpHeaderAsNumber = parseHttpHeaderAsNumber;
    function parseHeadersForFetch(headers) {
      return Object.entries(headers).map(([key, value]) => {
        return [key, parseHttpHeaderAsString(value)];
      });
    }
    exports2.parseHeadersForFetch = parseHeadersForFetch;
  }
});

// netlify/functions/node_modules/stripe/cjs/net/FetchHttpClient.js
var require_FetchHttpClient = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/net/FetchHttpClient.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FetchHttpClientResponse = exports2.FetchHttpClient = void 0;
    var utils_js_1 = require_utils();
    var HttpClient_js_1 = require_HttpClient();
    var FetchHttpClient = class _FetchHttpClient extends HttpClient_js_1.HttpClient {
      constructor(fetchFn) {
        super();
        if (!fetchFn) {
          if (!globalThis.fetch) {
            throw new Error("fetch() function not provided and is not defined in the global scope. You must provide a fetch implementation.");
          }
          fetchFn = globalThis.fetch;
        }
        if (globalThis.AbortController) {
          this._fetchFn = _FetchHttpClient.makeFetchWithAbortTimeout(fetchFn);
        } else {
          this._fetchFn = _FetchHttpClient.makeFetchWithRaceTimeout(fetchFn);
        }
      }
      static makeFetchWithRaceTimeout(fetchFn) {
        return (url, init, timeout) => {
          let pendingTimeoutId;
          const timeoutPromise = new Promise((_, reject) => {
            pendingTimeoutId = setTimeout(() => {
              pendingTimeoutId = null;
              reject(HttpClient_js_1.HttpClient.makeTimeoutError());
            }, timeout);
          });
          const fetchPromise = fetchFn(url, init);
          return Promise.race([fetchPromise, timeoutPromise]).finally(() => {
            if (pendingTimeoutId) {
              clearTimeout(pendingTimeoutId);
            }
          });
        };
      }
      static makeFetchWithAbortTimeout(fetchFn) {
        return async (url, init, timeout) => {
          const abort = new AbortController();
          let timeoutId = setTimeout(() => {
            timeoutId = null;
            abort.abort(HttpClient_js_1.HttpClient.makeTimeoutError());
          }, timeout);
          try {
            return await fetchFn(url, Object.assign(Object.assign({}, init), { signal: abort.signal }));
          } catch (err) {
            if (err.name === "AbortError") {
              throw HttpClient_js_1.HttpClient.makeTimeoutError();
            } else {
              throw err;
            }
          } finally {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
          }
        };
      }
      /** @override. */
      getClientName() {
        return "fetch";
      }
      async makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        const isInsecureConnection = protocol === "http";
        const url = new URL(path, `${isInsecureConnection ? "http" : "https"}://${host}`);
        url.port = port;
        const methodHasPayload = method == "POST" || method == "PUT" || method == "PATCH";
        const body = requestData || (methodHasPayload ? "" : void 0);
        const res = await this._fetchFn(url.toString(), {
          method,
          headers: (0, utils_js_1.parseHeadersForFetch)(headers),
          body
        }, timeout);
        return new FetchHttpClientResponse(res);
      }
    };
    exports2.FetchHttpClient = FetchHttpClient;
    var FetchHttpClientResponse = class _FetchHttpClientResponse extends HttpClient_js_1.HttpClientResponse {
      constructor(res) {
        super(res.status, _FetchHttpClientResponse._transformHeadersToObject(res.headers));
        this._res = res;
      }
      getRawResponse() {
        return this._res;
      }
      toStream(streamCompleteCallback) {
        streamCompleteCallback();
        return this._res.body;
      }
      toJSON() {
        return this._res.json();
      }
      static _transformHeadersToObject(headers) {
        const headersObj = {};
        for (const entry of headers) {
          if (!Array.isArray(entry) || entry.length != 2) {
            throw new Error("Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.");
          }
          headersObj[entry[0]] = entry[1];
        }
        return headersObj;
      }
    };
    exports2.FetchHttpClientResponse = FetchHttpClientResponse;
  }
});

// netlify/functions/node_modules/stripe/cjs/crypto/SubtleCryptoProvider.js
var require_SubtleCryptoProvider = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/crypto/SubtleCryptoProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SubtleCryptoProvider = void 0;
    var CryptoProvider_js_1 = require_CryptoProvider();
    var SubtleCryptoProvider = class extends CryptoProvider_js_1.CryptoProvider {
      constructor(subtleCrypto) {
        super();
        this.subtleCrypto = subtleCrypto || crypto.subtle;
      }
      /** @override */
      computeHMACSignature(payload, secret) {
        throw new CryptoProvider_js_1.CryptoProviderOnlySupportsAsyncError("SubtleCryptoProvider cannot be used in a synchronous context.");
      }
      /** @override */
      async computeHMACSignatureAsync(payload, secret) {
        const encoder = new TextEncoder();
        const key = await this.subtleCrypto.importKey("raw", encoder.encode(secret), {
          name: "HMAC",
          hash: { name: "SHA-256" }
        }, false, ["sign"]);
        const signatureBuffer = await this.subtleCrypto.sign("hmac", key, encoder.encode(payload));
        const signatureBytes = new Uint8Array(signatureBuffer);
        const signatureHexCodes = new Array(signatureBytes.length);
        for (let i2 = 0; i2 < signatureBytes.length; i2++) {
          signatureHexCodes[i2] = byteHexMapping[signatureBytes[i2]];
        }
        return signatureHexCodes.join("");
      }
      /** @override */
      async computeSHA256Async(data) {
        return new Uint8Array(await this.subtleCrypto.digest("SHA-256", data));
      }
    };
    exports2.SubtleCryptoProvider = SubtleCryptoProvider;
    var byteHexMapping = new Array(256);
    for (let i2 = 0; i2 < byteHexMapping.length; i2++) {
      byteHexMapping[i2] = i2.toString(16).padStart(2, "0");
    }
  }
});

// netlify/functions/node_modules/stripe/cjs/platform/PlatformFunctions.js
var require_PlatformFunctions = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/platform/PlatformFunctions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PlatformFunctions = void 0;
    var FetchHttpClient_js_1 = require_FetchHttpClient();
    var SubtleCryptoProvider_js_1 = require_SubtleCryptoProvider();
    var PlatformFunctions = class {
      constructor() {
        this._fetchFn = null;
        this._agent = null;
      }
      /**
       * Gets uname with Node's built-in `exec` function, if available.
       */
      getUname() {
        throw new Error("getUname not implemented.");
      }
      /**
       * Generates a v4 UUID. See https://stackoverflow.com/a/2117523
       */
      uuid4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r2 = Math.random() * 16 | 0;
          const v = c === "x" ? r2 : r2 & 3 | 8;
          return v.toString(16);
        });
      }
      /**
       * Compares strings in constant time.
       */
      secureCompare(a, b) {
        if (a.length !== b.length) {
          return false;
        }
        const len = a.length;
        let result = 0;
        for (let i2 = 0; i2 < len; ++i2) {
          result |= a.charCodeAt(i2) ^ b.charCodeAt(i2);
        }
        return result === 0;
      }
      /**
       * Creates an event emitter.
       */
      createEmitter() {
        throw new Error("createEmitter not implemented.");
      }
      /**
       * Checks if the request data is a stream. If so, read the entire stream
       * to a buffer and return the buffer.
       */
      tryBufferData(data) {
        throw new Error("tryBufferData not implemented.");
      }
      /**
       * Creates an HTTP client which uses the Node `http` and `https` packages
       * to issue requests.
       */
      createNodeHttpClient(agent) {
        throw new Error("createNodeHttpClient not implemented.");
      }
      /**
       * Creates an HTTP client for issuing Stripe API requests which uses the Web
       * Fetch API.
       *
       * A fetch function can optionally be passed in as a parameter. If none is
       * passed, will default to the default `fetch` function in the global scope.
       */
      createFetchHttpClient(fetchFn) {
        return new FetchHttpClient_js_1.FetchHttpClient(fetchFn);
      }
      /**
       * Creates an HTTP client using runtime-specific APIs.
       */
      createDefaultHttpClient() {
        throw new Error("createDefaultHttpClient not implemented.");
      }
      /**
       * Creates a CryptoProvider which uses the Node `crypto` package for its computations.
       */
      createNodeCryptoProvider() {
        throw new Error("createNodeCryptoProvider not implemented.");
      }
      /**
       * Creates a CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
       */
      createSubtleCryptoProvider(subtleCrypto) {
        return new SubtleCryptoProvider_js_1.SubtleCryptoProvider(subtleCrypto);
      }
      createDefaultCryptoProvider() {
        throw new Error("createDefaultCryptoProvider not implemented.");
      }
    };
    exports2.PlatformFunctions = PlatformFunctions;
  }
});

// netlify/functions/node_modules/stripe/cjs/Error.js
var require_Error = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/Error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TemporarySessionExpiredError = exports2.StripeUnknownError = exports2.StripeInvalidGrantError = exports2.StripeIdempotencyError = exports2.StripeSignatureVerificationError = exports2.StripeConnectionError = exports2.StripeRateLimitError = exports2.StripePermissionError = exports2.StripeAuthenticationError = exports2.StripeAPIError = exports2.StripeInvalidRequestError = exports2.StripeCardError = exports2.StripeError = exports2.generateV2Error = exports2.generateV1Error = void 0;
    var generateV1Error = (rawStripeError) => {
      switch (rawStripeError.type) {
        case "card_error":
          return new StripeCardError(rawStripeError);
        case "invalid_request_error":
          return new StripeInvalidRequestError(rawStripeError);
        case "api_error":
          return new StripeAPIError(rawStripeError);
        case "authentication_error":
          return new StripeAuthenticationError(rawStripeError);
        case "rate_limit_error":
          return new StripeRateLimitError(rawStripeError);
        case "idempotency_error":
          return new StripeIdempotencyError(rawStripeError);
        case "invalid_grant":
          return new StripeInvalidGrantError(rawStripeError);
        default:
          return new StripeUnknownError(rawStripeError);
      }
    };
    exports2.generateV1Error = generateV1Error;
    var generateV2Error = (rawStripeError) => {
      switch (rawStripeError.type) {
        // switchCases: The beginning of the section generated from our OpenAPI spec
        case "temporary_session_expired":
          return new TemporarySessionExpiredError(rawStripeError);
      }
      switch (rawStripeError.code) {
        case "invalid_fields":
          return new StripeInvalidRequestError(rawStripeError);
      }
      return (0, exports2.generateV1Error)(rawStripeError);
    };
    exports2.generateV2Error = generateV2Error;
    var StripeError = class extends Error {
      constructor(raw = {}, type = null) {
        var _a;
        super(raw.message);
        this.type = type || this.constructor.name;
        this.raw = raw;
        this.rawType = raw.type;
        this.code = raw.code;
        this.doc_url = raw.doc_url;
        this.param = raw.param;
        this.detail = raw.detail;
        this.headers = raw.headers;
        this.requestId = raw.requestId;
        this.statusCode = raw.statusCode;
        this.message = (_a = raw.message) !== null && _a !== void 0 ? _a : "";
        this.userMessage = raw.user_message;
        this.charge = raw.charge;
        this.decline_code = raw.decline_code;
        this.payment_intent = raw.payment_intent;
        this.payment_method = raw.payment_method;
        this.payment_method_type = raw.payment_method_type;
        this.setup_intent = raw.setup_intent;
        this.source = raw.source;
      }
    };
    exports2.StripeError = StripeError;
    StripeError.generate = exports2.generateV1Error;
    var StripeCardError = class extends StripeError {
      constructor(raw = {}) {
        super(raw, "StripeCardError");
      }
    };
    exports2.StripeCardError = StripeCardError;
    var StripeInvalidRequestError = class extends StripeError {
      constructor(raw = {}) {
        super(raw, "StripeInvalidRequestError");
      }
    };
    exports2.StripeInvalidRequestError = StripeInvalidRequestError;
    var StripeAPIError = class extends StripeError {
      constructor(raw = {}) {
        super(raw, "StripeAPIError");
      }
    };
    exports2.StripeAPIError = StripeAPIError;
    var StripeAuthenticationError = class extends StripeError {
      constructor(raw = {}) {
        super(raw, "StripeAuthenticationError");
      }
    };
    exports2.StripeAuthenticationError = StripeAuthenticationError;
    var StripePermissionError = class extends StripeError {
      constructor(raw = {}) {
        super(raw, "StripePermissionError");
      }
    };
    exports2.StripePermissionError = StripePermissionError;
    var StripeRateLimitError = class extends StripeError {
      constructor(raw = {}) {
        super(raw, "StripeRateLimitError");
      }
    };
    exports2.StripeRateLimitError = StripeRateLimitError;
    var StripeConnectionError = class extends StripeError {
      constructor(raw = {}) {
        super(raw, "StripeConnectionError");
      }
    };
    exports2.StripeConnectionError = StripeConnectionError;
    var StripeSignatureVerificationError = class extends StripeError {
      constructor(header, payload, raw = {}) {
        super(raw, "StripeSignatureVerificationError");
        this.header = header;
        this.payload = payload;
      }
    };
    exports2.StripeSignatureVerificationError = StripeSignatureVerificationError;
    var StripeIdempotencyError = class extends StripeError {
      constructor(raw = {}) {
        super(raw, "StripeIdempotencyError");
      }
    };
    exports2.StripeIdempotencyError = StripeIdempotencyError;
    var StripeInvalidGrantError = class extends StripeError {
      constructor(raw = {}) {
        super(raw, "StripeInvalidGrantError");
      }
    };
    exports2.StripeInvalidGrantError = StripeInvalidGrantError;
    var StripeUnknownError = class extends StripeError {
      constructor(raw = {}) {
        super(raw, "StripeUnknownError");
      }
    };
    exports2.StripeUnknownError = StripeUnknownError;
    var TemporarySessionExpiredError = class extends StripeError {
      constructor(rawStripeError = {}) {
        super(rawStripeError, "TemporarySessionExpiredError");
      }
    };
    exports2.TemporarySessionExpiredError = TemporarySessionExpiredError;
  }
});

// netlify/functions/node_modules/stripe/cjs/platform/NodePlatformFunctions.js
var require_NodePlatformFunctions = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/platform/NodePlatformFunctions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NodePlatformFunctions = void 0;
    var crypto2 = require("crypto");
    var events_1 = require("events");
    var NodeCryptoProvider_js_1 = require_NodeCryptoProvider();
    var NodeHttpClient_js_1 = require_NodeHttpClient();
    var PlatformFunctions_js_1 = require_PlatformFunctions();
    var Error_js_1 = require_Error();
    var utils_js_1 = require_utils();
    var child_process_1 = require("child_process");
    var StreamProcessingError = class extends Error_js_1.StripeError {
    };
    var NodePlatformFunctions = class extends PlatformFunctions_js_1.PlatformFunctions {
      constructor() {
        super();
        this._exec = child_process_1.exec;
        this._UNAME_CACHE = null;
      }
      /** @override */
      uuid4() {
        if (crypto2.randomUUID) {
          return crypto2.randomUUID();
        }
        return super.uuid4();
      }
      /**
       * @override
       * Node's built in `exec` function sometimes throws outright,
       * and sometimes has a callback with an error,
       * depending on the type of error.
       *
       * This unifies that interface by resolving with a null uname
       * if an error is encountered.
       */
      getUname() {
        if (!this._UNAME_CACHE) {
          this._UNAME_CACHE = new Promise((resolve, reject) => {
            try {
              this._exec("uname -a", (err, uname) => {
                if (err) {
                  return resolve(null);
                }
                resolve(uname);
              });
            } catch (e2) {
              resolve(null);
            }
          });
        }
        return this._UNAME_CACHE;
      }
      /**
       * @override
       * Secure compare, from https://github.com/freewil/scmp
       */
      secureCompare(a, b) {
        if (!a || !b) {
          throw new Error("secureCompare must receive two arguments");
        }
        if (a.length !== b.length) {
          return false;
        }
        if (crypto2.timingSafeEqual) {
          const textEncoder = new TextEncoder();
          const aEncoded = textEncoder.encode(a);
          const bEncoded = textEncoder.encode(b);
          return crypto2.timingSafeEqual(aEncoded, bEncoded);
        }
        return super.secureCompare(a, b);
      }
      createEmitter() {
        return new events_1.EventEmitter();
      }
      /** @override */
      tryBufferData(data) {
        if (!(data.file.data instanceof events_1.EventEmitter)) {
          return Promise.resolve(data);
        }
        const bufferArray = [];
        return new Promise((resolve, reject) => {
          data.file.data.on("data", (line) => {
            bufferArray.push(line);
          }).once("end", () => {
            const bufferData = Object.assign({}, data);
            bufferData.file.data = (0, utils_js_1.concat)(bufferArray);
            resolve(bufferData);
          }).on("error", (err) => {
            reject(new StreamProcessingError({
              message: "An error occurred while attempting to process the file for upload.",
              detail: err
            }));
          });
        });
      }
      /** @override */
      createNodeHttpClient(agent) {
        return new NodeHttpClient_js_1.NodeHttpClient(agent);
      }
      /** @override */
      createDefaultHttpClient() {
        return new NodeHttpClient_js_1.NodeHttpClient();
      }
      /** @override */
      createNodeCryptoProvider() {
        return new NodeCryptoProvider_js_1.NodeCryptoProvider();
      }
      /** @override */
      createDefaultCryptoProvider() {
        return this.createNodeCryptoProvider();
      }
    };
    exports2.NodePlatformFunctions = NodePlatformFunctions;
  }
});

// netlify/functions/node_modules/stripe/cjs/RequestSender.js
var require_RequestSender = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/RequestSender.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RequestSender = void 0;
    var Error_js_1 = require_Error();
    var HttpClient_js_1 = require_HttpClient();
    var utils_js_1 = require_utils();
    var MAX_RETRY_AFTER_WAIT = 60;
    var RequestSender = class _RequestSender {
      constructor(stripe2, maxBufferedRequestMetric) {
        this._stripe = stripe2;
        this._maxBufferedRequestMetric = maxBufferedRequestMetric;
      }
      _normalizeStripeContext(optsContext, clientContext) {
        if (optsContext) {
          return optsContext.toString() || null;
        }
        return (clientContext === null || clientContext === void 0 ? void 0 : clientContext.toString()) || null;
      }
      _addHeadersDirectlyToObject(obj, headers) {
        obj.requestId = headers["request-id"];
        obj.stripeAccount = obj.stripeAccount || headers["stripe-account"];
        obj.apiVersion = obj.apiVersion || headers["stripe-version"];
        obj.idempotencyKey = obj.idempotencyKey || headers["idempotency-key"];
      }
      _makeResponseEvent(requestEvent, statusCode, headers) {
        const requestEndTime = Date.now();
        const requestDurationMs = requestEndTime - requestEvent.request_start_time;
        return (0, utils_js_1.removeNullish)({
          api_version: headers["stripe-version"],
          account: headers["stripe-account"],
          idempotency_key: headers["idempotency-key"],
          method: requestEvent.method,
          path: requestEvent.path,
          status: statusCode,
          request_id: this._getRequestId(headers),
          elapsed: requestDurationMs,
          request_start_time: requestEvent.request_start_time,
          request_end_time: requestEndTime
        });
      }
      _getRequestId(headers) {
        return headers["request-id"];
      }
      /**
       * Used by methods with spec.streaming === true. For these methods, we do not
       * buffer successful responses into memory or do parse them into stripe
       * objects, we delegate that all of that to the user and pass back the raw
       * http.Response object to the callback.
       *
       * (Unsuccessful responses shouldn't make it here, they should
       * still be buffered/parsed and handled by _jsonResponseHandler -- see
       * makeRequest)
       */
      _streamingResponseHandler(requestEvent, usage, callback) {
        return (res) => {
          const headers = res.getHeaders();
          const streamCompleteCallback = () => {
            const responseEvent = this._makeResponseEvent(requestEvent, res.getStatusCode(), headers);
            this._stripe._emitter.emit("response", responseEvent);
            this._recordRequestMetrics(this._getRequestId(headers), responseEvent.elapsed, usage);
          };
          const stream = res.toStream(streamCompleteCallback);
          this._addHeadersDirectlyToObject(stream, headers);
          return callback(null, stream);
        };
      }
      /**
       * Default handler for Stripe responses. Buffers the response into memory,
       * parses the JSON and returns it (i.e. passes it to the callback) if there
       * is no "error" field. Otherwise constructs/passes an appropriate Error.
       */
      _jsonResponseHandler(requestEvent, apiMode, usage, callback) {
        return (res) => {
          const headers = res.getHeaders();
          const requestId = this._getRequestId(headers);
          const statusCode = res.getStatusCode();
          const responseEvent = this._makeResponseEvent(requestEvent, statusCode, headers);
          this._stripe._emitter.emit("response", responseEvent);
          res.toJSON().then((jsonResponse) => {
            if (jsonResponse.error) {
              let err;
              if (typeof jsonResponse.error === "string") {
                jsonResponse.error = {
                  type: jsonResponse.error,
                  message: jsonResponse.error_description
                };
              }
              jsonResponse.error.headers = headers;
              jsonResponse.error.statusCode = statusCode;
              jsonResponse.error.requestId = requestId;
              if (statusCode === 401) {
                err = new Error_js_1.StripeAuthenticationError(jsonResponse.error);
              } else if (statusCode === 403) {
                err = new Error_js_1.StripePermissionError(jsonResponse.error);
              } else if (statusCode === 429) {
                err = new Error_js_1.StripeRateLimitError(jsonResponse.error);
              } else if (apiMode === "v2") {
                err = (0, Error_js_1.generateV2Error)(jsonResponse.error);
              } else {
                err = (0, Error_js_1.generateV1Error)(jsonResponse.error);
              }
              throw err;
            }
            return jsonResponse;
          }, (e2) => {
            throw new Error_js_1.StripeAPIError({
              message: "Invalid JSON received from the Stripe API",
              exception: e2,
              requestId: headers["request-id"]
            });
          }).then((jsonResponse) => {
            this._recordRequestMetrics(requestId, responseEvent.elapsed, usage);
            const rawResponse = res.getRawResponse();
            this._addHeadersDirectlyToObject(rawResponse, headers);
            Object.defineProperty(jsonResponse, "lastResponse", {
              enumerable: false,
              writable: false,
              value: rawResponse
            });
            callback(null, jsonResponse);
          }, (e2) => callback(e2, null));
        };
      }
      static _generateConnectionErrorMessage(requestRetries) {
        return `An error occurred with our connection to Stripe.${requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ""}`;
      }
      // For more on when and how to retry API requests, see https://stripe.com/docs/error-handling#safely-retrying-requests-with-idempotency
      static _shouldRetry(res, numRetries, maxRetries, error) {
        if (error && numRetries === 0 && HttpClient_js_1.HttpClient.CONNECTION_CLOSED_ERROR_CODES.includes(error.code)) {
          return true;
        }
        if (numRetries >= maxRetries) {
          return false;
        }
        if (!res) {
          return true;
        }
        if (res.getHeaders()["stripe-should-retry"] === "false") {
          return false;
        }
        if (res.getHeaders()["stripe-should-retry"] === "true") {
          return true;
        }
        if (res.getStatusCode() === 409) {
          return true;
        }
        if (res.getStatusCode() >= 500) {
          return true;
        }
        return false;
      }
      _getSleepTimeInMS(numRetries, retryAfter = null) {
        const initialNetworkRetryDelay = this._stripe.getInitialNetworkRetryDelay();
        const maxNetworkRetryDelay = this._stripe.getMaxNetworkRetryDelay();
        let sleepSeconds = Math.min(initialNetworkRetryDelay * Math.pow(2, numRetries - 1), maxNetworkRetryDelay);
        sleepSeconds *= 0.5 * (1 + Math.random());
        sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);
        if (Number.isInteger(retryAfter) && retryAfter <= MAX_RETRY_AFTER_WAIT) {
          sleepSeconds = Math.max(sleepSeconds, retryAfter);
        }
        return sleepSeconds * 1e3;
      }
      // Max retries can be set on a per request basis. Favor those over the global setting
      _getMaxNetworkRetries(settings = {}) {
        return settings.maxNetworkRetries !== void 0 && Number.isInteger(settings.maxNetworkRetries) ? settings.maxNetworkRetries : this._stripe.getMaxNetworkRetries();
      }
      _defaultIdempotencyKey(method, settings, apiMode) {
        const maxRetries = this._getMaxNetworkRetries(settings);
        const genKey = () => `stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;
        if (apiMode === "v2") {
          if (method === "POST" || method === "DELETE") {
            return genKey();
          }
        } else if (apiMode === "v1") {
          if (method === "POST" && maxRetries > 0) {
            return genKey();
          }
        }
        return null;
      }
      _makeHeaders({ contentType, contentLength, apiVersion, clientUserAgent, method, userSuppliedHeaders, userSuppliedSettings, stripeAccount, stripeContext, apiMode }) {
        const defaultHeaders = {
          Accept: "application/json",
          "Content-Type": contentType,
          "User-Agent": this._getUserAgentString(apiMode),
          "X-Stripe-Client-User-Agent": clientUserAgent,
          "X-Stripe-Client-Telemetry": this._getTelemetryHeader(),
          "Stripe-Version": apiVersion,
          "Stripe-Account": stripeAccount,
          "Stripe-Context": stripeContext,
          "Idempotency-Key": this._defaultIdempotencyKey(method, userSuppliedSettings, apiMode)
        };
        const methodHasPayload = method == "POST" || method == "PUT" || method == "PATCH";
        if (methodHasPayload || contentLength) {
          if (!methodHasPayload) {
            (0, utils_js_1.emitWarning)(`${method} method had non-zero contentLength but no payload is expected for this verb`);
          }
          defaultHeaders["Content-Length"] = contentLength;
        }
        return Object.assign(
          (0, utils_js_1.removeNullish)(defaultHeaders),
          // If the user supplied, say 'idempotency-key', override instead of appending by ensuring caps are the same.
          (0, utils_js_1.normalizeHeaders)(userSuppliedHeaders)
        );
      }
      _getUserAgentString(apiMode) {
        const packageVersion = this._stripe.getConstant("PACKAGE_VERSION");
        const appInfo = this._stripe._appInfo ? this._stripe.getAppInfoAsString() : "";
        return `Stripe/${apiMode} NodeBindings/${packageVersion} ${appInfo}`.trim();
      }
      _getTelemetryHeader() {
        if (this._stripe.getTelemetryEnabled() && this._stripe._prevRequestMetrics.length > 0) {
          const metrics = this._stripe._prevRequestMetrics.shift();
          return JSON.stringify({
            last_request_metrics: metrics
          });
        }
      }
      _recordRequestMetrics(requestId, requestDurationMs, usage) {
        if (this._stripe.getTelemetryEnabled() && requestId) {
          if (this._stripe._prevRequestMetrics.length > this._maxBufferedRequestMetric) {
            (0, utils_js_1.emitWarning)("Request metrics buffer is full, dropping telemetry message.");
          } else {
            const m2 = {
              request_id: requestId,
              request_duration_ms: requestDurationMs
            };
            if (usage && usage.length > 0) {
              m2.usage = usage;
            }
            this._stripe._prevRequestMetrics.push(m2);
          }
        }
      }
      _rawRequest(method, path, params, options, usage) {
        const requestPromise = new Promise((resolve, reject) => {
          let opts;
          try {
            const requestMethod = method.toUpperCase();
            if (requestMethod !== "POST" && params && Object.keys(params).length !== 0) {
              throw new Error("rawRequest only supports params on POST requests. Please pass null and add your parameters to path.");
            }
            const args = [].slice.call([params, options]);
            const dataFromArgs = (0, utils_js_1.getDataFromArgs)(args);
            const data = requestMethod === "POST" ? Object.assign({}, dataFromArgs) : null;
            const calculatedOptions = (0, utils_js_1.getOptionsFromArgs)(args);
            const headers2 = calculatedOptions.headers;
            const authenticator2 = calculatedOptions.authenticator;
            opts = {
              requestMethod,
              requestPath: path,
              bodyData: data,
              queryData: {},
              authenticator: authenticator2,
              headers: headers2,
              host: calculatedOptions.host,
              streaming: !!calculatedOptions.streaming,
              settings: {},
              // We use this for thin event internals, so we should record the more specific `usage`, when available
              usage: usage || ["raw_request"]
            };
          } catch (err) {
            reject(err);
            return;
          }
          function requestCallback(err, response) {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          }
          const { headers, settings } = opts;
          const authenticator = opts.authenticator;
          this._request(opts.requestMethod, opts.host, path, opts.bodyData, authenticator, { headers, settings, streaming: opts.streaming }, opts.usage, requestCallback);
        });
        return requestPromise;
      }
      _getContentLength(data) {
        return typeof data === "string" ? new TextEncoder().encode(data).length : data.length;
      }
      _request(method, host, path, data, authenticator, options, usage = [], callback, requestDataProcessor = null) {
        var _a;
        let requestData;
        authenticator = (_a = authenticator !== null && authenticator !== void 0 ? authenticator : this._stripe._authenticator) !== null && _a !== void 0 ? _a : null;
        const apiMode = (0, utils_js_1.getAPIMode)(path);
        const retryRequest = (requestFn, apiVersion, headers, requestRetries, retryAfter) => {
          return setTimeout(requestFn, this._getSleepTimeInMS(requestRetries, retryAfter), apiVersion, headers, requestRetries + 1);
        };
        const makeRequest = (apiVersion, headers, numRetries) => {
          const timeout = options.settings && options.settings.timeout && Number.isInteger(options.settings.timeout) && options.settings.timeout >= 0 ? options.settings.timeout : this._stripe.getApiField("timeout");
          const request = {
            host: host || this._stripe.getApiField("host"),
            port: this._stripe.getApiField("port"),
            path,
            method,
            headers: Object.assign({}, headers),
            body: requestData,
            protocol: this._stripe.getApiField("protocol")
          };
          authenticator(request).then(() => {
            const req = this._stripe.getApiField("httpClient").makeRequest(request.host, request.port, request.path, request.method, request.headers, request.body, request.protocol, timeout);
            const requestStartTime = Date.now();
            const requestEvent = (0, utils_js_1.removeNullish)({
              api_version: apiVersion,
              account: (0, utils_js_1.parseHttpHeaderAsString)(headers["Stripe-Account"]),
              idempotency_key: (0, utils_js_1.parseHttpHeaderAsString)(headers["Idempotency-Key"]),
              method,
              path,
              request_start_time: requestStartTime
            });
            const requestRetries = numRetries || 0;
            const maxRetries = this._getMaxNetworkRetries(options.settings || {});
            this._stripe._emitter.emit("request", requestEvent);
            req.then((res) => {
              if (_RequestSender._shouldRetry(res, requestRetries, maxRetries)) {
                return retryRequest(makeRequest, apiVersion, headers, requestRetries, (0, utils_js_1.parseHttpHeaderAsNumber)(res.getHeaders()["retry-after"]));
              } else if (options.streaming && res.getStatusCode() < 400) {
                return this._streamingResponseHandler(requestEvent, usage, callback)(res);
              } else {
                return this._jsonResponseHandler(requestEvent, apiMode, usage, callback)(res);
              }
            }).catch((error) => {
              if (_RequestSender._shouldRetry(null, requestRetries, maxRetries, error)) {
                return retryRequest(makeRequest, apiVersion, headers, requestRetries, null);
              } else {
                const isTimeoutError = error.code && error.code === HttpClient_js_1.HttpClient.TIMEOUT_ERROR_CODE;
                return callback(new Error_js_1.StripeConnectionError({
                  message: isTimeoutError ? `Request aborted due to timeout being reached (${timeout}ms)` : _RequestSender._generateConnectionErrorMessage(requestRetries),
                  detail: error
                }));
              }
            });
          }).catch((e2) => {
            throw new Error_js_1.StripeError({
              message: "Unable to authenticate the request",
              exception: e2
            });
          });
        };
        const prepareAndMakeRequest = (error, data2) => {
          if (error) {
            return callback(error);
          }
          requestData = data2;
          this._stripe.getClientUserAgent((clientUserAgent) => {
            var _a2, _b, _c;
            const apiVersion = this._stripe.getApiField("version");
            const headers = this._makeHeaders({
              contentType: apiMode == "v2" ? "application/json" : "application/x-www-form-urlencoded",
              contentLength: this._getContentLength(data2),
              apiVersion,
              clientUserAgent,
              method,
              // other callers expect null, but .headers being optional means it's undefined if not supplied. So we normalize to null.
              userSuppliedHeaders: (_a2 = options.headers) !== null && _a2 !== void 0 ? _a2 : null,
              userSuppliedSettings: (_b = options.settings) !== null && _b !== void 0 ? _b : {},
              stripeAccount: (_c = options.stripeAccount) !== null && _c !== void 0 ? _c : this._stripe.getApiField("stripeAccount"),
              stripeContext: this._normalizeStripeContext(options.stripeContext, this._stripe.getApiField("stripeContext")),
              apiMode
            });
            makeRequest(apiVersion, headers, 0);
          });
        };
        if (requestDataProcessor) {
          requestDataProcessor(method, data, options.headers, prepareAndMakeRequest);
        } else {
          let stringifiedData;
          if (apiMode == "v2") {
            stringifiedData = data ? (0, utils_js_1.jsonStringifyRequestData)(data) : "";
          } else {
            stringifiedData = (0, utils_js_1.queryStringifyRequestData)(data || {});
          }
          prepareAndMakeRequest(null, stringifiedData);
        }
      }
    };
    exports2.RequestSender = RequestSender;
  }
});

// netlify/functions/node_modules/stripe/cjs/autoPagination.js
var require_autoPagination = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/autoPagination.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.makeAutoPaginationMethods = void 0;
    var utils_js_1 = require_utils();
    var V1Iterator = class {
      constructor(firstPagePromise, requestArgs, spec, stripeResource) {
        this.index = 0;
        this.pagePromise = firstPagePromise;
        this.promiseCache = { currentPromise: null };
        this.requestArgs = requestArgs;
        this.spec = spec;
        this.stripeResource = stripeResource;
      }
      async iterate(pageResult) {
        if (!(pageResult && pageResult.data && typeof pageResult.data.length === "number")) {
          throw Error("Unexpected: Stripe API response does not have a well-formed `data` array.");
        }
        const reverseIteration = isReverseIteration(this.requestArgs);
        if (this.index < pageResult.data.length) {
          const idx = reverseIteration ? pageResult.data.length - 1 - this.index : this.index;
          const value = pageResult.data[idx];
          this.index += 1;
          return { value, done: false };
        } else if (pageResult.has_more) {
          this.index = 0;
          this.pagePromise = this.getNextPage(pageResult);
          const nextPageResult = await this.pagePromise;
          return this.iterate(nextPageResult);
        }
        return { done: true, value: void 0 };
      }
      /** @abstract */
      getNextPage(_pageResult) {
        throw new Error("Unimplemented");
      }
      async _next() {
        return this.iterate(await this.pagePromise);
      }
      next() {
        if (this.promiseCache.currentPromise) {
          return this.promiseCache.currentPromise;
        }
        const nextPromise = (async () => {
          const ret = await this._next();
          this.promiseCache.currentPromise = null;
          return ret;
        })();
        this.promiseCache.currentPromise = nextPromise;
        return nextPromise;
      }
    };
    var V1ListIterator = class extends V1Iterator {
      getNextPage(pageResult) {
        const reverseIteration = isReverseIteration(this.requestArgs);
        const lastId = getLastId(pageResult, reverseIteration);
        return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
          [reverseIteration ? "ending_before" : "starting_after"]: lastId
        });
      }
    };
    var V1SearchIterator = class extends V1Iterator {
      getNextPage(pageResult) {
        if (!pageResult.next_page) {
          throw Error("Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.");
        }
        return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
          page: pageResult.next_page
        });
      }
    };
    var V2ListIterator = class {
      constructor(firstPagePromise, requestArgs, spec, stripeResource) {
        this.firstPagePromise = firstPagePromise;
        this.currentPageIterator = null;
        this.nextPageUrl = null;
        this.requestArgs = requestArgs;
        this.spec = spec;
        this.stripeResource = stripeResource;
      }
      async initFirstPage() {
        if (this.firstPagePromise) {
          const page = await this.firstPagePromise;
          this.firstPagePromise = null;
          this.currentPageIterator = page.data[Symbol.iterator]();
          this.nextPageUrl = page.next_page_url || null;
        }
      }
      async turnPage() {
        if (!this.nextPageUrl)
          return null;
        this.spec.fullPath = this.nextPageUrl;
        const page = await this.stripeResource._makeRequest([], this.spec, {});
        this.nextPageUrl = page.next_page_url || null;
        this.currentPageIterator = page.data[Symbol.iterator]();
        return this.currentPageIterator;
      }
      async next() {
        await this.initFirstPage();
        if (this.currentPageIterator) {
          const result2 = this.currentPageIterator.next();
          if (!result2.done)
            return { done: false, value: result2.value };
        }
        const nextPageIterator = await this.turnPage();
        if (!nextPageIterator) {
          return { done: true, value: void 0 };
        }
        const result = nextPageIterator.next();
        if (!result.done)
          return { done: false, value: result.value };
        return { done: true, value: void 0 };
      }
    };
    var makeAutoPaginationMethods = (stripeResource, requestArgs, spec, firstPagePromise) => {
      const apiMode = (0, utils_js_1.getAPIMode)(spec.fullPath || spec.path);
      if (apiMode !== "v2" && spec.methodType === "search") {
        return makeAutoPaginationMethodsFromIterator(new V1SearchIterator(firstPagePromise, requestArgs, spec, stripeResource));
      }
      if (apiMode !== "v2" && spec.methodType === "list") {
        return makeAutoPaginationMethodsFromIterator(new V1ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
      }
      if (apiMode === "v2" && spec.methodType === "list") {
        return makeAutoPaginationMethodsFromIterator(new V2ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
      }
      return null;
    };
    exports2.makeAutoPaginationMethods = makeAutoPaginationMethods;
    var makeAutoPaginationMethodsFromIterator = (iterator) => {
      const autoPagingEach = makeAutoPagingEach((...args) => iterator.next(...args));
      const autoPagingToArray = makeAutoPagingToArray(autoPagingEach);
      const autoPaginationMethods = {
        autoPagingEach,
        autoPagingToArray,
        // Async iterator functions:
        next: () => iterator.next(),
        return: () => {
          return {};
        },
        [getAsyncIteratorSymbol()]: () => {
          return autoPaginationMethods;
        }
      };
      return autoPaginationMethods;
    };
    function getAsyncIteratorSymbol() {
      if (typeof Symbol !== "undefined" && Symbol.asyncIterator) {
        return Symbol.asyncIterator;
      }
      return "@@asyncIterator";
    }
    function getDoneCallback(args) {
      if (args.length < 2) {
        return null;
      }
      const onDone = args[1];
      if (typeof onDone !== "function") {
        throw Error(`The second argument to autoPagingEach, if present, must be a callback function; received ${typeof onDone}`);
      }
      return onDone;
    }
    function getItemCallback(args) {
      if (args.length === 0) {
        return void 0;
      }
      const onItem = args[0];
      if (typeof onItem !== "function") {
        throw Error(`The first argument to autoPagingEach, if present, must be a callback function; received ${typeof onItem}`);
      }
      if (onItem.length === 2) {
        return onItem;
      }
      if (onItem.length > 2) {
        throw Error(`The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${onItem}`);
      }
      return function _onItem(item, next) {
        const shouldContinue = onItem(item);
        next(shouldContinue);
      };
    }
    function getLastId(listResult, reverseIteration) {
      const lastIdx = reverseIteration ? 0 : listResult.data.length - 1;
      const lastItem = listResult.data[lastIdx];
      const lastId = lastItem && lastItem.id;
      if (!lastId) {
        throw Error("Unexpected: No `id` found on the last item while auto-paging a list.");
      }
      return lastId;
    }
    function makeAutoPagingEach(asyncIteratorNext) {
      return function autoPagingEach() {
        const args = [].slice.call(arguments);
        const onItem = getItemCallback(args);
        const onDone = getDoneCallback(args);
        if (args.length > 2) {
          throw Error(`autoPagingEach takes up to two arguments; received ${args}`);
        }
        const autoPagePromise = wrapAsyncIteratorWithCallback(
          asyncIteratorNext,
          // @ts-ignore we might need a null check
          onItem
        );
        return (0, utils_js_1.callbackifyPromiseWithTimeout)(autoPagePromise, onDone);
      };
    }
    function makeAutoPagingToArray(autoPagingEach) {
      return function autoPagingToArray(opts, onDone) {
        const limit = opts && opts.limit;
        if (!limit) {
          throw Error("You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.");
        }
        if (limit > 1e4) {
          throw Error("You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.");
        }
        const promise = new Promise((resolve, reject) => {
          const items = [];
          autoPagingEach((item) => {
            items.push(item);
            if (items.length >= limit) {
              return false;
            }
          }).then(() => {
            resolve(items);
          }).catch(reject);
        });
        return (0, utils_js_1.callbackifyPromiseWithTimeout)(promise, onDone);
      };
    }
    function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
      return new Promise((resolve, reject) => {
        function handleIteration(iterResult) {
          if (iterResult.done) {
            resolve();
            return;
          }
          const item = iterResult.value;
          return new Promise((next) => {
            onItem(item, next);
          }).then((shouldContinue) => {
            if (shouldContinue === false) {
              return handleIteration({ done: true, value: void 0 });
            } else {
              return asyncIteratorNext().then(handleIteration);
            }
          });
        }
        asyncIteratorNext().then(handleIteration).catch(reject);
      });
    }
    function isReverseIteration(requestArgs) {
      const args = [].slice.call(requestArgs);
      const dataFromArgs = (0, utils_js_1.getDataFromArgs)(args);
      return !!dataFromArgs.ending_before;
    }
  }
});

// netlify/functions/node_modules/stripe/cjs/StripeMethod.js
var require_StripeMethod = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/StripeMethod.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.stripeMethod = void 0;
    var utils_js_1 = require_utils();
    var autoPagination_js_1 = require_autoPagination();
    function stripeMethod(spec) {
      if (spec.path !== void 0 && spec.fullPath !== void 0) {
        throw new Error(`Method spec specified both a 'path' (${spec.path}) and a 'fullPath' (${spec.fullPath}).`);
      }
      return function(...args) {
        const callback = typeof args[args.length - 1] == "function" && args.pop();
        spec.urlParams = (0, utils_js_1.extractUrlParams)(spec.fullPath || this.createResourcePathWithSymbols(spec.path || ""));
        const requestPromise = (0, utils_js_1.callbackifyPromiseWithTimeout)(this._makeRequest(args, spec, {}), callback);
        Object.assign(requestPromise, (0, autoPagination_js_1.makeAutoPaginationMethods)(this, args, spec, requestPromise));
        return requestPromise;
      };
    }
    exports2.stripeMethod = stripeMethod;
  }
});

// netlify/functions/node_modules/stripe/cjs/StripeResource.js
var require_StripeResource = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/StripeResource.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StripeResource = void 0;
    var utils_js_1 = require_utils();
    var StripeMethod_js_1 = require_StripeMethod();
    StripeResource.extend = utils_js_1.protoExtend;
    StripeResource.method = StripeMethod_js_1.stripeMethod;
    StripeResource.MAX_BUFFERED_REQUEST_METRICS = 100;
    function StripeResource(stripe2, deprecatedUrlData) {
      this._stripe = stripe2;
      if (deprecatedUrlData) {
        throw new Error("Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.");
      }
      this.basePath = (0, utils_js_1.makeURLInterpolator)(
        // @ts-ignore changing type of basePath
        this.basePath || stripe2.getApiField("basePath")
      );
      this.resourcePath = this.path;
      this.path = (0, utils_js_1.makeURLInterpolator)(this.path);
      this.initialize(...arguments);
    }
    exports2.StripeResource = StripeResource;
    StripeResource.prototype = {
      _stripe: null,
      // @ts-ignore the type of path changes in ctor
      path: "",
      resourcePath: "",
      // Methods that don't use the API's default '/v1' path can override it with this setting.
      basePath: null,
      initialize() {
      },
      // Function to override the default data processor. This allows full control
      // over how a StripeResource's request data will get converted into an HTTP
      // body. This is useful for non-standard HTTP requests. The function should
      // take method name, data, and headers as arguments.
      requestDataProcessor: null,
      // Function to add a validation checks before sending the request, errors should
      // be thrown, and they will be passed to the callback/promise.
      validateRequest: null,
      createFullPath(commandPath, urlData) {
        const urlParts = [this.basePath(urlData), this.path(urlData)];
        if (typeof commandPath === "function") {
          const computedCommandPath = commandPath(urlData);
          if (computedCommandPath) {
            urlParts.push(computedCommandPath);
          }
        } else {
          urlParts.push(commandPath);
        }
        return this._joinUrlParts(urlParts);
      },
      // Creates a relative resource path with symbols left in (unlike
      // createFullPath which takes some data to replace them with). For example it
      // might produce: /invoices/{id}
      createResourcePathWithSymbols(pathWithSymbols) {
        if (pathWithSymbols) {
          return `/${this._joinUrlParts([this.resourcePath, pathWithSymbols])}`;
        } else {
          return `/${this.resourcePath}`;
        }
      },
      _joinUrlParts(parts) {
        return parts.join("/").replace(/\/{2,}/g, "/");
      },
      _getRequestOpts(requestArgs, spec, overrideData) {
        var _a;
        const requestMethod = (spec.method || "GET").toUpperCase();
        const usage = spec.usage || [];
        const urlParams = spec.urlParams || [];
        const encode = spec.encode || ((data2) => data2);
        const isUsingFullPath = !!spec.fullPath;
        const commandPath = (0, utils_js_1.makeURLInterpolator)(isUsingFullPath ? spec.fullPath : spec.path || "");
        const path = isUsingFullPath ? spec.fullPath : this.createResourcePathWithSymbols(spec.path);
        const args = [].slice.call(requestArgs);
        const urlData = urlParams.reduce((urlData2, param) => {
          const arg = args.shift();
          if (typeof arg !== "string") {
            throw new Error(`Stripe: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`);
          }
          urlData2[param] = arg;
          return urlData2;
        }, {});
        const dataFromArgs = (0, utils_js_1.getDataFromArgs)(args);
        const data = encode(Object.assign({}, dataFromArgs, overrideData));
        const options = (0, utils_js_1.getOptionsFromArgs)(args);
        const host = options.host || spec.host;
        const streaming = !!spec.streaming || !!options.streaming;
        if (args.filter((x2) => x2 != null).length) {
          throw new Error(`Stripe: Unknown arguments (${args}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${requestMethod} \`${path}\`)`);
        }
        const requestPath = isUsingFullPath ? commandPath(urlData) : this.createFullPath(commandPath, urlData);
        const headers = Object.assign(options.headers, spec.headers);
        if (spec.validator) {
          spec.validator(data, { headers });
        }
        const dataInQuery = spec.method === "GET" || spec.method === "DELETE";
        const bodyData = dataInQuery ? null : data;
        const queryData = dataInQuery ? data : {};
        return {
          requestMethod,
          requestPath,
          bodyData,
          queryData,
          authenticator: (_a = options.authenticator) !== null && _a !== void 0 ? _a : null,
          headers,
          host: host !== null && host !== void 0 ? host : null,
          streaming,
          settings: options.settings,
          usage
        };
      },
      _makeRequest(requestArgs, spec, overrideData) {
        return new Promise((resolve, reject) => {
          var _a;
          let opts;
          try {
            opts = this._getRequestOpts(requestArgs, spec, overrideData);
          } catch (err) {
            reject(err);
            return;
          }
          function requestCallback(err, response) {
            if (err) {
              reject(err);
            } else {
              resolve(spec.transformResponseData ? spec.transformResponseData(response) : response);
            }
          }
          const emptyQuery = Object.keys(opts.queryData).length === 0;
          const path = [
            opts.requestPath,
            emptyQuery ? "" : "?",
            (0, utils_js_1.queryStringifyRequestData)(opts.queryData)
          ].join("");
          const { headers, settings } = opts;
          this._stripe._requestSender._request(opts.requestMethod, opts.host, path, opts.bodyData, opts.authenticator, {
            headers,
            settings,
            streaming: opts.streaming
          }, opts.usage, requestCallback, (_a = this.requestDataProcessor) === null || _a === void 0 ? void 0 : _a.bind(this));
        });
      }
    };
  }
});

// netlify/functions/node_modules/stripe/cjs/StripeContext.js
var require_StripeContext = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/StripeContext.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StripeContext = void 0;
    var StripeContext = class _StripeContext {
      /**
       * Creates a new StripeContext with the given segments.
       */
      constructor(segments = []) {
        this._segments = [...segments];
      }
      /**
       * Gets a copy of the segments of this Context.
       */
      get segments() {
        return [...this._segments];
      }
      /**
       * Creates a new StripeContext with an additional segment appended.
       */
      push(segment) {
        if (!segment) {
          throw new Error("Segment cannot be null or undefined");
        }
        return new _StripeContext([...this._segments, segment]);
      }
      /**
       * Creates a new StripeContext with the last segment removed.
       * If there are no segments, throws an error.
       */
      pop() {
        if (this._segments.length === 0) {
          throw new Error("Cannot pop from an empty context");
        }
        return new _StripeContext(this._segments.slice(0, -1));
      }
      /**
       * Converts this context to its string representation.
       */
      toString() {
        return this._segments.join("/");
      }
      /**
       * Parses a context string into a StripeContext instance.
       */
      static parse(contextStr) {
        if (!contextStr) {
          return new _StripeContext([]);
        }
        return new _StripeContext(contextStr.split("/"));
      }
    };
    exports2.StripeContext = StripeContext;
  }
});

// netlify/functions/node_modules/stripe/cjs/Webhooks.js
var require_Webhooks = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/Webhooks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createWebhooks = void 0;
    var Error_js_1 = require_Error();
    var CryptoProvider_js_1 = require_CryptoProvider();
    function createWebhooks(platformFunctions) {
      const Webhook = {
        DEFAULT_TOLERANCE: 300,
        signature: null,
        constructEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
          try {
            if (!this.signature) {
              throw new Error("ERR: missing signature helper, unable to verify");
            }
            this.signature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
          } catch (e2) {
            if (e2 instanceof CryptoProvider_js_1.CryptoProviderOnlySupportsAsyncError) {
              e2.message += "\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`";
            }
            throw e2;
          }
          const jsonPayload = payload instanceof Uint8Array ? JSON.parse(new TextDecoder("utf8").decode(payload)) : JSON.parse(payload);
          return jsonPayload;
        },
        async constructEventAsync(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
          if (!this.signature) {
            throw new Error("ERR: missing signature helper, unable to verify");
          }
          await this.signature.verifyHeaderAsync(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
          const jsonPayload = payload instanceof Uint8Array ? JSON.parse(new TextDecoder("utf8").decode(payload)) : JSON.parse(payload);
          return jsonPayload;
        },
        /**
         * Generates a header to be used for webhook mocking
         *
         * @typedef {object} opts
         * @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
         * @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
         * @property {string} secret - Stripe webhook secret 'whsec_...'
         * @property {string} scheme - Version of API to hit. Defaults to 'v1'.
         * @property {string} signature - Computed webhook signature
         * @property {CryptoProvider} cryptoProvider - Crypto provider to use for computing the signature if none was provided. Defaults to NodeCryptoProvider.
         */
        generateTestHeaderString: function(opts) {
          const preparedOpts = prepareOptions(opts);
          const signature2 = preparedOpts.signature || preparedOpts.cryptoProvider.computeHMACSignature(preparedOpts.payloadString, preparedOpts.secret);
          return preparedOpts.generateHeaderString(signature2);
        },
        generateTestHeaderStringAsync: async function(opts) {
          const preparedOpts = prepareOptions(opts);
          const signature2 = preparedOpts.signature || await preparedOpts.cryptoProvider.computeHMACSignatureAsync(preparedOpts.payloadString, preparedOpts.secret);
          return preparedOpts.generateHeaderString(signature2);
        }
      };
      const signature = {
        EXPECTED_SCHEME: "v1",
        verifyHeader(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
          const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
          const secretContainsWhitespace = /\s/.test(secret);
          cryptoProvider = cryptoProvider || getCryptoProvider();
          const expectedSignature = cryptoProvider.computeHMACSignature(makeHMACContent(payload, details), secret);
          validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
          return true;
        },
        async verifyHeaderAsync(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
          const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
          const secretContainsWhitespace = /\s/.test(secret);
          cryptoProvider = cryptoProvider || getCryptoProvider();
          const expectedSignature = await cryptoProvider.computeHMACSignatureAsync(makeHMACContent(payload, details), secret);
          return validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
        }
      };
      function makeHMACContent(payload, details) {
        return `${details.timestamp}.${payload}`;
      }
      function parseEventDetails(encodedPayload, encodedHeader, expectedScheme) {
        if (!encodedPayload) {
          throw new Error_js_1.StripeSignatureVerificationError(encodedHeader, encodedPayload, {
            message: "No webhook payload was provided."
          });
        }
        const suspectPayloadType = typeof encodedPayload != "string" && !(encodedPayload instanceof Uint8Array);
        const textDecoder = new TextDecoder("utf8");
        const decodedPayload = encodedPayload instanceof Uint8Array ? textDecoder.decode(encodedPayload) : encodedPayload;
        if (Array.isArray(encodedHeader)) {
          throw new Error("Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.");
        }
        if (encodedHeader == null || encodedHeader == "") {
          throw new Error_js_1.StripeSignatureVerificationError(encodedHeader, encodedPayload, {
            message: "No stripe-signature header value was provided."
          });
        }
        const decodedHeader = encodedHeader instanceof Uint8Array ? textDecoder.decode(encodedHeader) : encodedHeader;
        const details = parseHeader(decodedHeader, expectedScheme);
        if (!details || details.timestamp === -1) {
          throw new Error_js_1.StripeSignatureVerificationError(decodedHeader, decodedPayload, {
            message: "Unable to extract timestamp and signatures from header"
          });
        }
        if (!details.signatures.length) {
          throw new Error_js_1.StripeSignatureVerificationError(decodedHeader, decodedPayload, {
            message: "No signatures found with expected scheme"
          });
        }
        return {
          decodedPayload,
          decodedHeader,
          details,
          suspectPayloadType
        };
      }
      function validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt) {
        const signatureFound = !!details.signatures.filter(platformFunctions.secureCompare.bind(platformFunctions, expectedSignature)).length;
        const docsLocation = "\nLearn more about webhook signing and explore webhook integration examples for various frameworks at https://docs.stripe.com/webhooks/signature";
        const whitespaceMessage = secretContainsWhitespace ? "\n\nNote: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value" : "";
        if (!signatureFound) {
          if (suspectPayloadType) {
            throw new Error_js_1.StripeSignatureVerificationError(header, payload, {
              message: "Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.Payload was provided as a parsed JavaScript object instead. \nSignature verification is impossible without access to the original signed material. \n" + docsLocation + "\n" + whitespaceMessage
            });
          }
          throw new Error_js_1.StripeSignatureVerificationError(header, payload, {
            message: "No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? \n If a webhook request is being forwarded by a third-party tool, ensure that the exact request body, including JSON formatting and new line style, is preserved.\n" + docsLocation + "\n" + whitespaceMessage
          });
        }
        const timestampAge = Math.floor((typeof receivedAt === "number" ? receivedAt : Date.now()) / 1e3) - details.timestamp;
        if (tolerance > 0 && timestampAge > tolerance) {
          throw new Error_js_1.StripeSignatureVerificationError(header, payload, {
            message: "Timestamp outside the tolerance zone"
          });
        }
        return true;
      }
      function parseHeader(header, scheme) {
        if (typeof header !== "string") {
          return null;
        }
        return header.split(",").reduce((accum, item) => {
          const kv = item.split("=");
          if (kv[0] === "t") {
            accum.timestamp = parseInt(kv[1], 10);
          }
          if (kv[0] === scheme) {
            accum.signatures.push(kv[1]);
          }
          return accum;
        }, {
          timestamp: -1,
          signatures: []
        });
      }
      let webhooksCryptoProviderInstance = null;
      function getCryptoProvider() {
        if (!webhooksCryptoProviderInstance) {
          webhooksCryptoProviderInstance = platformFunctions.createDefaultCryptoProvider();
        }
        return webhooksCryptoProviderInstance;
      }
      function prepareOptions(opts) {
        if (!opts) {
          throw new Error_js_1.StripeError({
            message: "Options are required"
          });
        }
        const timestamp = Math.floor(opts.timestamp) || Math.floor(Date.now() / 1e3);
        const scheme = opts.scheme || signature.EXPECTED_SCHEME;
        const cryptoProvider = opts.cryptoProvider || getCryptoProvider();
        const payloadString = `${timestamp}.${opts.payload}`;
        const generateHeaderString = (signature2) => {
          return `t=${timestamp},${scheme}=${signature2}`;
        };
        return Object.assign(Object.assign({}, opts), {
          timestamp,
          scheme,
          cryptoProvider,
          payloadString,
          generateHeaderString
        });
      }
      Webhook.signature = signature;
      return Webhook;
    }
    exports2.createWebhooks = createWebhooks;
  }
});

// netlify/functions/node_modules/stripe/cjs/apiVersion.js
var require_apiVersion = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/apiVersion.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ApiMajorVersion = exports2.ApiVersion = void 0;
    exports2.ApiVersion = "2026-01-28.clover";
    exports2.ApiMajorVersion = "clover";
  }
});

// netlify/functions/node_modules/stripe/cjs/ResourceNamespace.js
var require_ResourceNamespace = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/ResourceNamespace.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resourceNamespace = void 0;
    function ResourceNamespace(stripe2, resources) {
      for (const name in resources) {
        if (!Object.prototype.hasOwnProperty.call(resources, name)) {
          continue;
        }
        const camelCaseName = name[0].toLowerCase() + name.substring(1);
        const resource = new resources[name](stripe2);
        this[camelCaseName] = resource;
      }
    }
    function resourceNamespace(namespace, resources) {
      return function(stripe2) {
        return new ResourceNamespace(stripe2, resources);
      };
    }
    exports2.resourceNamespace = resourceNamespace;
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/V2/Core/AccountLinks.js
var require_AccountLinks = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/V2/Core/AccountLinks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AccountLinks = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.AccountLinks = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v2/core/account_links" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/V2/Core/AccountTokens.js
var require_AccountTokens = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/V2/Core/AccountTokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AccountTokens = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.AccountTokens = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v2/core/account_tokens" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v2/core/account_tokens/{id}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/FinancialConnections/Accounts.js
var require_Accounts = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/FinancialConnections/Accounts.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Accounts = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Accounts = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/financial_connections/accounts/{account}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/financial_connections/accounts",
        methodType: "list"
      }),
      disconnect: stripeMethod({
        method: "POST",
        fullPath: "/v1/financial_connections/accounts/{account}/disconnect"
      }),
      listOwners: stripeMethod({
        method: "GET",
        fullPath: "/v1/financial_connections/accounts/{account}/owners",
        methodType: "list"
      }),
      refresh: stripeMethod({
        method: "POST",
        fullPath: "/v1/financial_connections/accounts/{account}/refresh"
      }),
      subscribe: stripeMethod({
        method: "POST",
        fullPath: "/v1/financial_connections/accounts/{account}/subscribe"
      }),
      unsubscribe: stripeMethod({
        method: "POST",
        fullPath: "/v1/financial_connections/accounts/{account}/unsubscribe"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/V2/Core/Accounts/Persons.js
var require_Persons = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/V2/Core/Accounts/Persons.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Persons = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Persons = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v2/core/accounts/{account_id}/persons"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v2/core/accounts/{account_id}/persons/{id}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v2/core/accounts/{account_id}/persons/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v2/core/accounts/{account_id}/persons",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v2/core/accounts/{account_id}/persons/{id}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/V2/Core/Accounts/PersonTokens.js
var require_PersonTokens = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/V2/Core/Accounts/PersonTokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PersonTokens = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PersonTokens = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v2/core/accounts/{account_id}/person_tokens"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v2/core/accounts/{account_id}/person_tokens/{id}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/V2/Core/Accounts.js
var require_Accounts2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/V2/Core/Accounts.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Accounts = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var Persons_js_1 = require_Persons();
    var PersonTokens_js_1 = require_PersonTokens();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Accounts = StripeResource_js_1.StripeResource.extend({
      constructor: function(...args) {
        StripeResource_js_1.StripeResource.apply(this, args);
        this.persons = new Persons_js_1.Persons(...args);
        this.personTokens = new PersonTokens_js_1.PersonTokens(...args);
      },
      create: stripeMethod({ method: "POST", fullPath: "/v2/core/accounts" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v2/core/accounts/{id}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v2/core/accounts/{id}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v2/core/accounts",
        methodType: "list"
      }),
      close: stripeMethod({
        method: "POST",
        fullPath: "/v2/core/accounts/{id}/close"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Entitlements/ActiveEntitlements.js
var require_ActiveEntitlements = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Entitlements/ActiveEntitlements.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ActiveEntitlements = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ActiveEntitlements = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/entitlements/active_entitlements/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/entitlements/active_entitlements",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Billing/Alerts.js
var require_Alerts = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Billing/Alerts.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Alerts = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Alerts = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/billing/alerts" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/billing/alerts/{id}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/billing/alerts",
        methodType: "list"
      }),
      activate: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing/alerts/{id}/activate"
      }),
      archive: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing/alerts/{id}/archive"
      }),
      deactivate: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing/alerts/{id}/deactivate"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Tax/Associations.js
var require_Associations = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Tax/Associations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Associations = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Associations = StripeResource_js_1.StripeResource.extend({
      find: stripeMethod({ method: "GET", fullPath: "/v1/tax/associations/find" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Issuing/Authorizations.js
var require_Authorizations = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Issuing/Authorizations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Authorizations = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Authorizations = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/authorizations/{authorization}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/issuing/authorizations/{authorization}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/authorizations",
        methodType: "list"
      }),
      approve: stripeMethod({
        method: "POST",
        fullPath: "/v1/issuing/authorizations/{authorization}/approve"
      }),
      decline: stripeMethod({
        method: "POST",
        fullPath: "/v1/issuing/authorizations/{authorization}/decline"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Issuing/Authorizations.js
var require_Authorizations2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Issuing/Authorizations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Authorizations = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Authorizations = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/authorizations"
      }),
      capture: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/capture"
      }),
      expire: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/expire"
      }),
      finalizeAmount: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount"
      }),
      increment: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/increment"
      }),
      respond: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond"
      }),
      reverse: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/reverse"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Tax/Calculations.js
var require_Calculations = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Tax/Calculations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Calculations = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Calculations = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/tax/calculations" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/tax/calculations/{calculation}"
      }),
      listLineItems: stripeMethod({
        method: "GET",
        fullPath: "/v1/tax/calculations/{calculation}/line_items",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Issuing/Cardholders.js
var require_Cardholders = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Issuing/Cardholders.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Cardholders = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Cardholders = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/issuing/cardholders" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/cardholders/{cardholder}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/issuing/cardholders/{cardholder}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/cardholders",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Issuing/Cards.js
var require_Cards = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Issuing/Cards.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Cards = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Cards = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/issuing/cards" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/issuing/cards/{card}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/issuing/cards/{card}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/cards",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Issuing/Cards.js
var require_Cards2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Issuing/Cards.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Cards = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Cards = StripeResource_js_1.StripeResource.extend({
      deliverCard: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/deliver"
      }),
      failCard: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/fail"
      }),
      returnCard: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/return"
      }),
      shipCard: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/ship"
      }),
      submitCard: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/submit"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/BillingPortal/Configurations.js
var require_Configurations = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/BillingPortal/Configurations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Configurations = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Configurations = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing_portal/configurations"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/billing_portal/configurations/{configuration}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing_portal/configurations/{configuration}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/billing_portal/configurations",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Terminal/Configurations.js
var require_Configurations2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Terminal/Configurations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Configurations = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Configurations = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/configurations"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/terminal/configurations/{configuration}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/configurations/{configuration}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/terminal/configurations",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/terminal/configurations/{configuration}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/ConfirmationTokens.js
var require_ConfirmationTokens = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/ConfirmationTokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConfirmationTokens = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ConfirmationTokens = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/confirmation_tokens"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Terminal/ConnectionTokens.js
var require_ConnectionTokens = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Terminal/ConnectionTokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConnectionTokens = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ConnectionTokens = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/connection_tokens"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Billing/CreditBalanceSummary.js
var require_CreditBalanceSummary = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Billing/CreditBalanceSummary.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CreditBalanceSummary = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.CreditBalanceSummary = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/billing/credit_balance_summary"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Billing/CreditBalanceTransactions.js
var require_CreditBalanceTransactions = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Billing/CreditBalanceTransactions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CreditBalanceTransactions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.CreditBalanceTransactions = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/billing/credit_balance_transactions/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/billing/credit_balance_transactions",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Billing/CreditGrants.js
var require_CreditGrants = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Billing/CreditGrants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CreditGrants = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.CreditGrants = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/billing/credit_grants" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/billing/credit_grants/{id}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing/credit_grants/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/billing/credit_grants",
        methodType: "list"
      }),
      expire: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing/credit_grants/{id}/expire"
      }),
      voidGrant: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing/credit_grants/{id}/void"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Treasury/CreditReversals.js
var require_CreditReversals = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Treasury/CreditReversals.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CreditReversals = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.CreditReversals = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/credit_reversals"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/credit_reversals/{credit_reversal}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/credit_reversals",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Customers.js
var require_Customers = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Customers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Customers = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Customers = StripeResource_js_1.StripeResource.extend({
      fundCashBalance: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/customers/{customer}/fund_cash_balance"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Treasury/DebitReversals.js
var require_DebitReversals = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Treasury/DebitReversals.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DebitReversals = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.DebitReversals = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/debit_reversals"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/debit_reversals/{debit_reversal}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/debit_reversals",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Issuing/Disputes.js
var require_Disputes = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Issuing/Disputes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Disputes = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Disputes = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/issuing/disputes" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/disputes/{dispute}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/issuing/disputes/{dispute}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/disputes",
        methodType: "list"
      }),
      submit: stripeMethod({
        method: "POST",
        fullPath: "/v1/issuing/disputes/{dispute}/submit"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Radar/EarlyFraudWarnings.js
var require_EarlyFraudWarnings = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Radar/EarlyFraudWarnings.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EarlyFraudWarnings = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.EarlyFraudWarnings = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/radar/early_fraud_warnings/{early_fraud_warning}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/radar/early_fraud_warnings",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/V2/Core/EventDestinations.js
var require_EventDestinations = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/V2/Core/EventDestinations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EventDestinations = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.EventDestinations = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v2/core/event_destinations"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v2/core/event_destinations/{id}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v2/core/event_destinations/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v2/core/event_destinations",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v2/core/event_destinations/{id}"
      }),
      disable: stripeMethod({
        method: "POST",
        fullPath: "/v2/core/event_destinations/{id}/disable"
      }),
      enable: stripeMethod({
        method: "POST",
        fullPath: "/v2/core/event_destinations/{id}/enable"
      }),
      ping: stripeMethod({
        method: "POST",
        fullPath: "/v2/core/event_destinations/{id}/ping"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/V2/Core/Events.js
var require_Events = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/V2/Core/Events.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Events = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Events = StripeResource_js_1.StripeResource.extend({
      retrieve(...args) {
        const transformResponseData = (response) => {
          return this.addFetchRelatedObjectIfNeeded(response);
        };
        return stripeMethod({
          method: "GET",
          fullPath: "/v2/core/events/{id}",
          transformResponseData
        }).apply(this, args);
      },
      list(...args) {
        const transformResponseData = (response) => {
          return Object.assign(Object.assign({}, response), { data: response.data.map(this.addFetchRelatedObjectIfNeeded.bind(this)) });
        };
        return stripeMethod({
          method: "GET",
          fullPath: "/v2/core/events",
          methodType: "list",
          transformResponseData
        }).apply(this, args);
      },
      /**
       * @private
       *
       * For internal use in stripe-node.
       *
       * @param pulledEvent The retrieved event object
       * @returns The retrieved event object with a fetchRelatedObject method,
       * if pulledEvent.related_object is valid (non-null and has a url)
       */
      addFetchRelatedObjectIfNeeded(pulledEvent) {
        if (!pulledEvent.related_object || !pulledEvent.related_object.url) {
          return pulledEvent;
        }
        return Object.assign(Object.assign({}, pulledEvent), { fetchRelatedObject: () => (
          // call stripeMethod with 'this' resource to fetch
          // the related object. 'this' is needed to construct
          // and send the request, but the method spec controls
          // the url endpoint and method, so it doesn't matter
          // that 'this' is an Events resource object here
          stripeMethod({
            method: "GET",
            fullPath: pulledEvent.related_object.url
          }).apply(this, [
            {
              stripeContext: pulledEvent.context
            }
          ])
        ) });
      }
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Entitlements/Features.js
var require_Features = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Entitlements/Features.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Features = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Features = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/entitlements/features" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/entitlements/features/{id}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/entitlements/features/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/entitlements/features",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Treasury/FinancialAccounts.js
var require_FinancialAccounts = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Treasury/FinancialAccounts.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FinancialAccounts = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.FinancialAccounts = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/financial_accounts"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/financial_accounts/{financial_account}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/financial_accounts/{financial_account}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/financial_accounts",
        methodType: "list"
      }),
      close: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/financial_accounts/{financial_account}/close"
      }),
      retrieveFeatures: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/financial_accounts/{financial_account}/features"
      }),
      updateFeatures: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/financial_accounts/{financial_account}/features"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Treasury/InboundTransfers.js
var require_InboundTransfers = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Treasury/InboundTransfers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InboundTransfers = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.InboundTransfers = StripeResource_js_1.StripeResource.extend({
      fail: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/fail"
      }),
      returnInboundTransfer: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/return"
      }),
      succeed: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/succeed"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Treasury/InboundTransfers.js
var require_InboundTransfers2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Treasury/InboundTransfers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InboundTransfers = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.InboundTransfers = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/inbound_transfers"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/inbound_transfers/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/inbound_transfers",
        methodType: "list"
      }),
      cancel: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/inbound_transfers/{inbound_transfer}/cancel"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Terminal/Locations.js
var require_Locations = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Terminal/Locations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Locations = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Locations = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/terminal/locations" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/terminal/locations/{location}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/locations/{location}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/terminal/locations",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/terminal/locations/{location}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Billing/MeterEventAdjustments.js
var require_MeterEventAdjustments = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Billing/MeterEventAdjustments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MeterEventAdjustments = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.MeterEventAdjustments = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing/meter_event_adjustments"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/V2/Billing/MeterEventAdjustments.js
var require_MeterEventAdjustments2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/V2/Billing/MeterEventAdjustments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MeterEventAdjustments = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.MeterEventAdjustments = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v2/billing/meter_event_adjustments"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/V2/Billing/MeterEventSession.js
var require_MeterEventSession = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/V2/Billing/MeterEventSession.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MeterEventSession = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.MeterEventSession = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v2/billing/meter_event_session"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/V2/Billing/MeterEventStream.js
var require_MeterEventStream = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/V2/Billing/MeterEventStream.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MeterEventStream = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.MeterEventStream = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v2/billing/meter_event_stream",
        host: "meter-events.stripe.com"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Billing/MeterEvents.js
var require_MeterEvents = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Billing/MeterEvents.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MeterEvents = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.MeterEvents = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/billing/meter_events" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/V2/Billing/MeterEvents.js
var require_MeterEvents2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/V2/Billing/MeterEvents.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MeterEvents = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.MeterEvents = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v2/billing/meter_events" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Billing/Meters.js
var require_Meters = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Billing/Meters.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Meters = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Meters = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/billing/meters" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/billing/meters/{id}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/billing/meters/{id}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/billing/meters",
        methodType: "list"
      }),
      deactivate: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing/meters/{id}/deactivate"
      }),
      listEventSummaries: stripeMethod({
        method: "GET",
        fullPath: "/v1/billing/meters/{id}/event_summaries",
        methodType: "list"
      }),
      reactivate: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing/meters/{id}/reactivate"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Terminal/OnboardingLinks.js
var require_OnboardingLinks = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Terminal/OnboardingLinks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OnboardingLinks = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.OnboardingLinks = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/onboarding_links"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Climate/Orders.js
var require_Orders = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Climate/Orders.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Orders = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Orders = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/climate/orders" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/climate/orders/{order}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/climate/orders/{order}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/climate/orders",
        methodType: "list"
      }),
      cancel: stripeMethod({
        method: "POST",
        fullPath: "/v1/climate/orders/{order}/cancel"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Treasury/OutboundPayments.js
var require_OutboundPayments = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Treasury/OutboundPayments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OutboundPayments = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.OutboundPayments = StripeResource_js_1.StripeResource.extend({
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}"
      }),
      fail: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/fail"
      }),
      post: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/post"
      }),
      returnOutboundPayment: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/return"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Treasury/OutboundPayments.js
var require_OutboundPayments2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Treasury/OutboundPayments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OutboundPayments = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.OutboundPayments = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/outbound_payments"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/outbound_payments/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/outbound_payments",
        methodType: "list"
      }),
      cancel: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/outbound_payments/{id}/cancel"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Treasury/OutboundTransfers.js
var require_OutboundTransfers = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Treasury/OutboundTransfers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OutboundTransfers = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.OutboundTransfers = StripeResource_js_1.StripeResource.extend({
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}"
      }),
      fail: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail"
      }),
      post: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post"
      }),
      returnOutboundTransfer: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Treasury/OutboundTransfers.js
var require_OutboundTransfers2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Treasury/OutboundTransfers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OutboundTransfers = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.OutboundTransfers = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/outbound_transfers"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/outbound_transfers/{outbound_transfer}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/outbound_transfers",
        methodType: "list"
      }),
      cancel: stripeMethod({
        method: "POST",
        fullPath: "/v1/treasury/outbound_transfers/{outbound_transfer}/cancel"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Radar/PaymentEvaluations.js
var require_PaymentEvaluations = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Radar/PaymentEvaluations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PaymentEvaluations = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PaymentEvaluations = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/radar/payment_evaluations"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Issuing/PersonalizationDesigns.js
var require_PersonalizationDesigns = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Issuing/PersonalizationDesigns.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PersonalizationDesigns = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PersonalizationDesigns = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/issuing/personalization_designs"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/personalization_designs/{personalization_design}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/issuing/personalization_designs/{personalization_design}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/personalization_designs",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Issuing/PersonalizationDesigns.js
var require_PersonalizationDesigns2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Issuing/PersonalizationDesigns.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PersonalizationDesigns = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PersonalizationDesigns = StripeResource_js_1.StripeResource.extend({
      activate: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate"
      }),
      deactivate: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate"
      }),
      reject: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Issuing/PhysicalBundles.js
var require_PhysicalBundles = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Issuing/PhysicalBundles.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PhysicalBundles = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PhysicalBundles = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/physical_bundles/{physical_bundle}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/physical_bundles",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Climate/Products.js
var require_Products = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Climate/Products.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Products = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Products = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/climate/products/{product}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/climate/products",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Terminal/Readers.js
var require_Readers = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Terminal/Readers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Readers = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Readers = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/terminal/readers" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/terminal/readers/{reader}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/readers/{reader}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/terminal/readers",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/terminal/readers/{reader}"
      }),
      cancelAction: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/readers/{reader}/cancel_action"
      }),
      collectInputs: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/readers/{reader}/collect_inputs"
      }),
      collectPaymentMethod: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/readers/{reader}/collect_payment_method"
      }),
      confirmPaymentIntent: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/readers/{reader}/confirm_payment_intent"
      }),
      processPaymentIntent: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/readers/{reader}/process_payment_intent"
      }),
      processSetupIntent: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/readers/{reader}/process_setup_intent"
      }),
      refundPayment: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/readers/{reader}/refund_payment"
      }),
      setReaderDisplay: stripeMethod({
        method: "POST",
        fullPath: "/v1/terminal/readers/{reader}/set_reader_display"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Terminal/Readers.js
var require_Readers2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Terminal/Readers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Readers = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Readers = StripeResource_js_1.StripeResource.extend({
      presentPaymentMethod: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/terminal/readers/{reader}/present_payment_method"
      }),
      succeedInputCollection: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/terminal/readers/{reader}/succeed_input_collection"
      }),
      timeoutInputCollection: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/terminal/readers/{reader}/timeout_input_collection"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Treasury/ReceivedCredits.js
var require_ReceivedCredits = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Treasury/ReceivedCredits.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReceivedCredits = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ReceivedCredits = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/received_credits"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Treasury/ReceivedCredits.js
var require_ReceivedCredits2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Treasury/ReceivedCredits.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReceivedCredits = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ReceivedCredits = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/received_credits/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/received_credits",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Treasury/ReceivedDebits.js
var require_ReceivedDebits = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Treasury/ReceivedDebits.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReceivedDebits = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ReceivedDebits = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/treasury/received_debits"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Treasury/ReceivedDebits.js
var require_ReceivedDebits2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Treasury/ReceivedDebits.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReceivedDebits = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ReceivedDebits = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/received_debits/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/received_debits",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Refunds.js
var require_Refunds = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Refunds.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Refunds = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Refunds = StripeResource_js_1.StripeResource.extend({
      expire: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/refunds/{refund}/expire"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Tax/Registrations.js
var require_Registrations = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Tax/Registrations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Registrations = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Registrations = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/tax/registrations" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/tax/registrations/{id}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/tax/registrations/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/tax/registrations",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Reporting/ReportRuns.js
var require_ReportRuns = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Reporting/ReportRuns.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReportRuns = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ReportRuns = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/reporting/report_runs" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/reporting/report_runs/{report_run}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/reporting/report_runs",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Reporting/ReportTypes.js
var require_ReportTypes = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Reporting/ReportTypes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReportTypes = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ReportTypes = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/reporting/report_types/{report_type}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/reporting/report_types",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Forwarding/Requests.js
var require_Requests = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Forwarding/Requests.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Requests = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Requests = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/forwarding/requests" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/forwarding/requests/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/forwarding/requests",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Sigma/ScheduledQueryRuns.js
var require_ScheduledQueryRuns = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Sigma/ScheduledQueryRuns.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ScheduledQueryRuns = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ScheduledQueryRuns = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/sigma/scheduled_query_runs/{scheduled_query_run}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/sigma/scheduled_query_runs",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Apps/Secrets.js
var require_Secrets = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Apps/Secrets.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Secrets = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Secrets = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/apps/secrets" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/apps/secrets",
        methodType: "list"
      }),
      deleteWhere: stripeMethod({
        method: "POST",
        fullPath: "/v1/apps/secrets/delete"
      }),
      find: stripeMethod({ method: "GET", fullPath: "/v1/apps/secrets/find" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/BillingPortal/Sessions.js
var require_Sessions = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/BillingPortal/Sessions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Sessions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Sessions = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/billing_portal/sessions"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Checkout/Sessions.js
var require_Sessions2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Checkout/Sessions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Sessions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Sessions = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/checkout/sessions" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/checkout/sessions/{session}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/checkout/sessions/{session}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/checkout/sessions",
        methodType: "list"
      }),
      expire: stripeMethod({
        method: "POST",
        fullPath: "/v1/checkout/sessions/{session}/expire"
      }),
      listLineItems: stripeMethod({
        method: "GET",
        fullPath: "/v1/checkout/sessions/{session}/line_items",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/FinancialConnections/Sessions.js
var require_Sessions3 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/FinancialConnections/Sessions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Sessions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Sessions = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/financial_connections/sessions"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/financial_connections/sessions/{session}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Tax/Settings.js
var require_Settings = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Tax/Settings.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Settings = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Settings = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/tax/settings" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/tax/settings" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Climate/Suppliers.js
var require_Suppliers = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Climate/Suppliers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Suppliers = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Suppliers = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/climate/suppliers/{supplier}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/climate/suppliers",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/TestClocks.js
var require_TestClocks = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/TestClocks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TestClocks = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.TestClocks = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/test_clocks"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/test_helpers/test_clocks/{test_clock}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/test_helpers/test_clocks",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/test_helpers/test_clocks/{test_clock}"
      }),
      advance: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/test_clocks/{test_clock}/advance"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Issuing/Tokens.js
var require_Tokens = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Issuing/Tokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Tokens = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Tokens = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/tokens/{token}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/issuing/tokens/{token}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/tokens",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Treasury/TransactionEntries.js
var require_TransactionEntries = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Treasury/TransactionEntries.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TransactionEntries = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.TransactionEntries = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/transaction_entries/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/transaction_entries",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/FinancialConnections/Transactions.js
var require_Transactions = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/FinancialConnections/Transactions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Transactions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Transactions = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/financial_connections/transactions/{transaction}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/financial_connections/transactions",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Issuing/Transactions.js
var require_Transactions2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Issuing/Transactions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Transactions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Transactions = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/transactions/{transaction}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/issuing/transactions/{transaction}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/issuing/transactions",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Tax/Transactions.js
var require_Transactions3 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Tax/Transactions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Transactions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Transactions = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/tax/transactions/{transaction}"
      }),
      createFromCalculation: stripeMethod({
        method: "POST",
        fullPath: "/v1/tax/transactions/create_from_calculation"
      }),
      createReversal: stripeMethod({
        method: "POST",
        fullPath: "/v1/tax/transactions/create_reversal"
      }),
      listLineItems: stripeMethod({
        method: "GET",
        fullPath: "/v1/tax/transactions/{transaction}/line_items",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Issuing/Transactions.js
var require_Transactions4 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TestHelpers/Issuing/Transactions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Transactions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Transactions = StripeResource_js_1.StripeResource.extend({
      createForceCapture: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/transactions/create_force_capture"
      }),
      createUnlinkedRefund: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/transactions/create_unlinked_refund"
      }),
      refund: stripeMethod({
        method: "POST",
        fullPath: "/v1/test_helpers/issuing/transactions/{transaction}/refund"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Treasury/Transactions.js
var require_Transactions5 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Treasury/Transactions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Transactions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Transactions = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/transactions/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/treasury/transactions",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Radar/ValueListItems.js
var require_ValueListItems = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Radar/ValueListItems.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ValueListItems = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ValueListItems = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/radar/value_list_items"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/radar/value_list_items/{item}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/radar/value_list_items",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/radar/value_list_items/{item}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Radar/ValueLists.js
var require_ValueLists = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Radar/ValueLists.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ValueLists = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ValueLists = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/radar/value_lists" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/radar/value_lists/{value_list}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/radar/value_lists/{value_list}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/radar/value_lists",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/radar/value_lists/{value_list}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Identity/VerificationReports.js
var require_VerificationReports = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Identity/VerificationReports.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VerificationReports = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.VerificationReports = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/identity/verification_reports/{report}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/identity/verification_reports",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Identity/VerificationSessions.js
var require_VerificationSessions = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Identity/VerificationSessions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VerificationSessions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.VerificationSessions = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/identity/verification_sessions"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/identity/verification_sessions/{session}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/identity/verification_sessions/{session}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/identity/verification_sessions",
        methodType: "list"
      }),
      cancel: stripeMethod({
        method: "POST",
        fullPath: "/v1/identity/verification_sessions/{session}/cancel"
      }),
      redact: stripeMethod({
        method: "POST",
        fullPath: "/v1/identity/verification_sessions/{session}/redact"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Accounts.js
var require_Accounts3 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Accounts.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Accounts = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Accounts = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/accounts" }),
      retrieve(id, ...args) {
        if (typeof id === "string") {
          return stripeMethod({
            method: "GET",
            fullPath: "/v1/accounts/{id}"
          }).apply(this, [id, ...args]);
        } else {
          if (id === null || id === void 0) {
            [].shift.apply([id, ...args]);
          }
          return stripeMethod({
            method: "GET",
            fullPath: "/v1/account"
          }).apply(this, [id, ...args]);
        }
      },
      update: stripeMethod({ method: "POST", fullPath: "/v1/accounts/{account}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/accounts",
        methodType: "list"
      }),
      del: stripeMethod({ method: "DELETE", fullPath: "/v1/accounts/{account}" }),
      createExternalAccount: stripeMethod({
        method: "POST",
        fullPath: "/v1/accounts/{account}/external_accounts"
      }),
      createLoginLink: stripeMethod({
        method: "POST",
        fullPath: "/v1/accounts/{account}/login_links"
      }),
      createPerson: stripeMethod({
        method: "POST",
        fullPath: "/v1/accounts/{account}/persons"
      }),
      deleteExternalAccount: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/accounts/{account}/external_accounts/{id}"
      }),
      deletePerson: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/accounts/{account}/persons/{person}"
      }),
      listCapabilities: stripeMethod({
        method: "GET",
        fullPath: "/v1/accounts/{account}/capabilities",
        methodType: "list"
      }),
      listExternalAccounts: stripeMethod({
        method: "GET",
        fullPath: "/v1/accounts/{account}/external_accounts",
        methodType: "list"
      }),
      listPersons: stripeMethod({
        method: "GET",
        fullPath: "/v1/accounts/{account}/persons",
        methodType: "list"
      }),
      reject: stripeMethod({
        method: "POST",
        fullPath: "/v1/accounts/{account}/reject"
      }),
      retrieveCurrent: stripeMethod({ method: "GET", fullPath: "/v1/account" }),
      retrieveCapability: stripeMethod({
        method: "GET",
        fullPath: "/v1/accounts/{account}/capabilities/{capability}"
      }),
      retrieveExternalAccount: stripeMethod({
        method: "GET",
        fullPath: "/v1/accounts/{account}/external_accounts/{id}"
      }),
      retrievePerson: stripeMethod({
        method: "GET",
        fullPath: "/v1/accounts/{account}/persons/{person}"
      }),
      updateCapability: stripeMethod({
        method: "POST",
        fullPath: "/v1/accounts/{account}/capabilities/{capability}"
      }),
      updateExternalAccount: stripeMethod({
        method: "POST",
        fullPath: "/v1/accounts/{account}/external_accounts/{id}"
      }),
      updatePerson: stripeMethod({
        method: "POST",
        fullPath: "/v1/accounts/{account}/persons/{person}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/AccountLinks.js
var require_AccountLinks2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/AccountLinks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AccountLinks = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.AccountLinks = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/account_links" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/AccountSessions.js
var require_AccountSessions = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/AccountSessions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AccountSessions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.AccountSessions = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/account_sessions" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/ApplePayDomains.js
var require_ApplePayDomains = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/ApplePayDomains.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ApplePayDomains = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ApplePayDomains = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/apple_pay/domains" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/apple_pay/domains/{domain}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/apple_pay/domains",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/apple_pay/domains/{domain}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/ApplicationFees.js
var require_ApplicationFees = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/ApplicationFees.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ApplicationFees = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ApplicationFees = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/application_fees/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/application_fees",
        methodType: "list"
      }),
      createRefund: stripeMethod({
        method: "POST",
        fullPath: "/v1/application_fees/{id}/refunds"
      }),
      listRefunds: stripeMethod({
        method: "GET",
        fullPath: "/v1/application_fees/{id}/refunds",
        methodType: "list"
      }),
      retrieveRefund: stripeMethod({
        method: "GET",
        fullPath: "/v1/application_fees/{fee}/refunds/{id}"
      }),
      updateRefund: stripeMethod({
        method: "POST",
        fullPath: "/v1/application_fees/{fee}/refunds/{id}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Balance.js
var require_Balance = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Balance.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Balance = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Balance = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/balance" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/BalanceSettings.js
var require_BalanceSettings = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/BalanceSettings.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BalanceSettings = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.BalanceSettings = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/balance_settings" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/balance_settings" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/BalanceTransactions.js
var require_BalanceTransactions = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/BalanceTransactions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BalanceTransactions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.BalanceTransactions = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/balance_transactions/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/balance_transactions",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Charges.js
var require_Charges = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Charges.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Charges = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Charges = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/charges" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/charges/{charge}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/charges/{charge}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/charges",
        methodType: "list"
      }),
      capture: stripeMethod({
        method: "POST",
        fullPath: "/v1/charges/{charge}/capture"
      }),
      search: stripeMethod({
        method: "GET",
        fullPath: "/v1/charges/search",
        methodType: "search"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/ConfirmationTokens.js
var require_ConfirmationTokens2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/ConfirmationTokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConfirmationTokens = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ConfirmationTokens = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/confirmation_tokens/{confirmation_token}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/CountrySpecs.js
var require_CountrySpecs = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/CountrySpecs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CountrySpecs = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.CountrySpecs = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/country_specs/{country}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/country_specs",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Coupons.js
var require_Coupons = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Coupons.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Coupons = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Coupons = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/coupons" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/coupons/{coupon}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/coupons/{coupon}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/coupons",
        methodType: "list"
      }),
      del: stripeMethod({ method: "DELETE", fullPath: "/v1/coupons/{coupon}" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/CreditNotes.js
var require_CreditNotes = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/CreditNotes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CreditNotes = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.CreditNotes = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/credit_notes" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/credit_notes/{id}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/credit_notes/{id}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/credit_notes",
        methodType: "list"
      }),
      listLineItems: stripeMethod({
        method: "GET",
        fullPath: "/v1/credit_notes/{credit_note}/lines",
        methodType: "list"
      }),
      listPreviewLineItems: stripeMethod({
        method: "GET",
        fullPath: "/v1/credit_notes/preview/lines",
        methodType: "list"
      }),
      preview: stripeMethod({ method: "GET", fullPath: "/v1/credit_notes/preview" }),
      voidCreditNote: stripeMethod({
        method: "POST",
        fullPath: "/v1/credit_notes/{id}/void"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/CustomerSessions.js
var require_CustomerSessions = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/CustomerSessions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CustomerSessions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.CustomerSessions = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/customer_sessions" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Customers.js
var require_Customers2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Customers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Customers = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Customers = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/customers" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/customers/{customer}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/customers/{customer}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers",
        methodType: "list"
      }),
      del: stripeMethod({ method: "DELETE", fullPath: "/v1/customers/{customer}" }),
      createBalanceTransaction: stripeMethod({
        method: "POST",
        fullPath: "/v1/customers/{customer}/balance_transactions"
      }),
      createFundingInstructions: stripeMethod({
        method: "POST",
        fullPath: "/v1/customers/{customer}/funding_instructions"
      }),
      createSource: stripeMethod({
        method: "POST",
        fullPath: "/v1/customers/{customer}/sources"
      }),
      createTaxId: stripeMethod({
        method: "POST",
        fullPath: "/v1/customers/{customer}/tax_ids"
      }),
      deleteDiscount: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/customers/{customer}/discount"
      }),
      deleteSource: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/customers/{customer}/sources/{id}"
      }),
      deleteTaxId: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/customers/{customer}/tax_ids/{id}"
      }),
      listBalanceTransactions: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/{customer}/balance_transactions",
        methodType: "list"
      }),
      listCashBalanceTransactions: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/{customer}/cash_balance_transactions",
        methodType: "list"
      }),
      listPaymentMethods: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/{customer}/payment_methods",
        methodType: "list"
      }),
      listSources: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/{customer}/sources",
        methodType: "list"
      }),
      listTaxIds: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/{customer}/tax_ids",
        methodType: "list"
      }),
      retrieveBalanceTransaction: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/{customer}/balance_transactions/{transaction}"
      }),
      retrieveCashBalance: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/{customer}/cash_balance"
      }),
      retrieveCashBalanceTransaction: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/{customer}/cash_balance_transactions/{transaction}"
      }),
      retrievePaymentMethod: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/{customer}/payment_methods/{payment_method}"
      }),
      retrieveSource: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/{customer}/sources/{id}"
      }),
      retrieveTaxId: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/{customer}/tax_ids/{id}"
      }),
      search: stripeMethod({
        method: "GET",
        fullPath: "/v1/customers/search",
        methodType: "search"
      }),
      updateBalanceTransaction: stripeMethod({
        method: "POST",
        fullPath: "/v1/customers/{customer}/balance_transactions/{transaction}"
      }),
      updateCashBalance: stripeMethod({
        method: "POST",
        fullPath: "/v1/customers/{customer}/cash_balance"
      }),
      updateSource: stripeMethod({
        method: "POST",
        fullPath: "/v1/customers/{customer}/sources/{id}"
      }),
      verifySource: stripeMethod({
        method: "POST",
        fullPath: "/v1/customers/{customer}/sources/{id}/verify"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Disputes.js
var require_Disputes2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Disputes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Disputes = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Disputes = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/disputes/{dispute}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/disputes/{dispute}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/disputes",
        methodType: "list"
      }),
      close: stripeMethod({
        method: "POST",
        fullPath: "/v1/disputes/{dispute}/close"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/EphemeralKeys.js
var require_EphemeralKeys = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/EphemeralKeys.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EphemeralKeys = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.EphemeralKeys = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/ephemeral_keys",
        validator: (data, options) => {
          if (!options.headers || !options.headers["Stripe-Version"]) {
            throw new Error("Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node");
          }
        }
      }),
      del: stripeMethod({ method: "DELETE", fullPath: "/v1/ephemeral_keys/{key}" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Events.js
var require_Events2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Events.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Events = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Events = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/events/{id}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/events",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/ExchangeRates.js
var require_ExchangeRates = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/ExchangeRates.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ExchangeRates = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ExchangeRates = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/exchange_rates/{rate_id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/exchange_rates",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/FileLinks.js
var require_FileLinks = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/FileLinks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FileLinks = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.FileLinks = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/file_links" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/file_links/{link}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/file_links/{link}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/file_links",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/multipart.js
var require_multipart = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/multipart.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.multipartRequestDataProcessor = void 0;
    var utils_js_1 = require_utils();
    var multipartDataGenerator = (method, data, headers) => {
      const segno = (Math.round(Math.random() * 1e16) + Math.round(Math.random() * 1e16)).toString();
      headers["Content-Type"] = `multipart/form-data; boundary=${segno}`;
      const textEncoder = new TextEncoder();
      let buffer = new Uint8Array(0);
      const endBuffer = textEncoder.encode("\r\n");
      function push(l) {
        const prevBuffer = buffer;
        const newBuffer = l instanceof Uint8Array ? l : new Uint8Array(textEncoder.encode(l));
        buffer = new Uint8Array(prevBuffer.length + newBuffer.length + 2);
        buffer.set(prevBuffer);
        buffer.set(newBuffer, prevBuffer.length);
        buffer.set(endBuffer, buffer.length - 2);
      }
      function q(s2) {
        return `"${s2.replace(/"|"/g, "%22").replace(/\r\n|\r|\n/g, " ")}"`;
      }
      const flattenedData = (0, utils_js_1.flattenAndStringify)(data);
      for (const k in flattenedData) {
        if (!Object.prototype.hasOwnProperty.call(flattenedData, k)) {
          continue;
        }
        const v = flattenedData[k];
        push(`--${segno}`);
        if (Object.prototype.hasOwnProperty.call(v, "data")) {
          const typedEntry = v;
          push(`Content-Disposition: form-data; name=${q(k)}; filename=${q(typedEntry.name || "blob")}`);
          push(`Content-Type: ${typedEntry.type || "application/octet-stream"}`);
          push("");
          push(typedEntry.data);
        } else {
          push(`Content-Disposition: form-data; name=${q(k)}`);
          push("");
          push(v);
        }
      }
      push(`--${segno}--`);
      return buffer;
    };
    function multipartRequestDataProcessor(method, data, headers, callback) {
      data = data || {};
      if (method !== "POST") {
        return callback(null, (0, utils_js_1.queryStringifyRequestData)(data));
      }
      this._stripe._platformFunctions.tryBufferData(data).then((bufferedData) => {
        const buffer = multipartDataGenerator(method, bufferedData, headers);
        return callback(null, buffer);
      }).catch((err) => callback(err, null));
    }
    exports2.multipartRequestDataProcessor = multipartRequestDataProcessor;
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Files.js
var require_Files = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Files.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Files = void 0;
    var multipart_js_1 = require_multipart();
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Files = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/files",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        host: "files.stripe.com"
      }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/files/{file}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/files",
        methodType: "list"
      }),
      requestDataProcessor: multipart_js_1.multipartRequestDataProcessor
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/InvoiceItems.js
var require_InvoiceItems = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/InvoiceItems.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InvoiceItems = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.InvoiceItems = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/invoiceitems" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/invoiceitems/{invoiceitem}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoiceitems/{invoiceitem}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/invoiceitems",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/invoiceitems/{invoiceitem}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/InvoicePayments.js
var require_InvoicePayments = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/InvoicePayments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InvoicePayments = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.InvoicePayments = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/invoice_payments/{invoice_payment}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/invoice_payments",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/InvoiceRenderingTemplates.js
var require_InvoiceRenderingTemplates = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/InvoiceRenderingTemplates.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InvoiceRenderingTemplates = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.InvoiceRenderingTemplates = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/invoice_rendering_templates/{template}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/invoice_rendering_templates",
        methodType: "list"
      }),
      archive: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoice_rendering_templates/{template}/archive"
      }),
      unarchive: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoice_rendering_templates/{template}/unarchive"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Invoices.js
var require_Invoices = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Invoices.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Invoices = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Invoices = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/invoices" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/invoices/{invoice}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/invoices/{invoice}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/invoices",
        methodType: "list"
      }),
      del: stripeMethod({ method: "DELETE", fullPath: "/v1/invoices/{invoice}" }),
      addLines: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoices/{invoice}/add_lines"
      }),
      attachPayment: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoices/{invoice}/attach_payment"
      }),
      createPreview: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoices/create_preview"
      }),
      finalizeInvoice: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoices/{invoice}/finalize"
      }),
      listLineItems: stripeMethod({
        method: "GET",
        fullPath: "/v1/invoices/{invoice}/lines",
        methodType: "list"
      }),
      markUncollectible: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoices/{invoice}/mark_uncollectible"
      }),
      pay: stripeMethod({ method: "POST", fullPath: "/v1/invoices/{invoice}/pay" }),
      removeLines: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoices/{invoice}/remove_lines"
      }),
      search: stripeMethod({
        method: "GET",
        fullPath: "/v1/invoices/search",
        methodType: "search"
      }),
      sendInvoice: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoices/{invoice}/send"
      }),
      updateLines: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoices/{invoice}/update_lines"
      }),
      updateLineItem: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoices/{invoice}/lines/{line_item_id}"
      }),
      voidInvoice: stripeMethod({
        method: "POST",
        fullPath: "/v1/invoices/{invoice}/void"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Mandates.js
var require_Mandates = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Mandates.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Mandates = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Mandates = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/mandates/{mandate}" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/OAuth.js
var require_OAuth = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/OAuth.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OAuth = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var utils_js_1 = require_utils();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    var oAuthHost = "connect.stripe.com";
    exports2.OAuth = StripeResource_js_1.StripeResource.extend({
      basePath: "/",
      authorizeUrl(params, options) {
        params = params || {};
        options = options || {};
        let path = "oauth/authorize";
        if (options.express) {
          path = `express/${path}`;
        }
        if (!params.response_type) {
          params.response_type = "code";
        }
        if (!params.client_id) {
          params.client_id = this._stripe.getClientId();
        }
        if (!params.scope) {
          params.scope = "read_write";
        }
        return `https://${oAuthHost}/${path}?${(0, utils_js_1.queryStringifyRequestData)(params)}`;
      },
      token: stripeMethod({
        method: "POST",
        path: "oauth/token",
        host: oAuthHost
      }),
      deauthorize(spec, ...args) {
        if (!spec.client_id) {
          spec.client_id = this._stripe.getClientId();
        }
        return stripeMethod({
          method: "POST",
          path: "oauth/deauthorize",
          host: oAuthHost
        }).apply(this, [spec, ...args]);
      }
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/PaymentAttemptRecords.js
var require_PaymentAttemptRecords = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/PaymentAttemptRecords.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PaymentAttemptRecords = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PaymentAttemptRecords = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_attempt_records/{id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_attempt_records",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/PaymentIntents.js
var require_PaymentIntents = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/PaymentIntents.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PaymentIntents = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PaymentIntents = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/payment_intents" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_intents/{intent}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_intents/{intent}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_intents",
        methodType: "list"
      }),
      applyCustomerBalance: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_intents/{intent}/apply_customer_balance"
      }),
      cancel: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_intents/{intent}/cancel"
      }),
      capture: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_intents/{intent}/capture"
      }),
      confirm: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_intents/{intent}/confirm"
      }),
      incrementAuthorization: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_intents/{intent}/increment_authorization"
      }),
      listAmountDetailsLineItems: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_intents/{intent}/amount_details_line_items",
        methodType: "list"
      }),
      search: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_intents/search",
        methodType: "search"
      }),
      verifyMicrodeposits: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_intents/{intent}/verify_microdeposits"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/PaymentLinks.js
var require_PaymentLinks = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/PaymentLinks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PaymentLinks = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PaymentLinks = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/payment_links" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_links/{payment_link}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_links/{payment_link}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_links",
        methodType: "list"
      }),
      listLineItems: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_links/{payment_link}/line_items",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/PaymentMethodConfigurations.js
var require_PaymentMethodConfigurations = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/PaymentMethodConfigurations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PaymentMethodConfigurations = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PaymentMethodConfigurations = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_method_configurations"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_method_configurations/{configuration}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_method_configurations/{configuration}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_method_configurations",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/PaymentMethodDomains.js
var require_PaymentMethodDomains = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/PaymentMethodDomains.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PaymentMethodDomains = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PaymentMethodDomains = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_method_domains"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_method_domains/{payment_method_domain}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_method_domains/{payment_method_domain}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_method_domains",
        methodType: "list"
      }),
      validate: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_method_domains/{payment_method_domain}/validate"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/PaymentMethods.js
var require_PaymentMethods = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/PaymentMethods.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PaymentMethods = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PaymentMethods = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/payment_methods" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_methods/{payment_method}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_methods/{payment_method}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/payment_methods",
        methodType: "list"
      }),
      attach: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_methods/{payment_method}/attach"
      }),
      detach: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_methods/{payment_method}/detach"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/PaymentRecords.js
var require_PaymentRecords = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/PaymentRecords.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PaymentRecords = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PaymentRecords = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/payment_records/{id}" }),
      reportPayment: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_records/report_payment"
      }),
      reportPaymentAttempt: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_records/{id}/report_payment_attempt"
      }),
      reportPaymentAttemptCanceled: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_records/{id}/report_payment_attempt_canceled"
      }),
      reportPaymentAttemptFailed: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_records/{id}/report_payment_attempt_failed"
      }),
      reportPaymentAttemptGuaranteed: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_records/{id}/report_payment_attempt_guaranteed"
      }),
      reportPaymentAttemptInformational: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_records/{id}/report_payment_attempt_informational"
      }),
      reportRefund: stripeMethod({
        method: "POST",
        fullPath: "/v1/payment_records/{id}/report_refund"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Payouts.js
var require_Payouts = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Payouts.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Payouts = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Payouts = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/payouts" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/payouts/{payout}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/payouts/{payout}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/payouts",
        methodType: "list"
      }),
      cancel: stripeMethod({
        method: "POST",
        fullPath: "/v1/payouts/{payout}/cancel"
      }),
      reverse: stripeMethod({
        method: "POST",
        fullPath: "/v1/payouts/{payout}/reverse"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Plans.js
var require_Plans = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Plans.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Plans = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Plans = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/plans" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/plans/{plan}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/plans/{plan}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/plans",
        methodType: "list"
      }),
      del: stripeMethod({ method: "DELETE", fullPath: "/v1/plans/{plan}" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Prices.js
var require_Prices = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Prices.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Prices = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Prices = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/prices" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/prices/{price}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/prices/{price}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/prices",
        methodType: "list"
      }),
      search: stripeMethod({
        method: "GET",
        fullPath: "/v1/prices/search",
        methodType: "search"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Products.js
var require_Products2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Products.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Products = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Products = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/products" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/products/{id}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/products/{id}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/products",
        methodType: "list"
      }),
      del: stripeMethod({ method: "DELETE", fullPath: "/v1/products/{id}" }),
      createFeature: stripeMethod({
        method: "POST",
        fullPath: "/v1/products/{product}/features"
      }),
      deleteFeature: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/products/{product}/features/{id}"
      }),
      listFeatures: stripeMethod({
        method: "GET",
        fullPath: "/v1/products/{product}/features",
        methodType: "list"
      }),
      retrieveFeature: stripeMethod({
        method: "GET",
        fullPath: "/v1/products/{product}/features/{id}"
      }),
      search: stripeMethod({
        method: "GET",
        fullPath: "/v1/products/search",
        methodType: "search"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/PromotionCodes.js
var require_PromotionCodes = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/PromotionCodes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PromotionCodes = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.PromotionCodes = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/promotion_codes" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/promotion_codes/{promotion_code}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/promotion_codes/{promotion_code}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/promotion_codes",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Quotes.js
var require_Quotes = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Quotes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Quotes = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Quotes = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/quotes" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/quotes/{quote}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/quotes/{quote}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/quotes",
        methodType: "list"
      }),
      accept: stripeMethod({ method: "POST", fullPath: "/v1/quotes/{quote}/accept" }),
      cancel: stripeMethod({ method: "POST", fullPath: "/v1/quotes/{quote}/cancel" }),
      finalizeQuote: stripeMethod({
        method: "POST",
        fullPath: "/v1/quotes/{quote}/finalize"
      }),
      listComputedUpfrontLineItems: stripeMethod({
        method: "GET",
        fullPath: "/v1/quotes/{quote}/computed_upfront_line_items",
        methodType: "list"
      }),
      listLineItems: stripeMethod({
        method: "GET",
        fullPath: "/v1/quotes/{quote}/line_items",
        methodType: "list"
      }),
      pdf: stripeMethod({
        method: "GET",
        fullPath: "/v1/quotes/{quote}/pdf",
        host: "files.stripe.com",
        streaming: true
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Refunds.js
var require_Refunds2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Refunds.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Refunds = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Refunds = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/refunds" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/refunds/{refund}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/refunds/{refund}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/refunds",
        methodType: "list"
      }),
      cancel: stripeMethod({
        method: "POST",
        fullPath: "/v1/refunds/{refund}/cancel"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Reviews.js
var require_Reviews = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Reviews.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Reviews = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Reviews = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/reviews/{review}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/reviews",
        methodType: "list"
      }),
      approve: stripeMethod({
        method: "POST",
        fullPath: "/v1/reviews/{review}/approve"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/SetupAttempts.js
var require_SetupAttempts = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/SetupAttempts.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SetupAttempts = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.SetupAttempts = StripeResource_js_1.StripeResource.extend({
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/setup_attempts",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/SetupIntents.js
var require_SetupIntents = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/SetupIntents.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SetupIntents = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.SetupIntents = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/setup_intents" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/setup_intents/{intent}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/setup_intents/{intent}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/setup_intents",
        methodType: "list"
      }),
      cancel: stripeMethod({
        method: "POST",
        fullPath: "/v1/setup_intents/{intent}/cancel"
      }),
      confirm: stripeMethod({
        method: "POST",
        fullPath: "/v1/setup_intents/{intent}/confirm"
      }),
      verifyMicrodeposits: stripeMethod({
        method: "POST",
        fullPath: "/v1/setup_intents/{intent}/verify_microdeposits"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/ShippingRates.js
var require_ShippingRates = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/ShippingRates.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ShippingRates = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.ShippingRates = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/shipping_rates" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/shipping_rates/{shipping_rate_token}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/shipping_rates/{shipping_rate_token}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/shipping_rates",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Sources.js
var require_Sources = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Sources.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Sources = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Sources = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/sources" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/sources/{source}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/sources/{source}" }),
      listSourceTransactions: stripeMethod({
        method: "GET",
        fullPath: "/v1/sources/{source}/source_transactions",
        methodType: "list"
      }),
      verify: stripeMethod({
        method: "POST",
        fullPath: "/v1/sources/{source}/verify"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/SubscriptionItems.js
var require_SubscriptionItems = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/SubscriptionItems.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SubscriptionItems = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.SubscriptionItems = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/subscription_items" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/subscription_items/{item}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/subscription_items/{item}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/subscription_items",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/subscription_items/{item}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/SubscriptionSchedules.js
var require_SubscriptionSchedules = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/SubscriptionSchedules.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SubscriptionSchedules = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.SubscriptionSchedules = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({
        method: "POST",
        fullPath: "/v1/subscription_schedules"
      }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/subscription_schedules/{schedule}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/subscription_schedules/{schedule}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/subscription_schedules",
        methodType: "list"
      }),
      cancel: stripeMethod({
        method: "POST",
        fullPath: "/v1/subscription_schedules/{schedule}/cancel"
      }),
      release: stripeMethod({
        method: "POST",
        fullPath: "/v1/subscription_schedules/{schedule}/release"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Subscriptions.js
var require_Subscriptions = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Subscriptions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Subscriptions = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Subscriptions = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/subscriptions" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/subscriptions/{subscription_exposed_id}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/subscriptions/{subscription_exposed_id}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/subscriptions",
        methodType: "list"
      }),
      cancel: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/subscriptions/{subscription_exposed_id}"
      }),
      deleteDiscount: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/subscriptions/{subscription_exposed_id}/discount"
      }),
      migrate: stripeMethod({
        method: "POST",
        fullPath: "/v1/subscriptions/{subscription}/migrate"
      }),
      resume: stripeMethod({
        method: "POST",
        fullPath: "/v1/subscriptions/{subscription}/resume"
      }),
      search: stripeMethod({
        method: "GET",
        fullPath: "/v1/subscriptions/search",
        methodType: "search"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TaxCodes.js
var require_TaxCodes = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TaxCodes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TaxCodes = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.TaxCodes = StripeResource_js_1.StripeResource.extend({
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/tax_codes/{id}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/tax_codes",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TaxIds.js
var require_TaxIds = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TaxIds.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TaxIds = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.TaxIds = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/tax_ids" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/tax_ids/{id}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/tax_ids",
        methodType: "list"
      }),
      del: stripeMethod({ method: "DELETE", fullPath: "/v1/tax_ids/{id}" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/TaxRates.js
var require_TaxRates = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/TaxRates.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TaxRates = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.TaxRates = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/tax_rates" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/tax_rates/{tax_rate}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/tax_rates/{tax_rate}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/tax_rates",
        methodType: "list"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Tokens.js
var require_Tokens2 = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Tokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Tokens = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Tokens = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/tokens" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/tokens/{token}" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Topups.js
var require_Topups = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Topups.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Topups = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Topups = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/topups" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/topups/{topup}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/topups/{topup}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/topups",
        methodType: "list"
      }),
      cancel: stripeMethod({ method: "POST", fullPath: "/v1/topups/{topup}/cancel" })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/Transfers.js
var require_Transfers = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/Transfers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Transfers = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.Transfers = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/transfers" }),
      retrieve: stripeMethod({ method: "GET", fullPath: "/v1/transfers/{transfer}" }),
      update: stripeMethod({ method: "POST", fullPath: "/v1/transfers/{transfer}" }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/transfers",
        methodType: "list"
      }),
      createReversal: stripeMethod({
        method: "POST",
        fullPath: "/v1/transfers/{id}/reversals"
      }),
      listReversals: stripeMethod({
        method: "GET",
        fullPath: "/v1/transfers/{id}/reversals",
        methodType: "list"
      }),
      retrieveReversal: stripeMethod({
        method: "GET",
        fullPath: "/v1/transfers/{transfer}/reversals/{id}"
      }),
      updateReversal: stripeMethod({
        method: "POST",
        fullPath: "/v1/transfers/{transfer}/reversals/{id}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources/WebhookEndpoints.js
var require_WebhookEndpoints = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources/WebhookEndpoints.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WebhookEndpoints = void 0;
    var StripeResource_js_1 = require_StripeResource();
    var stripeMethod = StripeResource_js_1.StripeResource.method;
    exports2.WebhookEndpoints = StripeResource_js_1.StripeResource.extend({
      create: stripeMethod({ method: "POST", fullPath: "/v1/webhook_endpoints" }),
      retrieve: stripeMethod({
        method: "GET",
        fullPath: "/v1/webhook_endpoints/{webhook_endpoint}"
      }),
      update: stripeMethod({
        method: "POST",
        fullPath: "/v1/webhook_endpoints/{webhook_endpoint}"
      }),
      list: stripeMethod({
        method: "GET",
        fullPath: "/v1/webhook_endpoints",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        fullPath: "/v1/webhook_endpoints/{webhook_endpoint}"
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/resources.js
var require_resources = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/resources.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Subscriptions = exports2.SubscriptionSchedules = exports2.SubscriptionItems = exports2.Sources = exports2.ShippingRates = exports2.SetupIntents = exports2.SetupAttempts = exports2.Reviews = exports2.Refunds = exports2.Quotes = exports2.PromotionCodes = exports2.Products = exports2.Prices = exports2.Plans = exports2.Payouts = exports2.PaymentRecords = exports2.PaymentMethods = exports2.PaymentMethodDomains = exports2.PaymentMethodConfigurations = exports2.PaymentLinks = exports2.PaymentIntents = exports2.PaymentAttemptRecords = exports2.OAuth = exports2.Mandates = exports2.Invoices = exports2.InvoiceRenderingTemplates = exports2.InvoicePayments = exports2.InvoiceItems = exports2.Files = exports2.FileLinks = exports2.ExchangeRates = exports2.Events = exports2.EphemeralKeys = exports2.Disputes = exports2.Customers = exports2.CustomerSessions = exports2.CreditNotes = exports2.Coupons = exports2.CountrySpecs = exports2.ConfirmationTokens = exports2.Charges = exports2.BalanceTransactions = exports2.BalanceSettings = exports2.Balance = exports2.ApplicationFees = exports2.ApplePayDomains = exports2.Accounts = exports2.AccountSessions = exports2.AccountLinks = exports2.Account = void 0;
    exports2.V2 = exports2.Treasury = exports2.TestHelpers = exports2.Terminal = exports2.Tax = exports2.Sigma = exports2.Reporting = exports2.Radar = exports2.Issuing = exports2.Identity = exports2.Forwarding = exports2.FinancialConnections = exports2.Entitlements = exports2.Climate = exports2.Checkout = exports2.BillingPortal = exports2.Billing = exports2.Apps = exports2.WebhookEndpoints = exports2.Transfers = exports2.Topups = exports2.Tokens = exports2.TaxRates = exports2.TaxIds = exports2.TaxCodes = void 0;
    var ResourceNamespace_js_1 = require_ResourceNamespace();
    var AccountLinks_js_1 = require_AccountLinks();
    var AccountTokens_js_1 = require_AccountTokens();
    var Accounts_js_1 = require_Accounts();
    var Accounts_js_2 = require_Accounts2();
    var ActiveEntitlements_js_1 = require_ActiveEntitlements();
    var Alerts_js_1 = require_Alerts();
    var Associations_js_1 = require_Associations();
    var Authorizations_js_1 = require_Authorizations();
    var Authorizations_js_2 = require_Authorizations2();
    var Calculations_js_1 = require_Calculations();
    var Cardholders_js_1 = require_Cardholders();
    var Cards_js_1 = require_Cards();
    var Cards_js_2 = require_Cards2();
    var Configurations_js_1 = require_Configurations();
    var Configurations_js_2 = require_Configurations2();
    var ConfirmationTokens_js_1 = require_ConfirmationTokens();
    var ConnectionTokens_js_1 = require_ConnectionTokens();
    var CreditBalanceSummary_js_1 = require_CreditBalanceSummary();
    var CreditBalanceTransactions_js_1 = require_CreditBalanceTransactions();
    var CreditGrants_js_1 = require_CreditGrants();
    var CreditReversals_js_1 = require_CreditReversals();
    var Customers_js_1 = require_Customers();
    var DebitReversals_js_1 = require_DebitReversals();
    var Disputes_js_1 = require_Disputes();
    var EarlyFraudWarnings_js_1 = require_EarlyFraudWarnings();
    var EventDestinations_js_1 = require_EventDestinations();
    var Events_js_1 = require_Events();
    var Features_js_1 = require_Features();
    var FinancialAccounts_js_1 = require_FinancialAccounts();
    var InboundTransfers_js_1 = require_InboundTransfers();
    var InboundTransfers_js_2 = require_InboundTransfers2();
    var Locations_js_1 = require_Locations();
    var MeterEventAdjustments_js_1 = require_MeterEventAdjustments();
    var MeterEventAdjustments_js_2 = require_MeterEventAdjustments2();
    var MeterEventSession_js_1 = require_MeterEventSession();
    var MeterEventStream_js_1 = require_MeterEventStream();
    var MeterEvents_js_1 = require_MeterEvents();
    var MeterEvents_js_2 = require_MeterEvents2();
    var Meters_js_1 = require_Meters();
    var OnboardingLinks_js_1 = require_OnboardingLinks();
    var Orders_js_1 = require_Orders();
    var OutboundPayments_js_1 = require_OutboundPayments();
    var OutboundPayments_js_2 = require_OutboundPayments2();
    var OutboundTransfers_js_1 = require_OutboundTransfers();
    var OutboundTransfers_js_2 = require_OutboundTransfers2();
    var PaymentEvaluations_js_1 = require_PaymentEvaluations();
    var PersonalizationDesigns_js_1 = require_PersonalizationDesigns();
    var PersonalizationDesigns_js_2 = require_PersonalizationDesigns2();
    var PhysicalBundles_js_1 = require_PhysicalBundles();
    var Products_js_1 = require_Products();
    var Readers_js_1 = require_Readers();
    var Readers_js_2 = require_Readers2();
    var ReceivedCredits_js_1 = require_ReceivedCredits();
    var ReceivedCredits_js_2 = require_ReceivedCredits2();
    var ReceivedDebits_js_1 = require_ReceivedDebits();
    var ReceivedDebits_js_2 = require_ReceivedDebits2();
    var Refunds_js_1 = require_Refunds();
    var Registrations_js_1 = require_Registrations();
    var ReportRuns_js_1 = require_ReportRuns();
    var ReportTypes_js_1 = require_ReportTypes();
    var Requests_js_1 = require_Requests();
    var ScheduledQueryRuns_js_1 = require_ScheduledQueryRuns();
    var Secrets_js_1 = require_Secrets();
    var Sessions_js_1 = require_Sessions();
    var Sessions_js_2 = require_Sessions2();
    var Sessions_js_3 = require_Sessions3();
    var Settings_js_1 = require_Settings();
    var Suppliers_js_1 = require_Suppliers();
    var TestClocks_js_1 = require_TestClocks();
    var Tokens_js_1 = require_Tokens();
    var TransactionEntries_js_1 = require_TransactionEntries();
    var Transactions_js_1 = require_Transactions();
    var Transactions_js_2 = require_Transactions2();
    var Transactions_js_3 = require_Transactions3();
    var Transactions_js_4 = require_Transactions4();
    var Transactions_js_5 = require_Transactions5();
    var ValueListItems_js_1 = require_ValueListItems();
    var ValueLists_js_1 = require_ValueLists();
    var VerificationReports_js_1 = require_VerificationReports();
    var VerificationSessions_js_1 = require_VerificationSessions();
    var Accounts_js_3 = require_Accounts3();
    Object.defineProperty(exports2, "Account", { enumerable: true, get: function() {
      return Accounts_js_3.Accounts;
    } });
    var AccountLinks_js_2 = require_AccountLinks2();
    Object.defineProperty(exports2, "AccountLinks", { enumerable: true, get: function() {
      return AccountLinks_js_2.AccountLinks;
    } });
    var AccountSessions_js_1 = require_AccountSessions();
    Object.defineProperty(exports2, "AccountSessions", { enumerable: true, get: function() {
      return AccountSessions_js_1.AccountSessions;
    } });
    var Accounts_js_4 = require_Accounts3();
    Object.defineProperty(exports2, "Accounts", { enumerable: true, get: function() {
      return Accounts_js_4.Accounts;
    } });
    var ApplePayDomains_js_1 = require_ApplePayDomains();
    Object.defineProperty(exports2, "ApplePayDomains", { enumerable: true, get: function() {
      return ApplePayDomains_js_1.ApplePayDomains;
    } });
    var ApplicationFees_js_1 = require_ApplicationFees();
    Object.defineProperty(exports2, "ApplicationFees", { enumerable: true, get: function() {
      return ApplicationFees_js_1.ApplicationFees;
    } });
    var Balance_js_1 = require_Balance();
    Object.defineProperty(exports2, "Balance", { enumerable: true, get: function() {
      return Balance_js_1.Balance;
    } });
    var BalanceSettings_js_1 = require_BalanceSettings();
    Object.defineProperty(exports2, "BalanceSettings", { enumerable: true, get: function() {
      return BalanceSettings_js_1.BalanceSettings;
    } });
    var BalanceTransactions_js_1 = require_BalanceTransactions();
    Object.defineProperty(exports2, "BalanceTransactions", { enumerable: true, get: function() {
      return BalanceTransactions_js_1.BalanceTransactions;
    } });
    var Charges_js_1 = require_Charges();
    Object.defineProperty(exports2, "Charges", { enumerable: true, get: function() {
      return Charges_js_1.Charges;
    } });
    var ConfirmationTokens_js_2 = require_ConfirmationTokens2();
    Object.defineProperty(exports2, "ConfirmationTokens", { enumerable: true, get: function() {
      return ConfirmationTokens_js_2.ConfirmationTokens;
    } });
    var CountrySpecs_js_1 = require_CountrySpecs();
    Object.defineProperty(exports2, "CountrySpecs", { enumerable: true, get: function() {
      return CountrySpecs_js_1.CountrySpecs;
    } });
    var Coupons_js_1 = require_Coupons();
    Object.defineProperty(exports2, "Coupons", { enumerable: true, get: function() {
      return Coupons_js_1.Coupons;
    } });
    var CreditNotes_js_1 = require_CreditNotes();
    Object.defineProperty(exports2, "CreditNotes", { enumerable: true, get: function() {
      return CreditNotes_js_1.CreditNotes;
    } });
    var CustomerSessions_js_1 = require_CustomerSessions();
    Object.defineProperty(exports2, "CustomerSessions", { enumerable: true, get: function() {
      return CustomerSessions_js_1.CustomerSessions;
    } });
    var Customers_js_2 = require_Customers2();
    Object.defineProperty(exports2, "Customers", { enumerable: true, get: function() {
      return Customers_js_2.Customers;
    } });
    var Disputes_js_2 = require_Disputes2();
    Object.defineProperty(exports2, "Disputes", { enumerable: true, get: function() {
      return Disputes_js_2.Disputes;
    } });
    var EphemeralKeys_js_1 = require_EphemeralKeys();
    Object.defineProperty(exports2, "EphemeralKeys", { enumerable: true, get: function() {
      return EphemeralKeys_js_1.EphemeralKeys;
    } });
    var Events_js_2 = require_Events2();
    Object.defineProperty(exports2, "Events", { enumerable: true, get: function() {
      return Events_js_2.Events;
    } });
    var ExchangeRates_js_1 = require_ExchangeRates();
    Object.defineProperty(exports2, "ExchangeRates", { enumerable: true, get: function() {
      return ExchangeRates_js_1.ExchangeRates;
    } });
    var FileLinks_js_1 = require_FileLinks();
    Object.defineProperty(exports2, "FileLinks", { enumerable: true, get: function() {
      return FileLinks_js_1.FileLinks;
    } });
    var Files_js_1 = require_Files();
    Object.defineProperty(exports2, "Files", { enumerable: true, get: function() {
      return Files_js_1.Files;
    } });
    var InvoiceItems_js_1 = require_InvoiceItems();
    Object.defineProperty(exports2, "InvoiceItems", { enumerable: true, get: function() {
      return InvoiceItems_js_1.InvoiceItems;
    } });
    var InvoicePayments_js_1 = require_InvoicePayments();
    Object.defineProperty(exports2, "InvoicePayments", { enumerable: true, get: function() {
      return InvoicePayments_js_1.InvoicePayments;
    } });
    var InvoiceRenderingTemplates_js_1 = require_InvoiceRenderingTemplates();
    Object.defineProperty(exports2, "InvoiceRenderingTemplates", { enumerable: true, get: function() {
      return InvoiceRenderingTemplates_js_1.InvoiceRenderingTemplates;
    } });
    var Invoices_js_1 = require_Invoices();
    Object.defineProperty(exports2, "Invoices", { enumerable: true, get: function() {
      return Invoices_js_1.Invoices;
    } });
    var Mandates_js_1 = require_Mandates();
    Object.defineProperty(exports2, "Mandates", { enumerable: true, get: function() {
      return Mandates_js_1.Mandates;
    } });
    var OAuth_js_1 = require_OAuth();
    Object.defineProperty(exports2, "OAuth", { enumerable: true, get: function() {
      return OAuth_js_1.OAuth;
    } });
    var PaymentAttemptRecords_js_1 = require_PaymentAttemptRecords();
    Object.defineProperty(exports2, "PaymentAttemptRecords", { enumerable: true, get: function() {
      return PaymentAttemptRecords_js_1.PaymentAttemptRecords;
    } });
    var PaymentIntents_js_1 = require_PaymentIntents();
    Object.defineProperty(exports2, "PaymentIntents", { enumerable: true, get: function() {
      return PaymentIntents_js_1.PaymentIntents;
    } });
    var PaymentLinks_js_1 = require_PaymentLinks();
    Object.defineProperty(exports2, "PaymentLinks", { enumerable: true, get: function() {
      return PaymentLinks_js_1.PaymentLinks;
    } });
    var PaymentMethodConfigurations_js_1 = require_PaymentMethodConfigurations();
    Object.defineProperty(exports2, "PaymentMethodConfigurations", { enumerable: true, get: function() {
      return PaymentMethodConfigurations_js_1.PaymentMethodConfigurations;
    } });
    var PaymentMethodDomains_js_1 = require_PaymentMethodDomains();
    Object.defineProperty(exports2, "PaymentMethodDomains", { enumerable: true, get: function() {
      return PaymentMethodDomains_js_1.PaymentMethodDomains;
    } });
    var PaymentMethods_js_1 = require_PaymentMethods();
    Object.defineProperty(exports2, "PaymentMethods", { enumerable: true, get: function() {
      return PaymentMethods_js_1.PaymentMethods;
    } });
    var PaymentRecords_js_1 = require_PaymentRecords();
    Object.defineProperty(exports2, "PaymentRecords", { enumerable: true, get: function() {
      return PaymentRecords_js_1.PaymentRecords;
    } });
    var Payouts_js_1 = require_Payouts();
    Object.defineProperty(exports2, "Payouts", { enumerable: true, get: function() {
      return Payouts_js_1.Payouts;
    } });
    var Plans_js_1 = require_Plans();
    Object.defineProperty(exports2, "Plans", { enumerable: true, get: function() {
      return Plans_js_1.Plans;
    } });
    var Prices_js_1 = require_Prices();
    Object.defineProperty(exports2, "Prices", { enumerable: true, get: function() {
      return Prices_js_1.Prices;
    } });
    var Products_js_2 = require_Products2();
    Object.defineProperty(exports2, "Products", { enumerable: true, get: function() {
      return Products_js_2.Products;
    } });
    var PromotionCodes_js_1 = require_PromotionCodes();
    Object.defineProperty(exports2, "PromotionCodes", { enumerable: true, get: function() {
      return PromotionCodes_js_1.PromotionCodes;
    } });
    var Quotes_js_1 = require_Quotes();
    Object.defineProperty(exports2, "Quotes", { enumerable: true, get: function() {
      return Quotes_js_1.Quotes;
    } });
    var Refunds_js_2 = require_Refunds2();
    Object.defineProperty(exports2, "Refunds", { enumerable: true, get: function() {
      return Refunds_js_2.Refunds;
    } });
    var Reviews_js_1 = require_Reviews();
    Object.defineProperty(exports2, "Reviews", { enumerable: true, get: function() {
      return Reviews_js_1.Reviews;
    } });
    var SetupAttempts_js_1 = require_SetupAttempts();
    Object.defineProperty(exports2, "SetupAttempts", { enumerable: true, get: function() {
      return SetupAttempts_js_1.SetupAttempts;
    } });
    var SetupIntents_js_1 = require_SetupIntents();
    Object.defineProperty(exports2, "SetupIntents", { enumerable: true, get: function() {
      return SetupIntents_js_1.SetupIntents;
    } });
    var ShippingRates_js_1 = require_ShippingRates();
    Object.defineProperty(exports2, "ShippingRates", { enumerable: true, get: function() {
      return ShippingRates_js_1.ShippingRates;
    } });
    var Sources_js_1 = require_Sources();
    Object.defineProperty(exports2, "Sources", { enumerable: true, get: function() {
      return Sources_js_1.Sources;
    } });
    var SubscriptionItems_js_1 = require_SubscriptionItems();
    Object.defineProperty(exports2, "SubscriptionItems", { enumerable: true, get: function() {
      return SubscriptionItems_js_1.SubscriptionItems;
    } });
    var SubscriptionSchedules_js_1 = require_SubscriptionSchedules();
    Object.defineProperty(exports2, "SubscriptionSchedules", { enumerable: true, get: function() {
      return SubscriptionSchedules_js_1.SubscriptionSchedules;
    } });
    var Subscriptions_js_1 = require_Subscriptions();
    Object.defineProperty(exports2, "Subscriptions", { enumerable: true, get: function() {
      return Subscriptions_js_1.Subscriptions;
    } });
    var TaxCodes_js_1 = require_TaxCodes();
    Object.defineProperty(exports2, "TaxCodes", { enumerable: true, get: function() {
      return TaxCodes_js_1.TaxCodes;
    } });
    var TaxIds_js_1 = require_TaxIds();
    Object.defineProperty(exports2, "TaxIds", { enumerable: true, get: function() {
      return TaxIds_js_1.TaxIds;
    } });
    var TaxRates_js_1 = require_TaxRates();
    Object.defineProperty(exports2, "TaxRates", { enumerable: true, get: function() {
      return TaxRates_js_1.TaxRates;
    } });
    var Tokens_js_2 = require_Tokens2();
    Object.defineProperty(exports2, "Tokens", { enumerable: true, get: function() {
      return Tokens_js_2.Tokens;
    } });
    var Topups_js_1 = require_Topups();
    Object.defineProperty(exports2, "Topups", { enumerable: true, get: function() {
      return Topups_js_1.Topups;
    } });
    var Transfers_js_1 = require_Transfers();
    Object.defineProperty(exports2, "Transfers", { enumerable: true, get: function() {
      return Transfers_js_1.Transfers;
    } });
    var WebhookEndpoints_js_1 = require_WebhookEndpoints();
    Object.defineProperty(exports2, "WebhookEndpoints", { enumerable: true, get: function() {
      return WebhookEndpoints_js_1.WebhookEndpoints;
    } });
    exports2.Apps = (0, ResourceNamespace_js_1.resourceNamespace)("apps", { Secrets: Secrets_js_1.Secrets });
    exports2.Billing = (0, ResourceNamespace_js_1.resourceNamespace)("billing", {
      Alerts: Alerts_js_1.Alerts,
      CreditBalanceSummary: CreditBalanceSummary_js_1.CreditBalanceSummary,
      CreditBalanceTransactions: CreditBalanceTransactions_js_1.CreditBalanceTransactions,
      CreditGrants: CreditGrants_js_1.CreditGrants,
      MeterEventAdjustments: MeterEventAdjustments_js_1.MeterEventAdjustments,
      MeterEvents: MeterEvents_js_1.MeterEvents,
      Meters: Meters_js_1.Meters
    });
    exports2.BillingPortal = (0, ResourceNamespace_js_1.resourceNamespace)("billingPortal", {
      Configurations: Configurations_js_1.Configurations,
      Sessions: Sessions_js_1.Sessions
    });
    exports2.Checkout = (0, ResourceNamespace_js_1.resourceNamespace)("checkout", {
      Sessions: Sessions_js_2.Sessions
    });
    exports2.Climate = (0, ResourceNamespace_js_1.resourceNamespace)("climate", {
      Orders: Orders_js_1.Orders,
      Products: Products_js_1.Products,
      Suppliers: Suppliers_js_1.Suppliers
    });
    exports2.Entitlements = (0, ResourceNamespace_js_1.resourceNamespace)("entitlements", {
      ActiveEntitlements: ActiveEntitlements_js_1.ActiveEntitlements,
      Features: Features_js_1.Features
    });
    exports2.FinancialConnections = (0, ResourceNamespace_js_1.resourceNamespace)("financialConnections", {
      Accounts: Accounts_js_1.Accounts,
      Sessions: Sessions_js_3.Sessions,
      Transactions: Transactions_js_1.Transactions
    });
    exports2.Forwarding = (0, ResourceNamespace_js_1.resourceNamespace)("forwarding", {
      Requests: Requests_js_1.Requests
    });
    exports2.Identity = (0, ResourceNamespace_js_1.resourceNamespace)("identity", {
      VerificationReports: VerificationReports_js_1.VerificationReports,
      VerificationSessions: VerificationSessions_js_1.VerificationSessions
    });
    exports2.Issuing = (0, ResourceNamespace_js_1.resourceNamespace)("issuing", {
      Authorizations: Authorizations_js_1.Authorizations,
      Cardholders: Cardholders_js_1.Cardholders,
      Cards: Cards_js_1.Cards,
      Disputes: Disputes_js_1.Disputes,
      PersonalizationDesigns: PersonalizationDesigns_js_1.PersonalizationDesigns,
      PhysicalBundles: PhysicalBundles_js_1.PhysicalBundles,
      Tokens: Tokens_js_1.Tokens,
      Transactions: Transactions_js_2.Transactions
    });
    exports2.Radar = (0, ResourceNamespace_js_1.resourceNamespace)("radar", {
      EarlyFraudWarnings: EarlyFraudWarnings_js_1.EarlyFraudWarnings,
      PaymentEvaluations: PaymentEvaluations_js_1.PaymentEvaluations,
      ValueListItems: ValueListItems_js_1.ValueListItems,
      ValueLists: ValueLists_js_1.ValueLists
    });
    exports2.Reporting = (0, ResourceNamespace_js_1.resourceNamespace)("reporting", {
      ReportRuns: ReportRuns_js_1.ReportRuns,
      ReportTypes: ReportTypes_js_1.ReportTypes
    });
    exports2.Sigma = (0, ResourceNamespace_js_1.resourceNamespace)("sigma", {
      ScheduledQueryRuns: ScheduledQueryRuns_js_1.ScheduledQueryRuns
    });
    exports2.Tax = (0, ResourceNamespace_js_1.resourceNamespace)("tax", {
      Associations: Associations_js_1.Associations,
      Calculations: Calculations_js_1.Calculations,
      Registrations: Registrations_js_1.Registrations,
      Settings: Settings_js_1.Settings,
      Transactions: Transactions_js_3.Transactions
    });
    exports2.Terminal = (0, ResourceNamespace_js_1.resourceNamespace)("terminal", {
      Configurations: Configurations_js_2.Configurations,
      ConnectionTokens: ConnectionTokens_js_1.ConnectionTokens,
      Locations: Locations_js_1.Locations,
      OnboardingLinks: OnboardingLinks_js_1.OnboardingLinks,
      Readers: Readers_js_1.Readers
    });
    exports2.TestHelpers = (0, ResourceNamespace_js_1.resourceNamespace)("testHelpers", {
      ConfirmationTokens: ConfirmationTokens_js_1.ConfirmationTokens,
      Customers: Customers_js_1.Customers,
      Refunds: Refunds_js_1.Refunds,
      TestClocks: TestClocks_js_1.TestClocks,
      Issuing: (0, ResourceNamespace_js_1.resourceNamespace)("issuing", {
        Authorizations: Authorizations_js_2.Authorizations,
        Cards: Cards_js_2.Cards,
        PersonalizationDesigns: PersonalizationDesigns_js_2.PersonalizationDesigns,
        Transactions: Transactions_js_4.Transactions
      }),
      Terminal: (0, ResourceNamespace_js_1.resourceNamespace)("terminal", {
        Readers: Readers_js_2.Readers
      }),
      Treasury: (0, ResourceNamespace_js_1.resourceNamespace)("treasury", {
        InboundTransfers: InboundTransfers_js_1.InboundTransfers,
        OutboundPayments: OutboundPayments_js_1.OutboundPayments,
        OutboundTransfers: OutboundTransfers_js_1.OutboundTransfers,
        ReceivedCredits: ReceivedCredits_js_1.ReceivedCredits,
        ReceivedDebits: ReceivedDebits_js_1.ReceivedDebits
      })
    });
    exports2.Treasury = (0, ResourceNamespace_js_1.resourceNamespace)("treasury", {
      CreditReversals: CreditReversals_js_1.CreditReversals,
      DebitReversals: DebitReversals_js_1.DebitReversals,
      FinancialAccounts: FinancialAccounts_js_1.FinancialAccounts,
      InboundTransfers: InboundTransfers_js_2.InboundTransfers,
      OutboundPayments: OutboundPayments_js_2.OutboundPayments,
      OutboundTransfers: OutboundTransfers_js_2.OutboundTransfers,
      ReceivedCredits: ReceivedCredits_js_2.ReceivedCredits,
      ReceivedDebits: ReceivedDebits_js_2.ReceivedDebits,
      TransactionEntries: TransactionEntries_js_1.TransactionEntries,
      Transactions: Transactions_js_5.Transactions
    });
    exports2.V2 = (0, ResourceNamespace_js_1.resourceNamespace)("v2", {
      Billing: (0, ResourceNamespace_js_1.resourceNamespace)("billing", {
        MeterEventAdjustments: MeterEventAdjustments_js_2.MeterEventAdjustments,
        MeterEventSession: MeterEventSession_js_1.MeterEventSession,
        MeterEventStream: MeterEventStream_js_1.MeterEventStream,
        MeterEvents: MeterEvents_js_2.MeterEvents
      }),
      Core: (0, ResourceNamespace_js_1.resourceNamespace)("core", {
        AccountLinks: AccountLinks_js_1.AccountLinks,
        AccountTokens: AccountTokens_js_1.AccountTokens,
        Accounts: Accounts_js_2.Accounts,
        EventDestinations: EventDestinations_js_1.EventDestinations,
        Events: Events_js_1.Events
      })
    });
  }
});

// netlify/functions/node_modules/stripe/cjs/stripe.core.js
var require_stripe_core = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/stripe.core.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createStripe = void 0;
    var _Error = require_Error();
    var RequestSender_js_1 = require_RequestSender();
    var StripeResource_js_1 = require_StripeResource();
    var StripeContext_js_1 = require_StripeContext();
    var Webhooks_js_1 = require_Webhooks();
    var apiVersion_js_1 = require_apiVersion();
    var CryptoProvider_js_1 = require_CryptoProvider();
    var HttpClient_js_1 = require_HttpClient();
    var resources = require_resources();
    var utils_js_1 = require_utils();
    var DEFAULT_HOST = "api.stripe.com";
    var DEFAULT_PORT = "443";
    var DEFAULT_BASE_PATH = "/v1/";
    var DEFAULT_API_VERSION = apiVersion_js_1.ApiVersion;
    var DEFAULT_TIMEOUT = 8e4;
    var MAX_NETWORK_RETRY_DELAY_SEC = 5;
    var INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;
    var APP_INFO_PROPERTIES = ["name", "version", "url", "partner_id"];
    var ALLOWED_CONFIG_PROPERTIES = [
      "authenticator",
      "apiVersion",
      "typescript",
      "maxNetworkRetries",
      "httpAgent",
      "httpClient",
      "timeout",
      "host",
      "port",
      "protocol",
      "telemetry",
      "appInfo",
      "stripeAccount",
      "stripeContext"
    ];
    var defaultRequestSenderFactory = (stripe2) => new RequestSender_js_1.RequestSender(stripe2, StripeResource_js_1.StripeResource.MAX_BUFFERED_REQUEST_METRICS);
    function createStripe(platformFunctions, requestSender = defaultRequestSenderFactory) {
      Stripe.PACKAGE_VERSION = "20.3.1";
      Stripe.API_VERSION = apiVersion_js_1.ApiVersion;
      Stripe.USER_AGENT = Object.assign({ bindings_version: Stripe.PACKAGE_VERSION, lang: "node", publisher: "stripe", uname: null, typescript: false }, (0, utils_js_1.determineProcessUserAgentProperties)());
      Stripe.StripeResource = StripeResource_js_1.StripeResource;
      Stripe.StripeContext = StripeContext_js_1.StripeContext;
      Stripe.resources = resources;
      Stripe.HttpClient = HttpClient_js_1.HttpClient;
      Stripe.HttpClientResponse = HttpClient_js_1.HttpClientResponse;
      Stripe.CryptoProvider = CryptoProvider_js_1.CryptoProvider;
      Stripe.webhooks = (0, Webhooks_js_1.createWebhooks)(platformFunctions);
      function Stripe(key, config = {}) {
        if (!(this instanceof Stripe)) {
          return new Stripe(key, config);
        }
        const props = this._getPropsFromConfig(config);
        this._platformFunctions = platformFunctions;
        Object.defineProperty(this, "_emitter", {
          value: this._platformFunctions.createEmitter(),
          enumerable: false,
          configurable: false,
          writable: false
        });
        this.VERSION = Stripe.PACKAGE_VERSION;
        this.on = this._emitter.on.bind(this._emitter);
        this.once = this._emitter.once.bind(this._emitter);
        this.off = this._emitter.removeListener.bind(this._emitter);
        const agent = props.httpAgent || null;
        this._api = {
          host: props.host || DEFAULT_HOST,
          port: props.port || DEFAULT_PORT,
          protocol: props.protocol || "https",
          basePath: DEFAULT_BASE_PATH,
          version: props.apiVersion || DEFAULT_API_VERSION,
          timeout: (0, utils_js_1.validateInteger)("timeout", props.timeout, DEFAULT_TIMEOUT),
          maxNetworkRetries: (0, utils_js_1.validateInteger)("maxNetworkRetries", props.maxNetworkRetries, 2),
          agent,
          httpClient: props.httpClient || (agent ? this._platformFunctions.createNodeHttpClient(agent) : this._platformFunctions.createDefaultHttpClient()),
          dev: false,
          stripeAccount: props.stripeAccount || null,
          stripeContext: props.stripeContext || null
        };
        const typescript = props.typescript || false;
        if (typescript !== Stripe.USER_AGENT.typescript) {
          Stripe.USER_AGENT.typescript = typescript;
        }
        if (props.appInfo) {
          this._setAppInfo(props.appInfo);
        }
        this._prepResources();
        this._setAuthenticator(key, props.authenticator);
        this.errors = _Error;
        this.webhooks = Stripe.webhooks;
        this._prevRequestMetrics = [];
        this._enableTelemetry = props.telemetry !== false;
        this._requestSender = requestSender(this);
        this.StripeResource = Stripe.StripeResource;
      }
      Stripe.errors = _Error;
      Stripe.createNodeHttpClient = platformFunctions.createNodeHttpClient;
      Stripe.createFetchHttpClient = platformFunctions.createFetchHttpClient;
      Stripe.createNodeCryptoProvider = platformFunctions.createNodeCryptoProvider;
      Stripe.createSubtleCryptoProvider = platformFunctions.createSubtleCryptoProvider;
      Stripe.prototype = {
        // Properties are set in the constructor above
        _appInfo: void 0,
        on: null,
        off: null,
        once: null,
        VERSION: null,
        StripeResource: null,
        webhooks: null,
        errors: null,
        _api: null,
        _prevRequestMetrics: null,
        _emitter: null,
        _enableTelemetry: null,
        _requestSender: null,
        _platformFunctions: null,
        rawRequest(method, path, params, options) {
          return this._requestSender._rawRequest(method, path, params, options);
        },
        /**
         * @private
         */
        _setAuthenticator(key, authenticator) {
          if (key && authenticator) {
            throw new Error("Can't specify both apiKey and authenticator");
          }
          if (!key && !authenticator) {
            throw new Error("Neither apiKey nor config.authenticator provided");
          }
          this._authenticator = key ? (0, utils_js_1.createApiKeyAuthenticator)(key) : authenticator;
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setAppInfo(info) {
          if (info && typeof info !== "object") {
            throw new Error("AppInfo must be an object.");
          }
          if (info && !info.name) {
            throw new Error("AppInfo.name is required");
          }
          info = info || {};
          this._appInfo = APP_INFO_PROPERTIES.reduce((accum, prop) => {
            if (typeof info[prop] == "string") {
              accum = accum || {};
              accum[prop] = info[prop];
            }
            return accum;
          }, {});
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setApiField(key, value) {
          this._api[key] = value;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getApiField(key) {
          return this._api[key];
        },
        setClientId(clientId) {
          this._clientId = clientId;
        },
        getClientId() {
          return this._clientId;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getConstant: (c) => {
          switch (c) {
            case "DEFAULT_HOST":
              return DEFAULT_HOST;
            case "DEFAULT_PORT":
              return DEFAULT_PORT;
            case "DEFAULT_BASE_PATH":
              return DEFAULT_BASE_PATH;
            case "DEFAULT_API_VERSION":
              return DEFAULT_API_VERSION;
            case "DEFAULT_TIMEOUT":
              return DEFAULT_TIMEOUT;
            case "MAX_NETWORK_RETRY_DELAY_SEC":
              return MAX_NETWORK_RETRY_DELAY_SEC;
            case "INITIAL_NETWORK_RETRY_DELAY_SEC":
              return INITIAL_NETWORK_RETRY_DELAY_SEC;
          }
          return Stripe[c];
        },
        getMaxNetworkRetries() {
          return this.getApiField("maxNetworkRetries");
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setApiNumberField(prop, n, defaultVal) {
          const val = (0, utils_js_1.validateInteger)(prop, n, defaultVal);
          this._setApiField(prop, val);
        },
        getMaxNetworkRetryDelay() {
          return MAX_NETWORK_RETRY_DELAY_SEC;
        },
        getInitialNetworkRetryDelay() {
          return INITIAL_NETWORK_RETRY_DELAY_SEC;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         *
         * Gets a JSON version of a User-Agent and uses a cached version for a slight
         * speed advantage.
         */
        getClientUserAgent(cb) {
          return this.getClientUserAgentSeeded(Stripe.USER_AGENT, cb);
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         *
         * Gets a JSON version of a User-Agent by encoding a seeded object and
         * fetching a uname from the system.
         */
        getClientUserAgentSeeded(seed, cb) {
          this._platformFunctions.getUname().then((uname) => {
            var _a;
            const userAgent = {};
            for (const field in seed) {
              if (!Object.prototype.hasOwnProperty.call(seed, field)) {
                continue;
              }
              userAgent[field] = encodeURIComponent((_a = seed[field]) !== null && _a !== void 0 ? _a : "null");
            }
            userAgent.uname = encodeURIComponent(uname || "UNKNOWN");
            const client = this.getApiField("httpClient");
            if (client) {
              userAgent.httplib = encodeURIComponent(client.getClientName());
            }
            if (this._appInfo) {
              userAgent.application = this._appInfo;
            }
            cb(JSON.stringify(userAgent));
          });
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getAppInfoAsString() {
          if (!this._appInfo) {
            return "";
          }
          let formatted = this._appInfo.name;
          if (this._appInfo.version) {
            formatted += `/${this._appInfo.version}`;
          }
          if (this._appInfo.url) {
            formatted += ` (${this._appInfo.url})`;
          }
          return formatted;
        },
        getTelemetryEnabled() {
          return this._enableTelemetry;
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _prepResources() {
          for (const name in resources) {
            if (!Object.prototype.hasOwnProperty.call(resources, name)) {
              continue;
            }
            this[(0, utils_js_1.pascalToCamelCase)(name)] = new resources[name](this);
          }
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _getPropsFromConfig(config) {
          if (!config) {
            return {};
          }
          const isString = typeof config === "string";
          const isObject = config === Object(config) && !Array.isArray(config);
          if (!isObject && !isString) {
            throw new Error("Config must either be an object or a string");
          }
          if (isString) {
            return {
              apiVersion: config
            };
          }
          const values = Object.keys(config).filter((value) => !ALLOWED_CONFIG_PROPERTIES.includes(value));
          if (values.length > 0) {
            throw new Error(`Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(", ")}`);
          }
          return config;
        },
        parseEventNotification(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
          const eventNotification = this.webhooks.constructEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt);
          if (eventNotification.context) {
            eventNotification.context = StripeContext_js_1.StripeContext.parse(eventNotification.context);
          }
          eventNotification.fetchEvent = () => {
            return this._requestSender._rawRequest("GET", `/v2/core/events/${eventNotification.id}`, void 0, {
              stripeContext: eventNotification.context
            }, ["fetch_event"]);
          };
          eventNotification.fetchRelatedObject = () => {
            if (!eventNotification.related_object) {
              return Promise.resolve(null);
            }
            return this._requestSender._rawRequest("GET", eventNotification.related_object.url, void 0, {
              stripeContext: eventNotification.context
            }, ["fetch_related_object"]);
          };
          return eventNotification;
        }
      };
      return Stripe;
    }
    exports2.createStripe = createStripe;
  }
});

// netlify/functions/node_modules/stripe/cjs/stripe.cjs.node.js
var require_stripe_cjs_node = __commonJS({
  "netlify/functions/node_modules/stripe/cjs/stripe.cjs.node.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var NodePlatformFunctions_js_1 = require_NodePlatformFunctions();
    var stripe_core_js_1 = require_stripe_core();
    var Stripe = (0, stripe_core_js_1.createStripe)(new NodePlatformFunctions_js_1.NodePlatformFunctions());
    module2.exports = Stripe;
    module2.exports.Stripe = Stripe;
    module2.exports.default = Stripe;
  }
});

// node_modules/data-uri-to-buffer/dist/index.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else if (meta[i2]) {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var dist_default;
var init_dist = __esm({
  "node_modules/data-uri-to-buffer/dist/index.js"() {
    dist_default = dataUriToBuffer;
  }
});

// node_modules/web-streams-polyfill/dist/ponyfill.es2018.js
var require_ponyfill_es2018 = __commonJS({
  "node_modules/web-streams-polyfill/dist/ponyfill.es2018.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.WebStreamsPolyfill = {}));
    })(exports2, (function(exports3) {
      "use strict";
      function noop2() {
        return void 0;
      }
      function typeIsObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      const rethrowAssertionErrorRejection = noop2;
      function setFunctionName(fn, name) {
        try {
          Object.defineProperty(fn, "name", {
            value: name,
            configurable: true
          });
        } catch (_a2) {
        }
      }
      const originalPromise = Promise;
      const originalPromiseThen = Promise.prototype.then;
      const originalPromiseReject = Promise.reject.bind(originalPromise);
      function newPromise(executor) {
        return new originalPromise(executor);
      }
      function promiseResolvedWith(value) {
        return newPromise((resolve) => resolve(value));
      }
      function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
      }
      function PerformPromiseThen(promise, onFulfilled, onRejected) {
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
      }
      function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
      }
      function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
      }
      function uponRejection(promise, onRejected) {
        uponPromise(promise, void 0, onRejected);
      }
      function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
      }
      function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
      }
      let _queueMicrotask = (callback) => {
        if (typeof queueMicrotask === "function") {
          _queueMicrotask = queueMicrotask;
        } else {
          const resolvedPromise = promiseResolvedWith(void 0);
          _queueMicrotask = (cb) => PerformPromiseThen(resolvedPromise, cb);
        }
        return _queueMicrotask(callback);
      };
      function reflectCall(F2, V, args) {
        if (typeof F2 !== "function") {
          throw new TypeError("Argument is not a function");
        }
        return Function.prototype.apply.call(F2, V, args);
      }
      function promiseCall(F2, V, args) {
        try {
          return promiseResolvedWith(reflectCall(F2, V, args));
        } catch (value) {
          return promiseRejectedWith(value);
        }
      }
      const QUEUE_MAX_ARRAY_SIZE = 16384;
      class SimpleQueue {
        constructor() {
          this._cursor = 0;
          this._size = 0;
          this._front = {
            _elements: [],
            _next: void 0
          };
          this._back = this._front;
          this._cursor = 0;
          this._size = 0;
        }
        get length() {
          return this._size;
        }
        // For exception safety, this method is structured in order:
        // 1. Read state
        // 2. Calculate required state mutations
        // 3. Perform state mutations
        push(element) {
          const oldBack = this._back;
          let newBack = oldBack;
          if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
            newBack = {
              _elements: [],
              _next: void 0
            };
          }
          oldBack._elements.push(element);
          if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
          }
          ++this._size;
        }
        // Like push(), shift() follows the read -> calculate -> mutate pattern for
        // exception safety.
        shift() {
          const oldFront = this._front;
          let newFront = oldFront;
          const oldCursor = this._cursor;
          let newCursor = oldCursor + 1;
          const elements = oldFront._elements;
          const element = elements[oldCursor];
          if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
            newFront = oldFront._next;
            newCursor = 0;
          }
          --this._size;
          this._cursor = newCursor;
          if (oldFront !== newFront) {
            this._front = newFront;
          }
          elements[oldCursor] = void 0;
          return element;
        }
        // The tricky thing about forEach() is that it can be called
        // re-entrantly. The queue may be mutated inside the callback. It is easy to
        // see that push() within the callback has no negative effects since the end
        // of the queue is checked for on every iteration. If shift() is called
        // repeatedly within the callback then the next iteration may return an
        // element that has been removed. In this case the callback will be called
        // with undefined values until we either "catch up" with elements that still
        // exist or reach the back of the queue.
        forEach(callback) {
          let i2 = this._cursor;
          let node = this._front;
          let elements = node._elements;
          while (i2 !== elements.length || node._next !== void 0) {
            if (i2 === elements.length) {
              node = node._next;
              elements = node._elements;
              i2 = 0;
              if (elements.length === 0) {
                break;
              }
            }
            callback(elements[i2]);
            ++i2;
          }
        }
        // Return the element that would be returned if shift() was called now,
        // without modifying the queue.
        peek() {
          const front = this._front;
          const cursor = this._cursor;
          return front._elements[cursor];
        }
      }
      const AbortSteps = /* @__PURE__ */ Symbol("[[AbortSteps]]");
      const ErrorSteps = /* @__PURE__ */ Symbol("[[ErrorSteps]]");
      const CancelSteps = /* @__PURE__ */ Symbol("[[CancelSteps]]");
      const PullSteps = /* @__PURE__ */ Symbol("[[PullSteps]]");
      const ReleaseSteps = /* @__PURE__ */ Symbol("[[ReleaseSteps]]");
      function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseInitialize(reader);
        } else if (stream._state === "closed") {
          defaultReaderClosedPromiseInitializeAsResolved(reader);
        } else {
          defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
      }
      function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
      }
      function ReadableStreamReaderGenericRelease(reader) {
        const stream = reader._ownerReadableStream;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        } else {
          defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        stream._readableStreamController[ReleaseSteps]();
        stream._reader = void 0;
        reader._ownerReadableStream = void 0;
      }
      function readerLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released reader");
      }
      function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve, reject) => {
          reader._closedPromise_resolve = resolve;
          reader._closedPromise_reject = reject;
        });
      }
      function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
      }
      function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
      }
      function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
      }
      function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === void 0) {
          return;
        }
        reader._closedPromise_resolve(void 0);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      const NumberIsFinite = Number.isFinite || function(x2) {
        return typeof x2 === "number" && isFinite(x2);
      };
      const MathTrunc = Math.trunc || function(v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
      function isDictionary(x2) {
        return typeof x2 === "object" || typeof x2 === "function";
      }
      function assertDictionary(obj, context) {
        if (obj !== void 0 && !isDictionary(obj)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertFunction(x2, context) {
        if (typeof x2 !== "function") {
          throw new TypeError(`${context} is not a function.`);
        }
      }
      function isObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      function assertObject(x2, context) {
        if (!isObject(x2)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertRequiredArgument(x2, position, context) {
        if (x2 === void 0) {
          throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
      }
      function assertRequiredField(x2, field, context) {
        if (x2 === void 0) {
          throw new TypeError(`${field} is required in '${context}'.`);
        }
      }
      function convertUnrestrictedDouble(value) {
        return Number(value);
      }
      function censorNegativeZero(x2) {
        return x2 === 0 ? 0 : x2;
      }
      function integerPart(x2) {
        return censorNegativeZero(MathTrunc(x2));
      }
      function convertUnsignedLongLongWithEnforceRange(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x2 = Number(value);
        x2 = censorNegativeZero(x2);
        if (!NumberIsFinite(x2)) {
          throw new TypeError(`${context} is not a finite number`);
        }
        x2 = integerPart(x2);
        if (x2 < lowerBound || x2 > upperBound) {
          throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x2) || x2 === 0) {
          return 0;
        }
        return x2;
      }
      function assertReadableStream(x2, context) {
        if (!IsReadableStream(x2)) {
          throw new TypeError(`${context} is not a ReadableStream.`);
        }
      }
      function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
      }
      function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
      }
      function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
          readRequest._closeSteps();
        } else {
          readRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
      }
      function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamDefaultReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed,
         * or rejected if the stream ever errors or the reader's lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = void 0) {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        /**
         * Returns a promise that allows access to the next chunk from the stream's internal queue, if available.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        read() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("read"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: void 0, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamDefaultReaderRead(this, readRequest);
          return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamDefaultReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
          if (!IsReadableStreamDefaultReader(this)) {
            throw defaultReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          ReadableStreamDefaultReaderRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      setFunctionName(ReadableStreamDefaultReader.prototype.cancel, "cancel");
      setFunctionName(ReadableStreamDefaultReader.prototype.read, "read");
      setFunctionName(ReadableStreamDefaultReader.prototype.releaseLock, "releaseLock");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, Symbol.toStringTag, {
          value: "ReadableStreamDefaultReader",
          configurable: true
        });
      }
      function IsReadableStreamDefaultReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultReader;
      }
      function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "closed") {
          readRequest._closeSteps();
        } else if (stream._state === "errored") {
          readRequest._errorSteps(stream._storedError);
        } else {
          stream._readableStreamController[PullSteps](readRequest);
        }
      }
      function ReadableStreamDefaultReaderRelease(reader) {
        ReadableStreamReaderGenericRelease(reader);
        const e2 = new TypeError("Reader was released");
        ReadableStreamDefaultReaderErrorReadRequests(reader, e2);
      }
      function ReadableStreamDefaultReaderErrorReadRequests(reader, e2) {
        const readRequests = reader._readRequests;
        reader._readRequests = new SimpleQueue();
        readRequests.forEach((readRequest) => {
          readRequest._errorSteps(e2);
        });
      }
      function defaultReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
      }
      const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
          this._ongoingPromise = void 0;
          this._isFinished = false;
          this._reader = reader;
          this._preventCancel = preventCancel;
        }
        next() {
          const nextSteps = () => this._nextSteps();
          this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
          return this._ongoingPromise;
        }
        return(value) {
          const returnSteps = () => this._returnSteps(value);
          return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
        }
        _nextSteps() {
          if (this._isFinished) {
            return Promise.resolve({ value: void 0, done: true });
          }
          const reader = this._reader;
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => {
              this._ongoingPromise = void 0;
              _queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              resolvePromise({ value: void 0, done: true });
            },
            _errorSteps: (reason) => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              rejectPromise(reason);
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promise;
        }
        _returnSteps(value) {
          if (this._isFinished) {
            return Promise.resolve({ value, done: true });
          }
          this._isFinished = true;
          const reader = this._reader;
          if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel(reader, value);
            ReadableStreamReaderGenericRelease(reader);
            return transformPromiseWith(result, () => ({ value, done: true }));
          }
          ReadableStreamReaderGenericRelease(reader);
          return promiseResolvedWith({ value, done: true });
        }
      }
      const ReadableStreamAsyncIteratorPrototype = {
        next() {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
          }
          return this._asyncIteratorImpl.next();
        },
        return(value) {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
          }
          return this._asyncIteratorImpl.return(value);
        }
      };
      Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
      function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
      }
      function IsReadableStreamAsyncIterator(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
          return false;
        }
        try {
          return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
        } catch (_a2) {
          return false;
        }
      }
      function streamAsyncIteratorBrandCheckException(name) {
        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
      }
      const NumberIsNaN = Number.isNaN || function(x2) {
        return x2 !== x2;
      };
      var _a, _b, _c;
      function CreateArrayFromList(elements) {
        return elements.slice();
      }
      function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
      }
      let TransferArrayBuffer = (O) => {
        if (typeof O.transfer === "function") {
          TransferArrayBuffer = (buffer) => buffer.transfer();
        } else if (typeof structuredClone === "function") {
          TransferArrayBuffer = (buffer) => structuredClone(buffer, { transfer: [buffer] });
        } else {
          TransferArrayBuffer = (buffer) => buffer;
        }
        return TransferArrayBuffer(O);
      };
      let IsDetachedBuffer = (O) => {
        if (typeof O.detached === "boolean") {
          IsDetachedBuffer = (buffer) => buffer.detached;
        } else {
          IsDetachedBuffer = (buffer) => buffer.byteLength === 0;
        }
        return IsDetachedBuffer(O);
      };
      function ArrayBufferSlice(buffer, begin, end) {
        if (buffer.slice) {
          return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
      }
      function GetMethod(receiver, prop) {
        const func = receiver[prop];
        if (func === void 0 || func === null) {
          return void 0;
        }
        if (typeof func !== "function") {
          throw new TypeError(`${String(prop)} is not a function`);
        }
        return func;
      }
      function CreateAsyncFromSyncIterator(syncIteratorRecord) {
        const syncIterable = {
          [Symbol.iterator]: () => syncIteratorRecord.iterator
        };
        const asyncIterator = (async function* () {
          return yield* syncIterable;
        })();
        const nextMethod = asyncIterator.next;
        return { iterator: asyncIterator, nextMethod, done: false };
      }
      const SymbolAsyncIterator = (_c = (_a = Symbol.asyncIterator) !== null && _a !== void 0 ? _a : (_b = Symbol.for) === null || _b === void 0 ? void 0 : _b.call(Symbol, "Symbol.asyncIterator")) !== null && _c !== void 0 ? _c : "@@asyncIterator";
      function GetIterator(obj, hint = "sync", method) {
        if (method === void 0) {
          if (hint === "async") {
            method = GetMethod(obj, SymbolAsyncIterator);
            if (method === void 0) {
              const syncMethod = GetMethod(obj, Symbol.iterator);
              const syncIteratorRecord = GetIterator(obj, "sync", syncMethod);
              return CreateAsyncFromSyncIterator(syncIteratorRecord);
            }
          } else {
            method = GetMethod(obj, Symbol.iterator);
          }
        }
        if (method === void 0) {
          throw new TypeError("The object is not iterable");
        }
        const iterator = reflectCall(method, obj, []);
        if (!typeIsObject(iterator)) {
          throw new TypeError("The iterator method must return an object");
        }
        const nextMethod = iterator.next;
        return { iterator, nextMethod, done: false };
      }
      function IteratorNext(iteratorRecord) {
        const result = reflectCall(iteratorRecord.nextMethod, iteratorRecord.iterator, []);
        if (!typeIsObject(result)) {
          throw new TypeError("The iterator.next() method must return an object");
        }
        return result;
      }
      function IteratorComplete(iterResult) {
        return Boolean(iterResult.done);
      }
      function IteratorValue(iterResult) {
        return iterResult.value;
      }
      function IsNonNegativeNumber(v) {
        if (typeof v !== "number") {
          return false;
        }
        if (NumberIsNaN(v)) {
          return false;
        }
        if (v < 0) {
          return false;
        }
        return true;
      }
      function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
      }
      function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
          container._queueTotalSize = 0;
        }
        return pair.value;
      }
      function EnqueueValueWithSize(container, value, size) {
        if (!IsNonNegativeNumber(size) || size === Infinity) {
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        }
        container._queue.push({ value, size });
        container._queueTotalSize += size;
      }
      function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
      }
      function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
      }
      function isDataViewConstructor(ctor) {
        return ctor === DataView;
      }
      function isDataView(view) {
        return isDataViewConstructor(view.constructor);
      }
      function arrayBufferViewElementSize(ctor) {
        if (isDataViewConstructor(ctor)) {
          return 1;
        }
        return ctor.BYTES_PER_ELEMENT;
      }
      class ReadableStreamBYOBRequest {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the view for writing in to, or `null` if the BYOB request has already been responded to.
         */
        get view() {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("view");
          }
          return this._view;
        }
        respond(bytesWritten) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respond");
          }
          assertRequiredArgument(bytesWritten, 1, "respond");
          bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(this._view.buffer)) {
            throw new TypeError(`The BYOB request's buffer has been detached and so cannot be used as a response`);
          }
          ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respondWithNewView");
          }
          assertRequiredArgument(view, 1, "respondWithNewView");
          if (!ArrayBuffer.isView(view)) {
            throw new TypeError("You can only respond with array buffer views");
          }
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(view.buffer)) {
            throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");
          }
          ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
      }
      Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
      });
      setFunctionName(ReadableStreamBYOBRequest.prototype.respond, "respond");
      setFunctionName(ReadableStreamBYOBRequest.prototype.respondWithNewView, "respondWithNewView");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, Symbol.toStringTag, {
          value: "ReadableStreamBYOBRequest",
          configurable: true
        });
      }
      class ReadableByteStreamController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the current BYOB pull request, or `null` if there isn't one.
         */
        get byobRequest() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("byobRequest");
          }
          return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying byte source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("desiredSize");
          }
          return ReadableByteStreamControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("close");
          }
          if (this._closeRequested) {
            throw new TypeError("The stream has already been closed; do not close it again!");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
          }
          ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("enqueue");
          }
          assertRequiredArgument(chunk, 1, "enqueue");
          if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError("chunk must be an array buffer view");
          }
          if (chunk.byteLength === 0) {
            throw new TypeError("chunk must have non-zero byteLength");
          }
          if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
          }
          if (this._closeRequested) {
            throw new TypeError("stream is closed or draining");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
          }
          ReadableByteStreamControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e2 = void 0) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("error");
          }
          ReadableByteStreamControllerError(this, e2);
        }
        /** @internal */
        [CancelSteps](reason) {
          ReadableByteStreamControllerClearPendingPullIntos(this);
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableByteStreamControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
          const stream = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            ReadableByteStreamControllerFillReadRequestFromQueue(this, readRequest);
            return;
          }
          const autoAllocateChunkSize = this._autoAllocateChunkSize;
          if (autoAllocateChunkSize !== void 0) {
            let buffer;
            try {
              buffer = new ArrayBuffer(autoAllocateChunkSize);
            } catch (bufferE) {
              readRequest._errorSteps(bufferE);
              return;
            }
            const pullIntoDescriptor = {
              buffer,
              bufferByteLength: autoAllocateChunkSize,
              byteOffset: 0,
              byteLength: autoAllocateChunkSize,
              bytesFilled: 0,
              minimumFill: 1,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
          }
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableByteStreamControllerCallPullIfNeeded(this);
        }
        /** @internal */
        [ReleaseSteps]() {
          if (this._pendingPullIntos.length > 0) {
            const firstPullInto = this._pendingPullIntos.peek();
            firstPullInto.readerType = "none";
            this._pendingPullIntos = new SimpleQueue();
            this._pendingPullIntos.push(firstPullInto);
          }
        }
      }
      Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(ReadableByteStreamController.prototype.close, "close");
      setFunctionName(ReadableByteStreamController.prototype.enqueue, "enqueue");
      setFunctionName(ReadableByteStreamController.prototype.error, "error");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableByteStreamController.prototype, Symbol.toStringTag, {
          value: "ReadableByteStreamController",
          configurable: true
        });
      }
      function IsReadableByteStreamController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
          return false;
        }
        return x2 instanceof ReadableByteStreamController;
      }
      function IsReadableStreamBYOBRequest(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBRequest;
      }
      function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
          return null;
        }, (e2) => {
          ReadableByteStreamControllerError(controller, e2);
          return null;
        });
      }
      function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
      }
      function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === "closed") {
          done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "default") {
          ReadableStreamFulfillReadRequest(stream, filledView, done);
        } else {
          ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
      }
      function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
      }
      function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
      }
      function ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, buffer, byteOffset, byteLength) {
        let clonedChunk;
        try {
          clonedChunk = ArrayBufferSlice(buffer, byteOffset, byteOffset + byteLength);
        } catch (cloneE) {
          ReadableByteStreamControllerError(controller, cloneE);
          throw cloneE;
        }
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, clonedChunk, 0, byteLength);
      }
      function ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, firstDescriptor) {
        if (firstDescriptor.bytesFilled > 0) {
          ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, firstDescriptor.buffer, firstDescriptor.byteOffset, firstDescriptor.bytesFilled);
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
      }
      function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready = false;
        const remainderBytes = maxBytesFilled % pullIntoDescriptor.elementSize;
        const maxAlignedBytes = maxBytesFilled - remainderBytes;
        if (maxAlignedBytes >= pullIntoDescriptor.minimumFill) {
          totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
          ready = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
          const headOfQueue = queue.peek();
          const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
          const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
          if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
          } else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
          }
          controller._queueTotalSize -= bytesToCopy;
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
          totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
      }
      function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
      }
      function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(controller._controlledReadableByteStream);
        } else {
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }
      function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
          return;
        }
        controller._byobRequest._associatedReadableByteStreamController = void 0;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
      }
      function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const pullIntoDescriptor = controller._pendingPullIntos.peek();
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerProcessReadRequestsUsingQueue(controller) {
        const reader = controller._controlledReadableByteStream._reader;
        while (reader._readRequests.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const readRequest = reader._readRequests.shift();
          ReadableByteStreamControllerFillReadRequestFromQueue(controller, readRequest);
        }
      }
      function ReadableByteStreamControllerPullInto(controller, view, min, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        const ctor = view.constructor;
        const elementSize = arrayBufferViewElementSize(ctor);
        const { byteOffset, byteLength } = view;
        const minimumFill = min * elementSize;
        let buffer;
        try {
          buffer = TransferArrayBuffer(view.buffer);
        } catch (e2) {
          readIntoRequest._errorSteps(e2);
          return;
        }
        const pullIntoDescriptor = {
          buffer,
          bufferByteLength: buffer.byteLength,
          byteOffset,
          byteLength,
          bytesFilled: 0,
          minimumFill,
          elementSize,
          viewConstructor: ctor,
          readerType: "byob"
        };
        if (controller._pendingPullIntos.length > 0) {
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          return;
        }
        if (stream._state === "closed") {
          const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
          readIntoRequest._closeSteps(emptyView);
          return;
        }
        if (controller._queueTotalSize > 0) {
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
          }
          if (controller._closeRequested) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            readIntoRequest._errorSteps(e2);
            return;
          }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        if (firstDescriptor.readerType === "none") {
          ReadableByteStreamControllerShiftPendingPullInto(controller);
        }
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
          while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "none") {
          ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          return;
        }
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.minimumFill) {
          return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
          const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, pullIntoDescriptor.buffer, end - remainderSize, remainderSize);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      }
      function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor);
        } else {
          ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
      }
      function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return false;
        }
        if (controller._closeRequested) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        if (controller._queueTotalSize > 0) {
          controller._closeRequested = true;
          return;
        }
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (firstPendingPullInto.bytesFilled % firstPendingPullInto.elementSize !== 0) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            throw e2;
          }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
      function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        const { buffer, byteOffset, byteLength } = chunk;
        if (IsDetachedBuffer(buffer)) {
          throw new TypeError("chunk's buffer is detached and so cannot be enqueued");
        }
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (IsDetachedBuffer(firstPendingPullInto.buffer)) {
            throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          if (firstPendingPullInto.readerType === "none") {
            ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, firstPendingPullInto);
          }
        }
        if (ReadableStreamHasDefaultReader(stream)) {
          ReadableByteStreamControllerProcessReadRequestsUsingQueue(controller);
          if (ReadableStreamGetNumReadRequests(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          } else {
            if (controller._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest(stream, transferredView, false);
          }
        } else if (ReadableStreamHasBYOBReader(stream)) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        } else {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerError(controller, e2) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableByteStreamControllerFillReadRequestFromQueue(controller, readRequest) {
        const entry = controller._queue.shift();
        controller._queueTotalSize -= entry.byteLength;
        ReadableByteStreamControllerHandleQueueDrain(controller);
        const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
        readRequest._chunkSteps(view);
      }
      function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
          const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
          SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
          controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
      }
      function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableByteStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (bytesWritten !== 0) {
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
          }
        } else {
          if (bytesWritten === 0) {
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          }
          if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError("bytesWritten out of range");
          }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
      }
      function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (view.byteLength !== 0) {
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
          }
        } else {
          if (view.byteLength === 0) {
            throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
          }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
          throw new RangeError("The region specified by view does not match byobRequest");
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
          throw new RangeError("The region specified by view is larger than byobRequest");
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
      }
      function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        controller._queue = controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
          return null;
        }, (r2) => {
          ReadableByteStreamControllerError(controller, r2);
          return null;
        });
      }
      function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm;
        let pullAlgorithm;
        let cancelAlgorithm;
        if (underlyingByteSource.start !== void 0) {
          startAlgorithm = () => underlyingByteSource.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingByteSource.pull !== void 0) {
          pullAlgorithm = () => underlyingByteSource.pull(controller);
        } else {
          pullAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingByteSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
      }
      function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
      }
      function byobRequestBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
      }
      function byteStreamControllerBrandCheckException(name) {
        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
      }
      function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
          mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
      }
      function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== "byob") {
          throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
      }
      function convertByobReadOptions(options, context) {
        var _a2;
        assertDictionary(options, context);
        const min = (_a2 = options === null || options === void 0 ? void 0 : options.min) !== null && _a2 !== void 0 ? _a2 : 1;
        return {
          min: convertUnsignedLongLongWithEnforceRange(min, `${context} has member 'min' that`)
        };
      }
      function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
      }
      function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
      }
      function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
          readIntoRequest._closeSteps(chunk);
        } else {
          readIntoRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
      }
      function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamBYOBReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          if (!IsReadableByteStreamController(stream._readableStreamController)) {
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readIntoRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the reader's lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = void 0) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read(view, rawOptions = {}) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("read"));
          }
          if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith(new TypeError("view must be an array buffer view"));
          }
          if (view.byteLength === 0) {
            return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
          }
          if (view.buffer.byteLength === 0) {
            return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
          }
          if (IsDetachedBuffer(view.buffer)) {
            return promiseRejectedWith(new TypeError("view's buffer has been detached"));
          }
          let options;
          try {
            options = convertByobReadOptions(rawOptions, "options");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          const min = options.min;
          if (min === 0) {
            return promiseRejectedWith(new TypeError("options.min must be greater than 0"));
          }
          if (!isDataView(view)) {
            if (min > view.length) {
              return promiseRejectedWith(new RangeError("options.min must be less than or equal to view's length"));
            }
          } else if (min > view.byteLength) {
            return promiseRejectedWith(new RangeError("options.min must be less than or equal to view's byteLength"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readIntoRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamBYOBReaderRead(this, view, min, readIntoRequest);
          return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamBYOBReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
          if (!IsReadableStreamBYOBReader(this)) {
            throw byobReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          ReadableStreamBYOBReaderRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      setFunctionName(ReadableStreamBYOBReader.prototype.cancel, "cancel");
      setFunctionName(ReadableStreamBYOBReader.prototype.read, "read");
      setFunctionName(ReadableStreamBYOBReader.prototype.releaseLock, "releaseLock");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, Symbol.toStringTag, {
          value: "ReadableStreamBYOBReader",
          configurable: true
        });
      }
      function IsReadableStreamBYOBReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBReader;
      }
      function ReadableStreamBYOBReaderRead(reader, view, min, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "errored") {
          readIntoRequest._errorSteps(stream._storedError);
        } else {
          ReadableByteStreamControllerPullInto(stream._readableStreamController, view, min, readIntoRequest);
        }
      }
      function ReadableStreamBYOBReaderRelease(reader) {
        ReadableStreamReaderGenericRelease(reader);
        const e2 = new TypeError("Reader was released");
        ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e2);
      }
      function ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e2) {
        const readIntoRequests = reader._readIntoRequests;
        reader._readIntoRequests = new SimpleQueue();
        readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._errorSteps(e2);
        });
      }
      function byobReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
      }
      function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === void 0) {
          return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
          throw new RangeError("Invalid highWaterMark");
        }
        return highWaterMark;
      }
      function ExtractSizeAlgorithm(strategy) {
        const { size } = strategy;
        if (!size) {
          return () => 1;
        }
        return size;
      }
      function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
          highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
          size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
        };
      }
      function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return (chunk) => convertUnrestrictedDouble(fn(chunk));
      }
      function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
          abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
          close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
          write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
          type
        };
      }
      function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
      }
      function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function assertWritableStream(x2, context) {
        if (!IsWritableStream(x2)) {
          throw new TypeError(`${context} is not a WritableStream.`);
        }
      }
      function isAbortSignal2(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        try {
          return typeof value.aborted === "boolean";
        } catch (_a2) {
          return false;
        }
      }
      const supportsAbortController = typeof AbortController === "function";
      function createAbortController() {
        if (supportsAbortController) {
          return new AbortController();
        }
        return void 0;
      }
      class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
          if (rawUnderlyingSink === void 0) {
            rawUnderlyingSink = null;
          } else {
            assertObject(rawUnderlyingSink, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
          InitializeWritableStream(this);
          const type = underlyingSink.type;
          if (type !== void 0) {
            throw new RangeError("Invalid type is specified");
          }
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        /**
         * Returns whether or not the writable stream is locked to a writer.
         */
        get locked() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("locked");
          }
          return IsWritableStreamLocked(this);
        }
        /**
         * Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be
         * immediately moved to an errored state, with any queued-up writes discarded. This will also execute any abort
         * mechanism of the underlying sink.
         *
         * The returned promise will fulfill if the stream shuts down successfully, or reject if the underlying sink signaled
         * that there was an error doing so. Additionally, it will reject with a `TypeError` (without attempting to cancel
         * the stream) if the stream is currently locked.
         */
        abort(reason = void 0) {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("abort"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
          }
          return WritableStreamAbort(this, reason);
        }
        /**
         * Closes the stream. The underlying sink will finish processing any previously-written chunks, before invoking its
         * close behavior. During this time any further attempts to write will fail (without erroring the stream).
         *
         * The method returns a promise that will fulfill if all remaining chunks are successfully written and the stream
         * successfully closes, or rejects if an error is encountered during this process. Additionally, it will reject with
         * a `TypeError` (without attempting to cancel the stream) if the stream is currently locked.
         */
        close() {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("close"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
          }
          if (WritableStreamCloseQueuedOrInFlight(this)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamClose(this);
        }
        /**
         * Creates a {@link WritableStreamDefaultWriter | writer} and locks the stream to the new writer. While the stream
         * is locked, no other writer can be acquired until this one is released.
         *
         * This functionality is especially useful for creating abstractions that desire the ability to write to a stream
         * without interruption or interleaving. By getting a writer for the stream, you can ensure nobody else can write at
         * the same time, which would cause the resulting written data to be unpredictable and probably useless.
         */
        getWriter() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("getWriter");
          }
          return AcquireWritableStreamDefaultWriter(this);
        }
      }
      Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
      });
      setFunctionName(WritableStream.prototype.abort, "abort");
      setFunctionName(WritableStream.prototype.close, "close");
      setFunctionName(WritableStream.prototype.getWriter, "getWriter");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStream.prototype, Symbol.toStringTag, {
          value: "WritableStream",
          configurable: true
        });
      }
      function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
      }
      function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function InitializeWritableStream(stream) {
        stream._state = "writable";
        stream._storedError = void 0;
        stream._writer = void 0;
        stream._writableStreamController = void 0;
        stream._writeRequests = new SimpleQueue();
        stream._inFlightWriteRequest = void 0;
        stream._closeRequest = void 0;
        stream._inFlightCloseRequest = void 0;
        stream._pendingAbortRequest = void 0;
        stream._backpressure = false;
      }
      function IsWritableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
          return false;
        }
        return x2 instanceof WritableStream;
      }
      function IsWritableStreamLocked(stream) {
        if (stream._writer === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamAbort(stream, reason) {
        var _a2;
        if (stream._state === "closed" || stream._state === "errored") {
          return promiseResolvedWith(void 0);
        }
        stream._writableStreamController._abortReason = reason;
        (_a2 = stream._writableStreamController._abortController) === null || _a2 === void 0 ? void 0 : _a2.abort(reason);
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseResolvedWith(void 0);
        }
        if (stream._pendingAbortRequest !== void 0) {
          return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state === "erroring") {
          wasAlreadyErroring = true;
          reason = void 0;
        }
        const promise = newPromise((resolve, reject) => {
          stream._pendingAbortRequest = {
            _promise: void 0,
            _resolve: resolve,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
          };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
          WritableStreamStartErroring(stream, reason);
        }
        return promise;
      }
      function WritableStreamClose(stream) {
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve, reject) => {
          const closeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== void 0 && stream._backpressure && state === "writable") {
          defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
      }
      function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve, reject) => {
          const writeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._writeRequests.push(writeRequest);
        });
        return promise;
      }
      function WritableStreamDealWithRejection(stream, error) {
        const state = stream._state;
        if (state === "writable") {
          WritableStreamStartErroring(stream, error);
          return;
        }
        WritableStreamFinishErroring(stream);
      }
      function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = "erroring";
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== void 0) {
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
          WritableStreamFinishErroring(stream);
        }
      }
      function WritableStreamFinishErroring(stream) {
        stream._state = "errored";
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach((writeRequest) => {
          writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === void 0) {
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = void 0;
        if (abortRequest._wasAlreadyErroring) {
          abortRequest._reject(storedError);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
          abortRequest._resolve();
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return null;
        }, (reason) => {
          abortRequest._reject(reason);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return null;
        });
      }
      function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(void 0);
        stream._inFlightWriteRequest = void 0;
      }
      function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = void 0;
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(void 0);
        stream._inFlightCloseRequest = void 0;
        const state = stream._state;
        if (state === "erroring") {
          stream._storedError = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = void 0;
          }
        }
        stream._state = "closed";
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseResolve(writer);
        }
      }
      function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._reject(error);
          stream._pendingAbortRequest = void 0;
        }
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = void 0;
      }
      function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
      }
      function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== void 0) {
          stream._closeRequest._reject(stream._storedError);
          stream._closeRequest = void 0;
        }
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
      }
      function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== void 0 && backpressure !== stream._backpressure) {
          if (backpressure) {
            defaultWriterReadyPromiseReset(writer);
          } else {
            defaultWriterReadyPromiseResolve(writer);
          }
        }
        stream._backpressure = backpressure;
      }
      class WritableStreamDefaultWriter {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
          assertWritableStream(stream, "First parameter");
          if (IsWritableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          }
          this._ownerWritableStream = stream;
          stream._writer = this;
          const state = stream._state;
          if (state === "writable") {
            if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
              defaultWriterReadyPromiseInitialize(this);
            } else {
              defaultWriterReadyPromiseInitializeAsResolved(this);
            }
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "erroring") {
            defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "closed") {
            defaultWriterReadyPromiseInitializeAsResolved(this);
            defaultWriterClosedPromiseInitializeAsResolved(this);
          } else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
          }
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the writer’s lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * Returns the desired size to fill the stream’s internal queue. It can be negative, if the queue is over-full.
         * A producer can use this information to determine the right amount of data to write.
         *
         * It will be `null` if the stream cannot be successfully written to (due to either being errored, or having an abort
         * queued up). It will return zero if the stream is closed. And the getter will throw an exception if invoked when
         * the writer’s lock is released.
         */
        get desiredSize() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("desiredSize");
          }
          if (this._ownerWritableStream === void 0) {
            throw defaultWriterLockException("desiredSize");
          }
          return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        /**
         * Returns a promise that will be fulfilled when the desired size to fill the stream’s internal queue transitions
         * from non-positive to positive, signaling that it is no longer applying backpressure. Once the desired size dips
         * back to zero or below, the getter will return a new promise that stays pending until the next transition.
         *
         * If the stream becomes errored or aborted, or the writer’s lock is released, the returned promise will become
         * rejected.
         */
        get ready() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
          }
          return this._readyPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.abort | stream.abort(reason)}.
         */
        abort(reason = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("abort"));
          }
          return WritableStreamDefaultWriterAbort(this, reason);
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.close | stream.close()}.
         */
        close() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("close"));
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("close"));
          }
          if (WritableStreamCloseQueuedOrInFlight(stream)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamDefaultWriterClose(this);
        }
        /**
         * Releases the writer’s lock on the corresponding stream. After the lock is released, the writer is no longer active.
         * If the associated stream is errored when the lock is released, the writer will appear errored in the same way from
         * now on; otherwise, the writer will appear closed.
         *
         * Note that the lock can still be released even if some ongoing writes have not yet finished (i.e. even if the
         * promises returned from previous calls to {@link WritableStreamDefaultWriter.write | write()} have not yet settled).
         * It’s not necessary to hold the lock on the writer for the duration of the write; the lock instead simply prevents
         * other producers from writing in an interleaved manner.
         */
        releaseLock() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("releaseLock");
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return;
          }
          WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("write"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          return WritableStreamDefaultWriterWrite(this, chunk);
        }
      }
      Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
      });
      setFunctionName(WritableStreamDefaultWriter.prototype.abort, "abort");
      setFunctionName(WritableStreamDefaultWriter.prototype.close, "close");
      setFunctionName(WritableStreamDefaultWriter.prototype.releaseLock, "releaseLock");
      setFunctionName(WritableStreamDefaultWriter.prototype.write, "write");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, Symbol.toStringTag, {
          value: "WritableStreamDefaultWriter",
          configurable: true
        });
      }
      function IsWritableStreamDefaultWriter(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultWriter;
      }
      function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
      }
      function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
      }
      function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
      }
      function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === "pending") {
          defaultWriterClosedPromiseReject(writer, error);
        } else {
          defaultWriterClosedPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === "pending") {
          defaultWriterReadyPromiseReject(writer, error);
        } else {
          defaultWriterReadyPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (state === "errored" || state === "erroring") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
      }
      function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = void 0;
        writer._ownerWritableStream = void 0;
      }
      function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        const state = stream._state;
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
        }
        if (state === "erroring") {
          return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
      }
      const closeSentinel = {};
      class WritableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * The reason which was passed to `WritableStream.abort(reason)` when the stream was aborted.
         *
         * @deprecated
         *  This property has been removed from the specification, see https://github.com/whatwg/streams/pull/1177.
         *  Use {@link WritableStreamDefaultController.signal}'s `reason` instead.
         */
        get abortReason() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("abortReason");
          }
          return this._abortReason;
        }
        /**
         * An `AbortSignal` that can be used to abort the pending write or close operation when the stream is aborted.
         */
        get signal() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("signal");
          }
          if (this._abortController === void 0) {
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          }
          return this._abortController.signal;
        }
        /**
         * Closes the controlled writable stream, making all future interactions with it fail with the given error `e`.
         *
         * This method is rarely used, since usually it suffices to return a rejected promise from one of the underlying
         * sink's methods. However, it can be useful for suddenly shutting down a stream in response to an event outside the
         * normal lifecycle of interactions with the underlying sink.
         */
        error(e2 = void 0) {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("error");
          }
          const state = this._controlledWritableStream._state;
          if (state !== "writable") {
            return;
          }
          WritableStreamDefaultControllerError(this, e2);
        }
        /** @internal */
        [AbortSteps](reason) {
          const result = this._abortAlgorithm(reason);
          WritableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [ErrorSteps]() {
          ResetQueue(this);
        }
      }
      Object.defineProperties(WritableStreamDefaultController.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "WritableStreamDefaultController",
          configurable: true
        });
      }
      function IsWritableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultController;
      }
      function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._abortReason = void 0;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
          controller._started = true;
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          return null;
        }, (r2) => {
          controller._started = true;
          WritableStreamDealWithRejection(stream, r2);
          return null;
        });
      }
      function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm;
        let writeAlgorithm;
        let closeAlgorithm;
        let abortAlgorithm;
        if (underlyingSink.start !== void 0) {
          startAlgorithm = () => underlyingSink.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingSink.write !== void 0) {
          writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
        } else {
          writeAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSink.close !== void 0) {
          closeAlgorithm = () => underlyingSink.close();
        } else {
          closeAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSink.abort !== void 0) {
          abortAlgorithm = (reason) => underlyingSink.abort(reason);
        } else {
          abortAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = void 0;
        controller._closeAlgorithm = void 0;
        controller._abortAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
          return controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
          return 1;
        }
      }
      function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
          return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
          return;
        }
        if (stream._inFlightWriteRequest !== void 0) {
          return;
        }
        const state = stream._state;
        if (state === "erroring") {
          WritableStreamFinishErroring(stream);
          return;
        }
        if (controller._queue.length === 0) {
          return;
        }
        const value = PeekQueueValue(controller);
        if (value === closeSentinel) {
          WritableStreamDefaultControllerProcessClose(controller);
        } else {
          WritableStreamDefaultControllerProcessWrite(controller, value);
        }
      }
      function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === "writable") {
          WritableStreamDefaultControllerError(controller, error);
        }
      }
      function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
          WritableStreamFinishInFlightClose(stream);
          return null;
        }, (reason) => {
          WritableStreamFinishInFlightCloseWithError(stream, reason);
          return null;
        });
      }
      function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
          WritableStreamFinishInFlightWrite(stream);
          const state = stream._state;
          DequeueValue(controller);
          if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          return null;
        }, (reason) => {
          if (stream._state === "writable") {
            WritableStreamDefaultControllerClearAlgorithms(controller);
          }
          WritableStreamFinishInFlightWriteWithError(stream, reason);
          return null;
        });
      }
      function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
      }
      function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
      }
      function streamBrandCheckException$2(name) {
        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
      }
      function defaultControllerBrandCheckException$2(name) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
      }
      function defaultWriterBrandCheckException(name) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
      }
      function defaultWriterLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released writer");
      }
      function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve, reject) => {
          writer._closedPromise_resolve = resolve;
          writer._closedPromise_reject = reject;
          writer._closedPromiseState = "pending";
        });
      }
      function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
      }
      function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
      }
      function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "rejected";
      }
      function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === void 0) {
          return;
        }
        writer._closedPromise_resolve(void 0);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "resolved";
      }
      function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve, reject) => {
          writer._readyPromise_resolve = resolve;
          writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = "pending";
      }
      function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
      }
      function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
      }
      function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "rejected";
      }
      function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
      }
      function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === void 0) {
          return;
        }
        writer._readyPromise_resolve(void 0);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "fulfilled";
      }
      function getGlobals() {
        if (typeof globalThis !== "undefined") {
          return globalThis;
        } else if (typeof self !== "undefined") {
          return self;
        } else if (typeof global !== "undefined") {
          return global;
        }
        return void 0;
      }
      const globals = getGlobals();
      function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === "function" || typeof ctor === "object")) {
          return false;
        }
        if (ctor.name !== "DOMException") {
          return false;
        }
        try {
          new ctor();
          return true;
        } catch (_a2) {
          return false;
        }
      }
      function getFromGlobal() {
        const ctor = globals === null || globals === void 0 ? void 0 : globals.DOMException;
        return isDOMExceptionConstructor(ctor) ? ctor : void 0;
      }
      function createPolyfill() {
        const ctor = function DOMException3(message, name) {
          this.message = message || "";
          this.name = name || "Error";
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        };
        setFunctionName(ctor, "DOMException");
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
        return ctor;
      }
      const DOMException2 = getFromGlobal() || createPolyfill();
      function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        let currentWrite = promiseResolvedWith(void 0);
        return newPromise((resolve, reject) => {
          let abortAlgorithm;
          if (signal !== void 0) {
            abortAlgorithm = () => {
              const error = signal.reason !== void 0 ? signal.reason : new DOMException2("Aborted", "AbortError");
              const actions = [];
              if (!preventAbort) {
                actions.push(() => {
                  if (dest._state === "writable") {
                    return WritableStreamAbort(dest, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              if (!preventCancel) {
                actions.push(() => {
                  if (source._state === "readable") {
                    return ReadableStreamCancel(source, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
            };
            if (signal.aborted) {
              abortAlgorithm();
              return;
            }
            signal.addEventListener("abort", abortAlgorithm);
          }
          function pipeLoop() {
            return newPromise((resolveLoop, rejectLoop) => {
              function next(done) {
                if (done) {
                  resolveLoop();
                } else {
                  PerformPromiseThen(pipeStep(), next, rejectLoop);
                }
              }
              next(false);
            });
          }
          function pipeStep() {
            if (shuttingDown) {
              return promiseResolvedWith(true);
            }
            return PerformPromiseThen(writer._readyPromise, () => {
              return newPromise((resolveRead, rejectRead) => {
                ReadableStreamDefaultReaderRead(reader, {
                  _chunkSteps: (chunk) => {
                    currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
                    resolveRead(false);
                  },
                  _closeSteps: () => resolveRead(true),
                  _errorSteps: rejectRead
                });
              });
            });
          }
          isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
            if (!preventAbort) {
              shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
            return null;
          });
          isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
            return null;
          });
          isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
              shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
            } else {
              shutdown();
            }
            return null;
          });
          if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
            const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
            } else {
              shutdown(true, destClosed);
            }
          }
          setPromiseIsHandledToTrue(pipeLoop());
          function waitForWritesToFinish() {
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
          }
          function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === "errored") {
              action(stream._storedError);
            } else {
              uponRejection(promise, action);
            }
          }
          function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === "closed") {
              action();
            } else {
              uponFulfillment(promise, action);
            }
          }
          function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), doTheRest);
            } else {
              doTheRest();
            }
            function doTheRest() {
              uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              return null;
            }
          }
          function shutdown(isError, error) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
            } else {
              finalize(isError, error);
            }
          }
          function finalize(isError, error) {
            WritableStreamDefaultWriterRelease(writer);
            ReadableStreamReaderGenericRelease(reader);
            if (signal !== void 0) {
              signal.removeEventListener("abort", abortAlgorithm);
            }
            if (isError) {
              reject(error);
            } else {
              resolve(void 0);
            }
            return null;
          }
        });
      }
      class ReadableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("desiredSize");
          }
          return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("close");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits close");
          }
          ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("enqueue");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits enqueue");
          }
          return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e2 = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("error");
          }
          ReadableStreamDefaultControllerError(this, e2);
        }
        /** @internal */
        [CancelSteps](reason) {
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
          const stream = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const chunk = DequeueValue(this);
            if (this._closeRequested && this._queue.length === 0) {
              ReadableStreamDefaultControllerClearAlgorithms(this);
              ReadableStreamClose(stream);
            } else {
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
            readRequest._chunkSteps(chunk);
          } else {
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
        }
        /** @internal */
        [ReleaseSteps]() {
        }
      }
      Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(ReadableStreamDefaultController.prototype.close, "close");
      setFunctionName(ReadableStreamDefaultController.prototype.enqueue, "enqueue");
      setFunctionName(ReadableStreamDefaultController.prototype.error, "error");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "ReadableStreamDefaultController",
          configurable: true
        });
      }
      function IsReadableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultController;
      }
      function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }
          return null;
        }, (e2) => {
          ReadableStreamDefaultControllerError(controller, e2);
          return null;
        });
      }
      function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
      }
      function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          ReadableStreamFulfillReadRequest(stream, chunk, false);
        } else {
          let chunkSize;
          try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            ReadableStreamDefaultControllerError(controller, chunkSizeE);
            throw chunkSizeE;
          }
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            ReadableStreamDefaultControllerError(controller, enqueueE);
            throw enqueueE;
          }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }
      function ReadableStreamDefaultControllerError(controller, e2) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== "readable") {
          return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
          return false;
        }
        return true;
      }
      function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === "readable") {
          return true;
        }
        return false;
      }
      function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          return null;
        }, (r2) => {
          ReadableStreamDefaultControllerError(controller, r2);
          return null;
        });
      }
      function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm;
        let pullAlgorithm;
        let cancelAlgorithm;
        if (underlyingSource.start !== void 0) {
          startAlgorithm = () => underlyingSource.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingSource.pull !== void 0) {
          pullAlgorithm = () => underlyingSource.pull(controller);
        } else {
          pullAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function defaultControllerBrandCheckException$1(name) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
      }
      function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
          return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
      }
      function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function pullAlgorithm() {
          if (reading) {
            readAgain = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const readRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgain = false;
                const chunk1 = chunk;
                const chunk2 = chunk;
                if (!canceled1) {
                  ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgain) {
                  pullAlgorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableStreamDefaultControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerClose(branch2._readableStreamController);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r2) => {
          ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
          ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
          return null;
        });
        return [branch1, branch2];
      }
      function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function forwardReaderError(thisReader) {
          uponRejection(thisReader._closedPromise, (r2) => {
            if (thisReader !== reader) {
              return null;
            }
            ReadableByteStreamControllerError(branch1._readableStreamController, r2);
            ReadableByteStreamControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
            return null;
          });
        }
        function pullWithDefaultReader() {
          if (IsReadableStreamBYOBReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamDefaultReader(stream);
            forwardReaderError(reader);
          }
          const readRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const chunk1 = chunk;
                let chunk2 = chunk;
                if (!canceled1 && !canceled2) {
                  try {
                    chunk2 = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                }
                if (!canceled1) {
                  ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableByteStreamControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableByteStreamControllerClose(branch2._readableStreamController);
              }
              if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
              }
              if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
          if (IsReadableStreamDefaultReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamBYOBReader(stream);
            forwardReaderError(reader);
          }
          const byobBranch = forBranch2 ? branch2 : branch1;
          const otherBranch = forBranch2 ? branch1 : branch2;
          const readIntoRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!otherCanceled) {
                  let clonedChunk;
                  try {
                    clonedChunk = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                } else if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: (chunk) => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!byobCanceled) {
                ReadableByteStreamControllerClose(byobBranch._readableStreamController);
              }
              if (!otherCanceled) {
                ReadableByteStreamControllerClose(otherBranch._readableStreamController);
              }
              if (chunk !== void 0) {
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                }
              }
              if (!byobCanceled || !otherCanceled) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamBYOBReaderRead(reader, view, 1, readIntoRequest);
        }
        function pull1Algorithm() {
          if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, false);
          }
          return promiseResolvedWith(void 0);
        }
        function pull2Algorithm() {
          if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, true);
          }
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
          return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
      }
      function isReadableStreamLike(stream) {
        return typeIsObject(stream) && typeof stream.getReader !== "undefined";
      }
      function ReadableStreamFrom(source) {
        if (isReadableStreamLike(source)) {
          return ReadableStreamFromDefaultReader(source.getReader());
        }
        return ReadableStreamFromIterable(source);
      }
      function ReadableStreamFromIterable(asyncIterable) {
        let stream;
        const iteratorRecord = GetIterator(asyncIterable, "async");
        const startAlgorithm = noop2;
        function pullAlgorithm() {
          let nextResult;
          try {
            nextResult = IteratorNext(iteratorRecord);
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          const nextPromise = promiseResolvedWith(nextResult);
          return transformPromiseWith(nextPromise, (iterResult) => {
            if (!typeIsObject(iterResult)) {
              throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");
            }
            const done = IteratorComplete(iterResult);
            if (done) {
              ReadableStreamDefaultControllerClose(stream._readableStreamController);
            } else {
              const value = IteratorValue(iterResult);
              ReadableStreamDefaultControllerEnqueue(stream._readableStreamController, value);
            }
          });
        }
        function cancelAlgorithm(reason) {
          const iterator = iteratorRecord.iterator;
          let returnMethod;
          try {
            returnMethod = GetMethod(iterator, "return");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          if (returnMethod === void 0) {
            return promiseResolvedWith(void 0);
          }
          let returnResult;
          try {
            returnResult = reflectCall(returnMethod, iterator, [reason]);
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          const returnPromise = promiseResolvedWith(returnResult);
          return transformPromiseWith(returnPromise, (iterResult) => {
            if (!typeIsObject(iterResult)) {
              throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object");
            }
            return void 0;
          });
        }
        stream = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, 0);
        return stream;
      }
      function ReadableStreamFromDefaultReader(reader) {
        let stream;
        const startAlgorithm = noop2;
        function pullAlgorithm() {
          let readPromise;
          try {
            readPromise = reader.read();
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          return transformPromiseWith(readPromise, (readResult) => {
            if (!typeIsObject(readResult)) {
              throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");
            }
            if (readResult.done) {
              ReadableStreamDefaultControllerClose(stream._readableStreamController);
            } else {
              const value = readResult.value;
              ReadableStreamDefaultControllerEnqueue(stream._readableStreamController, value);
            }
          });
        }
        function cancelAlgorithm(reason) {
          try {
            return promiseResolvedWith(reader.cancel(reason));
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
        }
        stream = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, 0);
        return stream;
      }
      function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
          autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
          cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
          type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
      }
      function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== "bytes") {
          throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
      }
      function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
      }
      function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== void 0) {
          assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
          preventAbort: Boolean(preventAbort),
          preventCancel: Boolean(preventCancel),
          preventClose: Boolean(preventClose),
          signal
        };
      }
      function assertAbortSignal(signal, context) {
        if (!isAbortSignal2(signal)) {
          throw new TypeError(`${context} is not an AbortSignal.`);
        }
      }
      function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, "readable", "ReadableWritablePair");
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, "writable", "ReadableWritablePair");
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
      }
      class ReadableStream2 {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
          if (rawUnderlyingSource === void 0) {
            rawUnderlyingSource = null;
          } else {
            assertObject(rawUnderlyingSource, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
          InitializeReadableStream(this);
          if (underlyingSource.type === "bytes") {
            if (strategy.size !== void 0) {
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            }
            const highWaterMark = ExtractHighWaterMark(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
          } else {
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
          }
        }
        /**
         * Whether or not the readable stream is locked to a {@link ReadableStreamDefaultReader | reader}.
         */
        get locked() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("locked");
          }
          return IsReadableStreamLocked(this);
        }
        /**
         * Cancels the stream, signaling a loss of interest in the stream by a consumer.
         *
         * The supplied `reason` argument will be given to the underlying source's {@link UnderlyingSource.cancel | cancel()}
         * method, which might or might not use it.
         */
        cancel(reason = void 0) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("cancel"));
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
          }
          return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("getReader");
          }
          const options = convertReaderOptions(rawOptions, "First parameter");
          if (options.mode === void 0) {
            return AcquireReadableStreamDefaultReader(this);
          }
          return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("pipeThrough");
          }
          assertRequiredArgument(rawTransform, 1, "pipeThrough");
          const transform = convertReadableWritablePair(rawTransform, "First parameter");
          const options = convertPipeOptions(rawOptions, "Second parameter");
          if (IsReadableStreamLocked(this)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          }
          if (IsWritableStreamLocked(transform.writable)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          }
          const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          setPromiseIsHandledToTrue(promise);
          return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
          }
          if (destination === void 0) {
            return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
          }
          if (!IsWritableStream(destination)) {
            return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
          }
          let options;
          try {
            options = convertPipeOptions(rawOptions, "Second parameter");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
          }
          if (IsWritableStreamLocked(destination)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
          }
          return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        /**
         * Tees this readable stream, returning a two-element array containing the two resulting branches as
         * new {@link ReadableStream} instances.
         *
         * Teeing a stream will lock it, preventing any other consumer from acquiring a reader.
         * To cancel the stream, cancel both of the resulting branches; a composite cancellation reason will then be
         * propagated to the stream's underlying source.
         *
         * Note that the chunks seen in each branch will be the same object. If the chunks are not immutable,
         * this could allow interference between the two branches.
         */
        tee() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("tee");
          }
          const branches = ReadableStreamTee(this);
          return CreateArrayFromList(branches);
        }
        values(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("values");
          }
          const options = convertIteratorOptions(rawOptions, "First parameter");
          return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        }
        [SymbolAsyncIterator](options) {
          return this.values(options);
        }
        /**
         * Creates a new ReadableStream wrapping the provided iterable or async iterable.
         *
         * This can be used to adapt various kinds of objects into a readable stream,
         * such as an array, an async generator, or a Node.js readable stream.
         */
        static from(asyncIterable) {
          return ReadableStreamFrom(asyncIterable);
        }
      }
      Object.defineProperties(ReadableStream2, {
        from: { enumerable: true }
      });
      Object.defineProperties(ReadableStream2.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
      });
      setFunctionName(ReadableStream2.from, "from");
      setFunctionName(ReadableStream2.prototype.cancel, "cancel");
      setFunctionName(ReadableStream2.prototype.getReader, "getReader");
      setFunctionName(ReadableStream2.prototype.pipeThrough, "pipeThrough");
      setFunctionName(ReadableStream2.prototype.pipeTo, "pipeTo");
      setFunctionName(ReadableStream2.prototype.tee, "tee");
      setFunctionName(ReadableStream2.prototype.values, "values");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, Symbol.toStringTag, {
          value: "ReadableStream",
          configurable: true
        });
      }
      Object.defineProperty(ReadableStream2.prototype, SymbolAsyncIterator, {
        value: ReadableStream2.prototype.values,
        writable: true,
        configurable: true
      });
      function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
        return stream;
      }
      function InitializeReadableStream(stream) {
        stream._state = "readable";
        stream._reader = void 0;
        stream._storedError = void 0;
        stream._disturbed = false;
      }
      function IsReadableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStream2;
      }
      function IsReadableStreamLocked(stream) {
        if (stream._reader === void 0) {
          return false;
        }
        return true;
      }
      function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (stream._state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
          const readIntoRequests = reader._readIntoRequests;
          reader._readIntoRequests = new SimpleQueue();
          readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._closeSteps(void 0);
          });
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop2);
      }
      function ReadableStreamClose(stream) {
        stream._state = "closed";
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
          const readRequests = reader._readRequests;
          reader._readRequests = new SimpleQueue();
          readRequests.forEach((readRequest) => {
            readRequest._closeSteps();
          });
        }
      }
      function ReadableStreamError(stream, e2) {
        stream._state = "errored";
        stream._storedError = e2;
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseReject(reader, e2);
        if (IsReadableStreamDefaultReader(reader)) {
          ReadableStreamDefaultReaderErrorReadRequests(reader, e2);
        } else {
          ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e2);
        }
      }
      function streamBrandCheckException$1(name) {
        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
      }
      function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
        return {
          highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
      }
      const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
      };
      setFunctionName(byteLengthSizeFunction, "size");
      class ByteLengthQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("highWaterMark");
          }
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by returning the value of its `byteLength` property.
         */
        get size() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("size");
          }
          return byteLengthSizeFunction;
        }
      }
      Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, Symbol.toStringTag, {
          value: "ByteLengthQueuingStrategy",
          configurable: true
        });
      }
      function byteLengthBrandCheckException(name) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
      }
      function IsByteLengthQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof ByteLengthQueuingStrategy;
      }
      const countSizeFunction = () => {
        return 1;
      };
      setFunctionName(countSizeFunction, "size");
      class CountQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "CountQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("highWaterMark");
          }
          return this._countQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by always returning 1.
         * This ensures that the total queue size is a count of the number of chunks in the queue.
         */
        get size() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("size");
          }
          return countSizeFunction;
        }
      }
      Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(CountQueuingStrategy.prototype, Symbol.toStringTag, {
          value: "CountQueuingStrategy",
          configurable: true
        });
      }
      function countBrandCheckException(name) {
        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
      }
      function IsCountQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof CountQueuingStrategy;
      }
      function convertTransformer(original, context) {
        assertDictionary(original, context);
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
          cancel: cancel === void 0 ? void 0 : convertTransformerCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
          readableType,
          start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
          transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
          writableType
        };
      }
      function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function convertTransformerCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
          if (rawTransformer === void 0) {
            rawTransformer = null;
          }
          const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
          const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
          const transformer = convertTransformer(rawTransformer, "First parameter");
          if (transformer.readableType !== void 0) {
            throw new RangeError("Invalid readableType specified");
          }
          if (transformer.writableType !== void 0) {
            throw new RangeError("Invalid writableType specified");
          }
          const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
          const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
          const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
          const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
          let startPromise_resolve;
          const startPromise = newPromise((resolve) => {
            startPromise_resolve = resolve;
          });
          InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
          if (transformer.start !== void 0) {
            startPromise_resolve(transformer.start(this._transformStreamController));
          } else {
            startPromise_resolve(void 0);
          }
        }
        /**
         * The readable side of the transform stream.
         */
        get readable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("readable");
          }
          return this._readable;
        }
        /**
         * The writable side of the transform stream.
         */
        get writable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("writable");
          }
          return this._writable;
        }
      }
      Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(TransformStream.prototype, Symbol.toStringTag, {
          value: "TransformStream",
          configurable: true
        });
      }
      function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
          return startPromise;
        }
        function writeAlgorithm(chunk) {
          return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
          return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
          return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
          return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
          return TransformStreamDefaultSourceCancelAlgorithm(stream, reason);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        stream._backpressure = void 0;
        stream._backpressureChangePromise = void 0;
        stream._backpressureChangePromise_resolve = void 0;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = void 0;
      }
      function IsTransformStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
          return false;
        }
        return x2 instanceof TransformStream;
      }
      function TransformStreamError(stream, e2) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
        TransformStreamErrorWritableAndUnblockWrite(stream, e2);
      }
      function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
        TransformStreamUnblockWrite(stream);
      }
      function TransformStreamUnblockWrite(stream) {
        if (stream._backpressure) {
          TransformStreamSetBackpressure(stream, false);
        }
      }
      function TransformStreamSetBackpressure(stream, backpressure) {
        if (stream._backpressureChangePromise !== void 0) {
          stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise((resolve) => {
          stream._backpressureChangePromise_resolve = resolve;
        });
        stream._backpressure = backpressure;
      }
      class TransformStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the desired size to fill the readable side’s internal queue. It can be negative, if the queue is over-full.
         */
        get desiredSize() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("desiredSize");
          }
          const readableController = this._controlledTransformStream._readable._readableStreamController;
          return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("enqueue");
          }
          TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors both the readable side and the writable side of the controlled transform stream, making all future
         * interactions with it fail with the given error `e`. Any chunks queued for transformation will be discarded.
         */
        error(reason = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("error");
          }
          TransformStreamDefaultControllerError(this, reason);
        }
        /**
         * Closes the readable side and errors the writable side of the controlled transform stream. This is useful when the
         * transformer only needs to consume a portion of the chunks written to the writable side.
         */
        terminate() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("terminate");
          }
          TransformStreamDefaultControllerTerminate(this);
        }
      }
      Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(TransformStreamDefaultController.prototype.enqueue, "enqueue");
      setFunctionName(TransformStreamDefaultController.prototype.error, "error");
      setFunctionName(TransformStreamDefaultController.prototype.terminate, "terminate");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(TransformStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "TransformStreamDefaultController",
          configurable: true
        });
      }
      function IsTransformStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
          return false;
        }
        return x2 instanceof TransformStreamDefaultController;
      }
      function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm, cancelAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._finishPromise = void 0;
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm;
        let flushAlgorithm;
        let cancelAlgorithm;
        if (transformer.transform !== void 0) {
          transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
        } else {
          transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
        }
        if (transformer.flush !== void 0) {
          flushAlgorithm = () => transformer.flush(controller);
        } else {
          flushAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (transformer.cancel !== void 0) {
          cancelAlgorithm = (reason) => transformer.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm, cancelAlgorithm);
      }
      function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = void 0;
        controller._flushAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
          throw new TypeError("Readable side is not in a state that permits enqueue");
        }
        try {
          ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        } catch (e2) {
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
          throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
          TransformStreamSetBackpressure(stream, true);
        }
      }
      function TransformStreamDefaultControllerError(controller, e2) {
        TransformStreamError(controller._controlledTransformStream, e2);
      }
      function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, void 0, (r2) => {
          TransformStreamError(controller._controlledTransformStream, r2);
          throw r2;
        });
      }
      function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError("TransformStream terminated");
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
      }
      function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
          const backpressureChangePromise = stream._backpressureChangePromise;
          return transformPromiseWith(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state = writable._state;
            if (state === "erroring") {
              throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform(controller, chunk);
          });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
      }
      function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const readable = stream._readable;
        controller._finishPromise = newPromise((resolve, reject) => {
          controller._finishPromise_resolve = resolve;
          controller._finishPromise_reject = reject;
        });
        const cancelPromise = controller._cancelAlgorithm(reason);
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(cancelPromise, () => {
          if (readable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, readable._storedError);
          } else {
            ReadableStreamDefaultControllerError(readable._readableStreamController, reason);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r2) => {
          ReadableStreamDefaultControllerError(readable._readableStreamController, r2);
          defaultControllerFinishPromiseReject(controller, r2);
          return null;
        });
        return controller._finishPromise;
      }
      function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const readable = stream._readable;
        controller._finishPromise = newPromise((resolve, reject) => {
          controller._finishPromise_resolve = resolve;
          controller._finishPromise_reject = reject;
        });
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(flushPromise, () => {
          if (readable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, readable._storedError);
          } else {
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r2) => {
          ReadableStreamDefaultControllerError(readable._readableStreamController, r2);
          defaultControllerFinishPromiseReject(controller, r2);
          return null;
        });
        return controller._finishPromise;
      }
      function TransformStreamDefaultSourcePullAlgorithm(stream) {
        TransformStreamSetBackpressure(stream, false);
        return stream._backpressureChangePromise;
      }
      function TransformStreamDefaultSourceCancelAlgorithm(stream, reason) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const writable = stream._writable;
        controller._finishPromise = newPromise((resolve, reject) => {
          controller._finishPromise_resolve = resolve;
          controller._finishPromise_reject = reject;
        });
        const cancelPromise = controller._cancelAlgorithm(reason);
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(cancelPromise, () => {
          if (writable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, writable._storedError);
          } else {
            WritableStreamDefaultControllerErrorIfNeeded(writable._writableStreamController, reason);
            TransformStreamUnblockWrite(stream);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r2) => {
          WritableStreamDefaultControllerErrorIfNeeded(writable._writableStreamController, r2);
          TransformStreamUnblockWrite(stream);
          defaultControllerFinishPromiseReject(controller, r2);
          return null;
        });
        return controller._finishPromise;
      }
      function defaultControllerBrandCheckException(name) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
      }
      function defaultControllerFinishPromiseResolve(controller) {
        if (controller._finishPromise_resolve === void 0) {
          return;
        }
        controller._finishPromise_resolve();
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function defaultControllerFinishPromiseReject(controller, reason) {
        if (controller._finishPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(controller._finishPromise);
        controller._finishPromise_reject(reason);
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function streamBrandCheckException(name) {
        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
      }
      exports3.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
      exports3.CountQueuingStrategy = CountQueuingStrategy;
      exports3.ReadableByteStreamController = ReadableByteStreamController;
      exports3.ReadableStream = ReadableStream2;
      exports3.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
      exports3.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
      exports3.ReadableStreamDefaultController = ReadableStreamDefaultController;
      exports3.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
      exports3.TransformStream = TransformStream;
      exports3.TransformStreamDefaultController = TransformStreamDefaultController;
      exports3.WritableStream = WritableStream;
      exports3.WritableStreamDefaultController = WritableStreamDefaultController;
      exports3.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
    }));
  }
});

// node_modules/fetch-blob/streams.cjs
var require_streams = __commonJS({
  "node_modules/fetch-blob/streams.cjs"() {
    var POOL_SIZE2 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error) {
          process2.emitWarning = emitWarning;
          throw error;
        }
      } catch (error) {
        Object.assign(globalThis, require_ponyfill_es2018());
      }
    }
    try {
      const { Blob: Blob3 } = require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE2));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error) {
    }
  }
});

// node_modules/fetch-blob/index.js
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* (
        /** @type {AsyncIterableIterator<Uint8Array>} */
        part.stream()
      );
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = (
        /** @type {Blob} */
        part
      );
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var import_streams, POOL_SIZE, _Blob, Blob2, fetch_blob_default;
var init_fetch_blob = __esm({
  "node_modules/fetch-blob/index.js"() {
    import_streams = __toESM(require_streams(), 1);
    POOL_SIZE = 65536;
    _Blob = class Blob {
      /** @type {Array.<(Blob|Uint8Array)>} */
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      /**
       * The Blob() constructor returns a new Blob object. The content
       * of the blob consists of the concatenation of the values given
       * in the parameter array.
       *
       * @param {*} blobParts
       * @param {{ type?: string, endings?: string }} [options]
       */
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null) options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder.encode(`${element}`);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      /**
       * The Blob interface's size property returns the
       * size of the Blob in bytes.
       */
      get size() {
        return this.#size;
      }
      /**
       * The type property of a Blob object returns the MIME type of the file.
       */
      get type() {
        return this.#type;
      }
      /**
       * The text() method in the Blob interface returns a Promise
       * that resolves with a string containing the contents of
       * the blob, interpreted as UTF-8.
       *
       * @return {Promise<string>}
       */
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      /**
       * The arrayBuffer() method in the Blob interface returns a
       * Promise that resolves with the contents of the blob as
       * binary data contained in an ArrayBuffer.
       *
       * @return {Promise<ArrayBuffer>}
       */
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          // @ts-ignore
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      /**
       * The Blob interface's slice() method creates and returns a
       * new Blob object which contains data from a subset of the
       * blob on which it's called.
       *
       * @param {number} [start]
       * @param {number} [end]
       * @param {string} [type]
       */
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    fetch_blob_default = Blob2;
  }
});

// node_modules/fetch-blob/file.js
var _File, File2, file_default;
var init_file = __esm({
  "node_modules/fetch-blob/file.js"() {
    init_fetch_blob();
    _File = class File extends fetch_blob_default {
      #lastModified = 0;
      #name = "";
      /**
       * @param {*[]} fileBits
       * @param {string} fileName
       * @param {{lastModified?: number, type?: string}} options
       */
      // @ts-ignore
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null) options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof fetch_blob_default && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File2 = _File;
    file_default = File2;
  }
});

// node_modules/formdata-polyfill/esm.min.js
function formDataToBlob(F2, B = fetch_blob_default) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
var t, i, h, r, m, f, e, x, FormData;
var init_esm_min = __esm({
  "node_modules/formdata-polyfill/esm.min.js"() {
    init_fetch_blob();
    init_file();
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new file_default([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length) throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++) if (b[c][0] === a) return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this) a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this) yield a;
      }
      *values() {
        for (var [, a] of this) yield a;
      }
    };
  }
});

// node_modules/node-fetch/src/errors/base.js
var FetchBaseError;
var init_base = __esm({
  "node_modules/node-fetch/src/errors/base.js"() {
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
  }
});

// node_modules/node-fetch/src/errors/fetch-error.js
var FetchError;
var init_fetch_error = __esm({
  "node_modules/node-fetch/src/errors/fetch-error.js"() {
    init_base();
    FetchError = class extends FetchBaseError {
      /**
       * @param  {string} message -      Error message for human
       * @param  {string} [type] -        Error type for machine
       * @param  {SystemError} [systemError] - For Node.js system error
       */
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
  }
});

// node_modules/node-fetch/src/utils/is.js
var NAME, isURLSearchParameters, isBlob, isAbortSignal, isDomainOrSubdomain, isSameProtocol;
var init_is = __esm({
  "node_modules/node-fetch/src/utils/is.js"() {
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    isDomainOrSubdomain = (destination, original) => {
      const orig = new URL(original).hostname;
      const dest = new URL(destination).hostname;
      return orig === dest || orig.endsWith(`.${dest}`);
    };
    isSameProtocol = (destination, original) => {
      const orig = new URL(original).protocol;
      const dest = new URL(destination).protocol;
      return orig === dest;
    };
  }
});

// node_modules/node-domexception/index.js
var require_node_domexception = __commonJS({
  "node_modules/node-domexception/index.js"(exports2, module2) {
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    module2.exports = globalThis.DOMException;
  }
});

// node_modules/fetch-blob/from.js
var import_node_fs, import_node_path, import_node_domexception, stat, blobFromSync, blobFrom, fileFrom, fileFromSync, fromBlob, fromFile, BlobDataItem;
var init_from = __esm({
  "node_modules/fetch-blob/from.js"() {
    import_node_fs = require("fs");
    import_node_path = require("path");
    import_node_domexception = __toESM(require_node_domexception(), 1);
    init_file();
    init_fetch_blob();
    ({ stat } = import_node_fs.promises);
    blobFromSync = (path, type) => fromBlob((0, import_node_fs.statSync)(path), path, type);
    blobFrom = (path, type) => stat(path).then((stat2) => fromBlob(stat2, path, type));
    fileFrom = (path, type) => stat(path).then((stat2) => fromFile(stat2, path, type));
    fileFromSync = (path, type) => fromFile((0, import_node_fs.statSync)(path), path, type);
    fromBlob = (stat2, path, type = "") => new fetch_blob_default([new BlobDataItem({
      path,
      size: stat2.size,
      lastModified: stat2.mtimeMs,
      start: 0
    })], { type });
    fromFile = (stat2, path, type = "") => new file_default([new BlobDataItem({
      path,
      size: stat2.size,
      lastModified: stat2.mtimeMs,
      start: 0
    })], (0, import_node_path.basename)(path), { type, lastModified: stat2.mtimeMs });
    BlobDataItem = class _BlobDataItem {
      #path;
      #start;
      constructor(options) {
        this.#path = options.path;
        this.#start = options.start;
        this.size = options.size;
        this.lastModified = options.lastModified;
      }
      /**
       * Slicing arguments is first validated and formatted
       * to not be out of range by Blob.prototype.slice
       */
      slice(start, end) {
        return new _BlobDataItem({
          path: this.#path,
          lastModified: this.lastModified,
          size: end - start,
          start: this.#start + start
        });
      }
      async *stream() {
        const { mtimeMs } = await stat(this.#path);
        if (mtimeMs > this.lastModified) {
          throw new import_node_domexception.default("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
        }
        yield* (0, import_node_fs.createReadStream)(this.#path, {
          start: this.#start,
          end: this.#start + this.size - 1
        });
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
    };
  }
});

// node_modules/node-fetch/src/utils/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new file_default(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f2, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/node-fetch/src/utils/multipart-parser.js"() {
    init_from();
    init_esm_min();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f2 = 1;
    F = {
      PART_BOUNDARY: f2,
      LAST_BOUNDARY: f2 *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      /**
       * @param {string} boundary
       */
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      /**
       * @param {Uint8Array} data
       */
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            // falls through
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            // falls through
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            // falls through
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/node-fetch/src/body.js
async function consumeBody(data) {
  if (data[INTERNALS].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS].disturbed = true;
  if (data[INTERNALS].error) {
    throw data[INTERNALS].error;
  }
  const { body } = data;
  if (body === null) {
    return import_node_buffer.Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return import_node_buffer.Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return import_node_buffer.Buffer.from(accum.join(""));
      }
      return import_node_buffer.Buffer.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var import_node_stream, import_node_util, import_node_buffer, pipeline, INTERNALS, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream;
var init_body = __esm({
  "node_modules/node-fetch/src/body.js"() {
    import_node_stream = __toESM(require("stream"), 1);
    import_node_util = require("util");
    import_node_buffer = require("buffer");
    init_fetch_blob();
    init_esm_min();
    init_fetch_error();
    init_base();
    init_is();
    pipeline = (0, import_node_util.promisify)(import_node_stream.default.pipeline);
    INTERNALS = /* @__PURE__ */ Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = import_node_buffer.Buffer.from(body.toString());
        } else if (isBlob(body)) {
        } else if (import_node_buffer.Buffer.isBuffer(body)) {
        } else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = import_node_buffer.Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = import_node_buffer.Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default) {
        } else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = import_node_buffer.Buffer.from(String(body));
        }
        let stream = body;
        if (import_node_buffer.Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on("error", (error_) => {
            const error = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS].error = error;
          });
        }
      }
      get body() {
        return this[INTERNALS].stream;
      }
      get bodyUsed() {
        return this[INTERNALS].disturbed;
      }
      /**
       * Decode response as ArrayBuffer
       *
       * @return  Promise
       */
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      /**
       * Return raw response as Blob
       *
       * @return Promise
       */
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS].body && this[INTERNALS].body.type || "";
        const buf = await this.arrayBuffer();
        return new fetch_blob_default([buf], {
          type: ct
        });
      }
      /**
       * Decode response as json
       *
       * @return  Promise
       */
      async json() {
        const text = await this.text();
        return JSON.parse(text);
      }
      /**
       * Decode response as text
       *
       * @return  Promise
       */
      async text() {
        const buffer = await consumeBody(this);
        return new TextDecoder().decode(buffer);
      }
      /**
       * Decode response as buffer (non-spec api)
       *
       * @return  Promise
       */
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true },
      data: { get: (0, import_node_util.deprecate)(
        () => {
        },
        "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
        "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
      ) }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)(
      (body) => body.getBoundary(),
      "form-data doesn't follow the spec and requires special treatment. Use alternative package",
      "https://github.com/node-fetch/node-fetch/issues/1167"
    );
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (import_node_buffer.Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (import_node_buffer.Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = async (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        await pipeline(body, dest);
      }
    };
  }
});

// node_modules/node-fetch/src/headers.js
function fromRawHeaders(headers = []) {
  return new Headers(
    headers.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []).filter(([name, value]) => {
      try {
        validateHeaderName(name);
        validateHeaderValue(name, String(value));
        return true;
      } catch {
        return false;
      }
    })
  );
}
var import_node_util2, import_node_http, validateHeaderName, validateHeaderValue, Headers;
var init_headers = __esm({
  "node_modules/node-fetch/src/headers.js"() {
    import_node_util2 = require("util");
    import_node_http = __toESM(require("http"), 1);
    validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error;
      }
    };
    validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
        throw error;
      }
    };
    Headers = class _Headers extends URLSearchParams {
      /**
       * Headers class
       *
       * @constructor
       * @param {HeadersInit} [init] - Response headers
       */
      constructor(init) {
        let result = [];
        if (init instanceof _Headers) {
          const raw = init.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init == null) {
        } else if (typeof init === "object" && !import_node_util2.types.isBoxedPrimitive(init)) {
          const method = init[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init].map((pair) => {
              if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(
                    target,
                    String(name).toLowerCase(),
                    String(value)
                  );
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(
                    target,
                    String(name).toLowerCase()
                  );
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      /**
       * @type {() => IterableIterator<[string, string]>}
       */
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      /**
       * Node-fetch non-spec method
       * returning all headers and their values as array
       * @returns {Record<string, string[]>}
       */
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      /**
       * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
       */
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(
      Headers.prototype,
      ["get", "entries", "forEach", "values"].reduce((result, property) => {
        result[property] = { enumerable: true };
        return result;
      }, {})
    );
  }
});

// node_modules/node-fetch/src/utils/is-redirect.js
var redirectStatus, isRedirect;
var init_is_redirect = __esm({
  "node_modules/node-fetch/src/utils/is-redirect.js"() {
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
  }
});

// node_modules/node-fetch/src/response.js
var INTERNALS2, Response;
var init_response = __esm({
  "node_modules/node-fetch/src/response.js"() {
    init_headers();
    init_body();
    init_is_redirect();
    INTERNALS2 = /* @__PURE__ */ Symbol("Response internals");
    Response = class _Response extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS2] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS2].type;
      }
      get url() {
        return this[INTERNALS2].url || "";
      }
      get status() {
        return this[INTERNALS2].status;
      }
      /**
       * Convenience property representing if the request ended normally
       */
      get ok() {
        return this[INTERNALS2].status >= 200 && this[INTERNALS2].status < 300;
      }
      get redirected() {
        return this[INTERNALS2].counter > 0;
      }
      get statusText() {
        return this[INTERNALS2].statusText;
      }
      get headers() {
        return this[INTERNALS2].headers;
      }
      get highWaterMark() {
        return this[INTERNALS2].highWaterMark;
      }
      /**
       * Clone this response
       *
       * @return  Response
       */
      clone() {
        return new _Response(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      /**
       * @param {string} url    The URL that the new response is to originate from.
       * @param {number} status An optional status code for the response (e.g., 302.)
       * @returns {Response}    A Response object.
       */
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new _Response(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new _Response(null, { status: 0, statusText: "" });
        response[INTERNALS2].type = "error";
        return response;
      }
      static json(data = void 0, init = {}) {
        const body = JSON.stringify(data);
        if (body === void 0) {
          throw new TypeError("data is not JSON serializable");
        }
        const headers = new Headers(init && init.headers);
        if (!headers.has("content-type")) {
          headers.set("content-type", "application/json");
        }
        return new _Response(body, {
          ...init,
          headers
        });
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
  }
});

// node_modules/node-fetch/src/utils/get-search.js
var getSearch;
var init_get_search = __esm({
  "node_modules/node-fetch/src/utils/get-search.js"() {
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
    };
  }
});

// node_modules/node-fetch/src/utils/referrer.js
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_node_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
var import_node_net, ReferrerPolicy, DEFAULT_REFERRER_POLICY;
var init_referrer = __esm({
  "node_modules/node-fetch/src/utils/referrer.js"() {
    import_node_net = require("net");
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
  }
});

// node_modules/node-fetch/src/request.js
var import_node_url, import_node_util3, INTERNALS3, isRequest, doBadDataWarn, Request, getNodeRequestOptions;
var init_request = __esm({
  "node_modules/node-fetch/src/request.js"() {
    import_node_url = require("url");
    import_node_util3 = require("util");
    init_headers();
    init_body();
    init_is();
    init_get_search();
    init_referrer();
    INTERNALS3 = /* @__PURE__ */ Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS3] === "object";
    };
    doBadDataWarn = (0, import_node_util3.deprecate)(
      () => {
      },
      ".data is not a valid RequestInit property, use .body instead",
      "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
    );
    Request = class _Request extends Body {
      constructor(input, init = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
        }
        let method = init.method || input.method || "GET";
        if (/^(delete|get|head|options|post|put)$/i.test(method)) {
          method = method.toUpperCase();
        }
        if (!isRequest(init) && "data" in init) {
          doBadDataWarn();
        }
        if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init.size || input.size || 0
        });
        const headers = new Headers(init.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init) {
          signal = init.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init.referrer == null ? input.referrer : init.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS3] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
        this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
        this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
      }
      /** @returns {string} */
      get method() {
        return this[INTERNALS3].method;
      }
      /** @returns {string} */
      get url() {
        return (0, import_node_url.format)(this[INTERNALS3].parsedURL);
      }
      /** @returns {Headers} */
      get headers() {
        return this[INTERNALS3].headers;
      }
      get redirect() {
        return this[INTERNALS3].redirect;
      }
      /** @returns {AbortSignal} */
      get signal() {
        return this[INTERNALS3].signal;
      }
      // https://fetch.spec.whatwg.org/#dom-request-referrer
      get referrer() {
        if (this[INTERNALS3].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS3].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS3].referrer) {
          return this[INTERNALS3].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS3].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS3].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      /**
       * Clone this request
       *
       * @return  Request
       */
      clone() {
        return new _Request(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS3];
      const headers = new Headers(request[INTERNALS3].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS3].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS3].referrer = "no-referrer";
      }
      if (request[INTERNALS3].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip, deflate, br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      const search = getSearch(parsedURL);
      const options = {
        // Overwrite search to retain trailing ? (issue #776)
        path: parsedURL.pathname + search,
        // The following options are not expressed in the URL
        method: request.method,
        headers: headers[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        /** @type {URL} */
        parsedURL,
        options
      };
    };
  }
});

// node_modules/node-fetch/src/errors/abort-error.js
var AbortError;
var init_abort_error = __esm({
  "node_modules/node-fetch/src/errors/abort-error.js"() {
    init_base();
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
  }
});

// node_modules/node-fetch/src/index.js
var src_exports = {};
__export(src_exports, {
  AbortError: () => AbortError,
  Blob: () => fetch_blob_default,
  FetchError: () => FetchError,
  File: () => file_default,
  FormData: () => FormData,
  Headers: () => Headers,
  Request: () => Request,
  Response: () => Response,
  blobFrom: () => blobFrom,
  blobFromSync: () => blobFromSync,
  default: () => fetch,
  fileFrom: () => fileFrom,
  fileFromSync: () => fileFromSync,
  isRedirect: () => isRedirect
});
async function fetch(url, options_) {
  return new Promise((resolve, reject) => {
    const request = new Request(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dist_default(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response(body, responseOptions);
          resolve(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response(body, responseOptions);
            resolve(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = import_node_buffer2.Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = import_node_buffer2.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = import_node_buffer2.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && import_node_buffer2.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}
var import_node_http2, import_node_https, import_node_zlib, import_node_stream2, import_node_buffer2, supportedSchemas;
var init_src = __esm({
  "node_modules/node-fetch/src/index.js"() {
    import_node_http2 = __toESM(require("http"), 1);
    import_node_https = __toESM(require("https"), 1);
    import_node_zlib = __toESM(require("zlib"), 1);
    import_node_stream2 = __toESM(require("stream"), 1);
    import_node_buffer2 = require("buffer");
    init_dist();
    init_body();
    init_response();
    init_headers();
    init_request();
    init_fetch_error();
    init_abort_error();
    init_is_redirect();
    init_esm_min();
    init_is();
    init_referrer();
    init_from();
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// netlify/functions/sponsor-success.js
var stripe = require_stripe_cjs_node()(process.env.STRIPE_SECRET_KEY);
var fetch2 = (init_src(), __toCommonJS(src_exports));
exports.handler = async (event) => {
  try {
    const { session_id } = JSON.parse(event.body || "{}");
    if (!session_id) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: "No session_id provided" }) };
    }
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || session.payment_status !== "paid") {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: "Payment not completed" }) };
    }
    const customerId = session.customer;
    const packKey = session.metadata?.packKey || null;
    if (!customerId || !packKey) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: "Missing customer or pack info" }) };
    }
    const res = await fetch2(`${process.env.BASE_URL}/.netlify/functions/sponsor-credits-add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId, packKey })
    });
    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, credits: data.credits || 0 })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
/*! Bundled license information:

web-streams-polyfill/dist/ponyfill.es2018.js:
  (**
   * @license
   * web-streams-polyfill v3.3.3
   * Copyright 2024 Mattias Buelens, Diwank Singh Tomer and other contributors.
   * This code is released under the MIT license.
   * SPDX-License-Identifier: MIT
   *)

fetch-blob/index.js:
  (*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)

formdata-polyfill/esm.min.js:
  (*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)

node-domexception/index.js:
  (*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)
*/
//# sourceMappingURL=sponsor-success.js.map
