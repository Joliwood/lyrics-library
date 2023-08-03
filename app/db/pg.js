/**
 * Plutôt que créer et connecté un Client
 * On va plutôt créer un "pool" de client et
 * laisser notre module manager les connexions
 * de plusieurs client en fonction des besoins.
 *
 * Le package pg étant bien fait, pas besoin de changer aurtre chose.
 * l'objet de pool à aussi une méthode query donc le reste de notre code
 * continuera de fonctionner
 *
 * Comme pour Client les informations de connexion
 * sont lu soit directement à partir de l'env soit donnée en paramêtre
 */
import debug from 'debug';
import pg from 'pg';

const debugSql = debug('app:sql');

const pool = new pg.Pool();

let queryCount = 0;

export default {
  // On expose quand même le client original "au cas ou"
  originalClient: pool,

  // On fait une méthode pour "intercepter"
  // les requêtes afin de pouvoir les afficher
  // L'opérateur de "rest" permet de transformer
  // ici X variables en param. en un tableau
  async query(...params) {
    debugSql(...params);
    queryCount += 1;
    debugSql(`Req n°${queryCount}`);

    // L'opérateur ici fait l'effet inverse on transforme
    // un tableau en une liste
    // de variables / paramétre ce qui fait que la méthode query du client sera
    // appelé exactement de la même façon que celle de notre module
    return this.originalClient.query(...params);
  },
};
