document.addEventListener("DOMContentLoaded", function (event) {

    for(let i of document.querySelectorAll(".btn_remove_user")){
        i.addEventListener('click',function(){removeButtonClick(this.parentElement)});
    }

    /*
    TESTE
    window.localStorage.clear();
    let teste1 = {
        email: "exemplo@teste",
        nome: "daniel"
    };
    let teste2 = {
        email: "exemplo@teste2",
        nome: "felipe"
    };
    let teste3 = {
        email: "exemplo@teste2",
        nome: "daniela"
    }
    let teste4 = {
        email: "exemplo@teste2",
        nome: "pedro"
    };
    window.localStorage.setItem("1", JSON.stringify(teste1));
    window.localStorage.setItem("2", JSON.stringify(teste2));
    window.localStorage.setItem("3", JSON.stringify(teste3));
    window.localStorage.setItem("6", JSON.stringify(teste4));
    window.localStorage.setItem("lastId", "6");

    console.log(getAllUsers());*/

    function uptadeLastId(){
        let id = parseInt(JSON.parse(localStorage.getItem("lastId")));
        id++;
        localStorage.setItem("lastId", (id).toString());
    };
    function getLastId() {
        let id = parseInt(JSON.parse(localStorage.getItem("lastId")));
        return id;
    };
    function addUser(objUser) {
        let json = JSON.stringify(objUser);
        localStorage.setItem(getLastId() + 1, json);
        uptadeLastId();
    };
    function removeUser(id) {
        localStorage.removeItem(String(id));
    };
    function getUserById(id) {
        let obj = JSON.parse(localStorage.getItem(String(id)));
        return obj;
    };
    function getAllUsers() {
        let users = [];
        let keys = Object.keys(localStorage).filter(x => x != "lastId");
        for (let key of keys) {
            let obj = localStorage.getItem(key);
            users.push(JSON.parse(obj));
        }
        return users;
    };
    function removeAllUsers(){
        localStorage.clear();
    }

    function removeButtonClick(element){
        console.log(element);
        console.log("TESTE");
    }

    function refreshList(){}

})