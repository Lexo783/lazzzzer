const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


module.exports.registerSensor = async function(address) {

    const docRef = db.collection('sensors').doc(address);

    const sensor = {
        address: address,
        date: Date.now(),
    }

    await docRef.get().then((snapshotDoc) => {
        if (!snapshotDoc.exists)
            docRef.set(sensor);
        else
            docRef.update(sensor);
    })
}

module.exports.registerSample = async function(address, sample) {

    const docRef = db.collection('sensors').doc(address)
        .collection('samples').doc(Date.now().toString());

    const data = {
        value: sample,
        date: Date.now(),
    }
    await docRef.set(data);


}

module.exports.listSensors = function() {

    const docRef = db.collection('sensors');

    return docRef.get()

}




/**
 * Creates an user in database if the user given in parameter doesnt exist, if he exists overwites his informations
 * @param {String} userId
 * @param {String} name
 * @param {Int} points
 */
module.exports.writeUserData = async function(userId, name, points) {

    const docRef = db.collection('users').doc(userId);

    const user = {
        userId: userId,
        name: name,
        points: points,
    }

    await docRef.get().then((snapshotDoc) => {
        if (!snapshotDoc.exists)
            docRef.set(user);
        else
            docRef.update(user);
    })
}


/**
 * Get one user from database by his userId
 * @param {String} userId
 * @returns
 */
module.exports.getOneUser = async function(userId) {
    const docRef = db.collection('users').doc(userId);


    return docRef.get()
}


/**
 * get all users
 * @returns a collection of all users
 */
module.exports.getAllUsers = function() {
    const docRef = db.collection('users');

    return docRef.get()
}
