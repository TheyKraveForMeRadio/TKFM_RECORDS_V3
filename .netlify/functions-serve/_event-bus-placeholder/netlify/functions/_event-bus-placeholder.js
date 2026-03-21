var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// netlify/functions/_event-bus.js
var require_event_bus = __commonJS({
  "netlify/functions/_event-bus.js"(exports2, module2) {
    var listeners = {};
    function emit(event, payload) {
      if (!listeners[event]) return;
      listeners[event].forEach((fn) => {
        try {
          fn(payload);
        } catch (e) {
          console.error("event handler error", event, e);
        }
      });
    }
    function on(event, handler) {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(handler);
    }
    module2.exports = {
      emit,
      on
    };
  }
});

// netlify/functions/_event-bus-placeholder.js
var bus = require_event_bus();
exports.handler = async function(event) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "event-bus-placeholder",
        message: "Event bus operational"
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
};
//# sourceMappingURL=_event-bus-placeholder.js.map
