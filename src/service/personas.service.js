import http from "../http-common";

export class PersonasService {
    getAll() {
        return http.get("personas/list").then(res => res.data);

    }
    create(data) {
        return http.post("personas/save", data);
    }

    //   update(id, data) {
    //      return http.put(`personas/${id}`, data);
    //   }

    delete(id) {
        return http.delete(`personas/${id}`);
    }

}

export default new PersonasService();