var objLocalStore = {
}

/**
 * We read in local store the data at the key
 * @param data
 * @param key
 */
module.exports.writeData = function(key, data) {
    if (key in objLocalStore) {
        objLocalStore[key] = {...objLocalStore[key], ...data }
    } else {
        objLocalStore[key] = {...objLocalStore, ...data }
    }
}
/**
 * get a collection
 * @param pointer
 * @returns {null|*}
 */
module.exports.readDataByIndex = function(pointer = null) {
    if (pointer !== null) {
        return objLocalStore[pointer]
    } else {
        return null
    }
}

/**
 * get all data
 * @returns {{}}
 */
module.exports.readAllData = function() {
  return objLocalStore
}
