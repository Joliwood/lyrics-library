class CoreDatamapper {
  tableName;

  constructor(client) {
    this.client = client;
    // Malheureusement je ne peux pas accéder à la valeur de this.tableName de l'instan ce enfant,
    // dans le contructeur parent. Car la définition de cette propriété n'a pas encore été effectué
    // a ce stade.
  }

  // Pour résoudre le problème je déporte la définition du dataloader dans une méthode autre que le
  // contructeur, que j'exécuterai dans le dataource après avoir instancié le datamapper
  init() {
    this.idLoader = this.client.query
      .from(this.tableName)
      .batch(async (query, ids) => {
        const rows = await query.whereIn('id', ids);
        return ids.map((id) => rows.find((row) => row.id === id));
      });
  }

  /**
     * Récupération par identifiant
     * @param {number|number[]} id identifiant ou liste d'identifiants
     * @returns un enregistrement ou une liste d'enregistrement
     */
  async findByPk(id) {
    const row = await this.client.query.from(this.tableName).where({ id }).first();
    return row;
  }

  async findAll(params) {
    const query = this.client.query.from(this.tableName);
    if (params?.where) {
      query.where(params?.where);
    }
    const rows = await query;
    return rows;
  }

  async create(inputData) {
    const row = await this.client.query.insert(inputData).into(this.tableName);
    return row;
  }

  async update(id, inputData) {
    const row = await this.client.query.from(this.tableName).update(inputData).where({ id });
    return row;
  }

  async delete(id) {
    const result = await this.client.query.from(this.tableName).where({ id }).del();
    return result;
  }
}

export default CoreDatamapper;
