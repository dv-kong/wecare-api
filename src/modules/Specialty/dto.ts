
class SpecialtyDTO {
    public id: string;
    public name: string;
    constructor({
        id,
        name,
    }: SpecialtyDTO) {
        this.id = id;
        this.name = name;
    }
}

export default SpecialtyDTO;
