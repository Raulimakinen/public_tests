import axios from 'axios'
const baseUrl = '/api/persons'


const getAll= () => {
return axios.get(baseUrl)
.then(response=>response.data)
}
const create = (newObject) => {
return axios.post(baseUrl, newObject)
}
const update = (id, updatedPerson ) => {
return axios.put(`${baseUrl}/${id}`, updatedPerson)
}
const remove = (id) => {
return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    create,
    update,
    remove
}