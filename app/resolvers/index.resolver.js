import restaurantDatamapper from '../datamappers/restaurant.js';
import cityDatamapper from '../datamappers/city.js';

export default {
  // Dans le resolver on doit respecter le format du schéma, et lister pour chaque chose que l'on
  // veut expliquer les attributs sous forme de méthode JS Pour le type Query
  Query: {
    // on a un attribut "restaurants" du type Query On va retourner une valeur qui respecte le
    // format décrit dans le schéma. Ici on doit retourné un tableau de "Restaurant"
    // ([Restaurant]) sachant qu'un restaurant est un objet qui doit contenir les propriétés
    // listées en tant qu'attribut dans le type "Restaurant"
    /*
        [
          {
            id: 1, name: 'le super resto',
            description: 'Wahoo il est génial',
            terrace: false,
            manager_id: 1,
            city_id: 2
          },
          {…},
          …
        ]
        */
    async restaurants() {
      const rows = await restaurantDatamapper.findAll();
      // par contre ici, je vais renvoyer plus de propriété qu'attendu, par exemple
      // "created_at", mais c'est pas grave graphQL va les ignorer.
      return rows;
    },

    async restaurant(_, args) {
      const row = await restaurantDatamapper.findByPk(args.id);
      return row;
    },

    async cities() {
      const rows = await cityDatamapper.findAll();
      return rows;
    },

    async city(_, args) {
      const row = await cityDatamapper.findByPk(args.id);
      return row;
    },
  },

  Restaurant: {
    async city(parent) {
      const row = await cityDatamapper.findByPk(parent.city_id);
      return row;
    },
  },

  City: {
    async restaurants(parent) {
      const rows = await restaurantDatamapper.findByCity(parent.id);
      return rows;
    },
  },
};
