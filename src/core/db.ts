import PouchDB from "pouchdb";

type Person = {
  name: string;
  age: number;
};

class Databse {
  persons: PouchDB.Database<Person>;

  constructor() {
    this.persons = new PouchDB<Person>("dbname");
  }

  public put(id: string, name: string, age: number) {
    this.persons.put({
      _id: id,
      name: name,
      age: age,
    });
  }

  public async get(id: string) {
    return await this.persons.get(id);
  }
}

export default Databse;
