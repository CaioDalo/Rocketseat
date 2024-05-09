import fs from 'fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
    .then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []
    return data 
  }

  insert(table, task) {
    if(this.#database[table]) {
      this.#database.push(task)
    } else {
      this.#database[table] = [task]
    }

    this.#persist()

    return task
  }
}