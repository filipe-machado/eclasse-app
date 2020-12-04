import API from '../api';

export default class UserService {
  constructor() {
    this.response = [];
  }

  /**
   * Função que registra um usuário
   * @returns array
   */
  static async userRegister(data) {
    const response = await API.post('usuarios', { data })
      .then((res) => res.data);
    return response;
  }
}
