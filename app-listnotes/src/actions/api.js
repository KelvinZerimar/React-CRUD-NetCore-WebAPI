import axios from "axios";
const baseUrl = "https://noteapidemo.azurewebsites.net/"

export default {

    dNote(url = baseUrl + 'api/note/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}
