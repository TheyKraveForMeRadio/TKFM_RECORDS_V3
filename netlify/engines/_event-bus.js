import { EventEmitter } from "events"

/* GLOBAL EVENT BUS */

const bus = new EventEmitter()

/* allow unlimited engines */

bus.setMaxListeners(10000)

/* emit */

export function emit(event,data){
bus.emit(event,data)
}

/* subscribe */

export function on(event,handler){
bus.on(event,handler)
}

/* once */

export function once(event,handler){
bus.once(event,handler)
}

export default bus
