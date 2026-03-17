
const cache = {}

function getEngine(name,loader){

if(!cache[name]){

cache[name] = loader()

}

return cache[name]

}

module.exports = { getEngine }

