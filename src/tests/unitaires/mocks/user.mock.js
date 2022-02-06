class User {
  constructor() {
    this.data = [
      { id: 1, user: "a" },
      { id: 2, user: "V1nc3ntL€BgDu-quetre-vin-katorz" },
    ];
    this.currentId = this.data.length;
  }

  async findAll() {
    return this.data;
  }
  async getAllUsers() {
    return this.data;
  }
  async findOne(query) {
    const data = this.data.filter((row) => row.name === query.where.name);
    return data;
  }

  async create({ name }) {
    const id = this.currentId++;
    const newRow = { id, name };
    this.data.push(newRow);
    return newRow;
  }
}
export default new User();
