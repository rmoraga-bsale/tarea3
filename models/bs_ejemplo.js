const ApiCall = require('../helpers/api_call');

class BsEjemplo {

  constructor() {
    // this.url = `${settings.BSALE_ADMIN_API}/v1/admin`
  }

  async getAll(accessToken = '') {
    try {
      return [
        {
          code: "200",
          data: [
            {
              id: 11844,
              cpnName: "Jaime",
              cpnLastName: "Gonzalez",
              phone: "4edb25269b56",
              type: "tipo1"
            },
            {
              id: 11844,
              cpnName: "Jaime",
              lastName: "Paredes",
              phone: "4edb25269b56",
              type: "tipo2"
            },
            {
              id: 11844,
              cpnName: "Gustavo",
              lastName: "Saavedra",
              phone: "4edb25269b56",
              type: "tipo1"
            }
            ]
          }
      ]
      // const url = `${this.url}/taxes.json`
      // const result = await ApiCall.request(url, 'GET', { access_token: accessToken })
      // if (result.status >= 200 && result.status < 400) {
      //   return result.data
      // }
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = BsEjemplo