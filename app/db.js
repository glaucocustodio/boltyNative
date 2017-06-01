import PouchDB from 'pouchdb-react-native'
import SQLite from 'react-native-sqlite-2'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'
import auth from 'pouchdb-authentication'
import find from 'pouchdb-find'

const SQLiteAdapter = SQLiteAdapterFactory(SQLite)
PouchDB.plugin(SQLiteAdapter)
PouchDB.plugin(auth)
PouchDB.plugin(find)

const options = {
  skipSetup: true,
}
const remoteConnection = new PouchDB("http://198.199.78.214:5984/bolty", options)
const connection = new PouchDB('boltyLocalDB', {adapter: 'react-native-sqlite'})

const syncHandler = connection.sync(remoteConnection, {
  live: true,
  retry: true
})

class DB {
  constructor() {
  }

  allDocs() {
    return connection.allDocs({include_docs: true})
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

let db = new DB()
export { db, syncHandler }
