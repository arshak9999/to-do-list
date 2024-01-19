const ToDoListApi = {
    getToDoLists()
    {
        return axios.get( '/to-do-lists/all');
    },
    getToDoListItem(id)
    {
        return axios.get( `/to-do-list/${id}`);
    },
    addToDoListItem(data)
    {
        return axios.post( `/to-do-list`, data);
    },
    updateToDoListItem(id, data)
    {
        return axios.put( `/to-do-list/${id}`, data);
    },
    deleteToDoListItem(id)
    {
        return axios.delete( `/to-do-list/${id}`);
    }
}
 export default ToDoListApi;
