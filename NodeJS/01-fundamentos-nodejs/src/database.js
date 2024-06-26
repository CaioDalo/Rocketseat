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

  select(table, search) {
    let data = this.#database[table] ?? []

    if(search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
    
    return data
  }

  insert(table, data) {
    if (this.#database[table]) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  delete(table, id) {
    const itemIndex = this.#database[table].findIndex(item => item.id === id)

    if(itemIndex > -1) {
      this.#database[table].splice(itemIndex, 1)
      this.#persist()
    }
  }

  update(table, id, data) {
    const itemIndex = this.#database[table].findIndex(item => item.id === id)

    if(itemIndex > -1) {
      this.#database[table][itemIndex] = { id, ...data }

      this.#persist()
    }
  }
}