export class Recipe {
  _name!: string;
  _descripcion?: string;
  _tiempo!:number;
  _category?: string;

  constructor(aName: string) {
    this.name = aName;
  }


  get name(): string {
    return this._name;
  }

  set name(aName: string) {
    const trimmed = aName.trim();
    if (trimmed.length === 0) {
      throw new Error("El nombre de la receta no puede ser vacío.");
    }
    this._name = trimmed;
  }

  get tiempo(): string {
    return this._tiempo.toString();
  }

  set tiempo(aTiempo:number){
    if (aTiempo < 0){
      throw new Error ("El tiempo de la receta tiene que ser mayor o igual a cero")
    }
    this._tiempo = aTiempo;
  }


  get category(): string | undefined {
    return this._category;
  }

  set category(aCategory: string) {
    this._category = aCategory;
  }

  get descripcion(): string | undefined {
    return this._descripcion;
  }

  set descripcion(aDescripcion: string) {
    this._descripcion = aDescripcion;
  }

  toString(): string {
    return `Receta: ${this.name} - categoría: ${this.category} - descripcion: ${this.descripcion} - tiempo: ${this.tiempo}`;
  }
}
