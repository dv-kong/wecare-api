class RepositoryMock {
  private datas: any[];

  constructor(datas: any[] = []) {
    this.datas = datas;
  }

  async addNew(data: any): Promise<any> {
    this.datas.push(data);
    return data;
  }
  async findAll(): Promise<any[]> {
    return await this.datas;
  }
  async deleteById(id: any): Promise<any> {
    const dataFound = await this.datas.find((data) => data.id === id);
    if (dataFound === undefined) {
      return { raw: [], affected: 0 };
    }
    this.datas.splice(this.datas.indexOf(dataFound), 1);
    return { raw: [], affected: 1 };
  }

  async findByEmail(email: any): Promise<any> {
    return await this.datas.find((data) => data.email === email);
  }

  async findById(id: any): Promise<any> {
    return await this.datas.find((data) => data.id === id);
  }

  async update(id: any, data: any) {
    let response;
    const dataFound = this.datas.find((data) => data.id === id);

    response =
      dataFound === undefined
        ? { generatedMaps: [], raw: [], affected: 0 }
        : { generatedMaps: [], raw: [], affected: 1 };

    const indexOfDataFound = this.datas.indexOf(dataFound);

    this.datas[indexOfDataFound].id = data.id;

    const obj = {
      ...this.datas[indexOfDataFound],
      ...data,
    };
    this.datas[indexOfDataFound] = obj;

    return { response, data: this.datas[indexOfDataFound] };
  }
  async getJob(id: any): Promise<any> {
    return await this.datas.find((data) => data.id === id);
  }
}

export default RepositoryMock;
