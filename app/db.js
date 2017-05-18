import PouchDB from 'pouchdb-react-native'
//import PouchDB from 'pouchdb-core'
import auth from 'pouchdb-authentication'
import find from 'pouchdb-find'

PouchDB.plugin(auth)
PouchDB.plugin(find)

const options = {
  skipSetup: true,
}
const remoteConnection = new PouchDB("http://198.199.78.214:5984/bolty", options)
const connection = new PouchDB('boltyLocalDB')

connection.sync(remoteConnection, {
  live: true,
  retry: true
})

class DB {
  constructor() {
  }

  loginUser(userData, onError, onSuccess) {
    console.log("logging..")
    console.log(userData)

    remoteConnection.login(userData['username'], userData['password']).then((response) => {
      remoteConnection.getUser(userData['username']).then((response) => {
        this.currentUser = response
        onSuccess(response)
      })

    }).catch((err, response) => {
      onError(err, response)
    })
  }

  all(type, filters = {}, onSuccess) {
    console.log("all called")
    return connection.find({
      selector: Object.assign({ type: type }, filters),
      limit: 999
    })
  }
}
export let db = new DB()
