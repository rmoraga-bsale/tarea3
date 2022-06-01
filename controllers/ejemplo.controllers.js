const BsEjemplo = require('../models/bs_ejemplo')

exports.getAll = async function(req, res) {
  try {
    const bsEjemplo = new BsEjemplo()
    const response = await bsEjemplo.getAll()
    console.log('response', response)
    res.json(response)
  } catch (error) {
    console.error(error)
  }
}