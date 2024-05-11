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

  update(table, id, data) {
    const taskToEditIndex = this.#database[table].findIndex(task => task.id === id)
    
    if(taskToEditIndex > -1) {
      const newData = {
        id,
        ...data,
        created_at: this.#database[table][taskToEditIndex].created_at,
        completed_at: this.#database[table][taskToEditIndex].completed_at,
      }
      
      this.#database[table][taskToEditIndex] = newData
      this.#persist() 
    }
  }

  complete(table, id) {
    const taskToCompleteIndex = this.#database[table].findIndex(task => task.id === id)
    
    if(taskToCompleteIndex > -1) {

      const newData = {
        id,
        title: this.#database[table][taskToCompleteIndex].title,
        description: this.#database[table][taskToCompleteIndex].description,
        created_at: this.#database[table][taskToCompleteIndex].created_at,
        updated_at: this.#database[table][taskToCompleteIndex].updated_at,
        completed_at: new Date(),
      }
      
      this.#database[table][taskToCompleteIndex] = newData
      this.#persist() 
    }
  }
}