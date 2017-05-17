import PouchDB from 'pouchdb-react-native'
//import PouchDB from 'pouchdb-core'
import find from 'pouchdb-find'
PouchDB.plugin(find)

const options = {
  skipSetup: true,
}
const connection = new PouchDB("http://198.199.78.214:5984/bolty", options)
//const connection = new PouchDB('myDB')

class DB {
  constructor() {
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
