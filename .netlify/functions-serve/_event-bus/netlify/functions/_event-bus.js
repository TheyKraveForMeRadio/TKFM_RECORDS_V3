// netlify/functions/_event-bus.js
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
module.exports = {
  emit,
  on
};
//# sourceMappingURL=_event-bus.js.map
