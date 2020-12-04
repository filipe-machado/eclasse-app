import API from '../api';

export default class GroupService {
  constructor() {
    this.response = [];
  }

  /**
   * Função que retorna uma lista com todas os grupos
   * @returns array
   */
  static async getAllGroups() {
    const response = await API.get('grupos')
      .then((res) => res.data);
    return response;
  }

  /**
   * Função que retorna uma lista de grupos à partir de uma string de busca
   * @param {String} name conteúdo da tag name
   * @param {String} value nome do grupo
   * @returns array
   */
  static async getAnGroups(name, value) {
    let response = [];
    if (value.length > 3) {
      await API.get(`grupos/${value}`).then((result) => {
        if (result.status === 200) {
          response = result.data;
        }
      });
    }
    return response;
  }
}
