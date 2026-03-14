import { EventEmitter } from "events"
import { broadcast, subscribe } from "./_engine-mesh.js"

const bus = new EventEmitter()

bus.setMaxListeners(10000)

/* emit */

export function emit(event,data){

bus.emit(event,data)

broadcast(event,data)

}

/* subscribe */

export function on(event,handler){

bus.on(event,handler)

}

/* mesh subscription */

subscribe((event,data)=>{

bus.emit(event,data)

})

export default bus
