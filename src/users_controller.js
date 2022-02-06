class User {
  constructor() {
    this.data = [
      { id: 1, name: "a" },
      { id: 2, name: "V1nc3ntL€BgDu-quetre-vin-katorz" },
    ];
  }

  async findAll() {
    return this.data;
  }
  async getAllUsers() {
    // console.log(this.data);
    return this.data;
  }


  async findOne(query) {
    const data = this.data.filter((row) => row.name === query.where.name);
    return data;
  }

  async create({ name }) {
    let id = this.data.length;
    id++;
    const newRow = { id, name };
    this.data.push(newRow);
    return newRow;
  }
}
export default new User();
