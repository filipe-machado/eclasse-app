import API from '../api';

export default class InstitutionService {
  constructor() {
    this.response = [];
  }

  /**
   * Função que retorna uma lista com todas as instituições
   * @returns array
   */
  static async getAllInstitutions() {
    const response = await API.get('instituicoes')
      .then((res) => res.data);
    return response;
  }

  /**
   * Função que retorna uma lista de instituição à partir de uma string de busca
   * @param {String} name conteúdo da tag name
   * @param {String} value nome da instituição
   * @returns array
   */
  static async getAnInstitutions(name, value) {
    let response = [];
    if (value.length > 3) {
      await API.get(`instituicoes/${value}`).then((result) => {
        if (result.status === 200) {
          response = result.data;
        }
      });
    }
    return response;
  }
}
