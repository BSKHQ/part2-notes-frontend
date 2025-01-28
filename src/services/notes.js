import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        important: true,
      }
    return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
    const postRequest = axios.post(baseUrl, newObject)
    return postRequest.then(response => response.data)
}

const update = (id, newObject) => {
    const putRequest = axios.put(`${baseUrl}/${id}`, newObject)
    return putRequest.then(response => response.data)
}

export default {
    getAll,
    create,
    update
}