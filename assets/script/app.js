document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("btn_delete_all").addEventListener("click",function(){removeAllButtonClick()});
    document.getElementById("btn_limpar_campos" ).addEventListener("click",function(){cleanFieldsButtonClick()});
    document.getElementById("btn_add_user").addEventListener("click",function(){addUserButtonClick()});
    document.getElementById("input_search_user").addEventListener("input",function(){searchInputType(this.value)});
    
    refreshPageUsersList(getAllUsers());

    function searchInputType(text){
        if(text.trim() == ""){
            refreshPageUsersList(getAllUsers());
        }
        let users = getAllUsers();
        filteredUsers = users.filter(x=> (x.nome.trim().toUpperCase().indexOf(text.trim().toUpperCase()) != -1 || x.email.trim().toUpperCase().indexOf(text.trim().toUpperCase()) != -1));
        refreshPageUsersList(filteredUsers);
    }

    function uptadeLastId(){
        let id = parseInt(JSON.parse(localStorage.getItem("lastId")));
        id++;
        localStorage.setItem("lastId", (id).toString());
    };
    function getLastId() {
        let idText = localStorage.getItem("lastId");
        if (idText == null) {
            window.localStorage.setItem("lastId", "0");
            return 0;
        }
        let id = parseInt(JSON.parse(localStorage.getItem("lastId")));
        return id;
    };
    function addUser(objUser) {
        let users = getAllUsers();
        let usersFilter = users.filter(x=> (x.nome.trim().toUpperCase() == objUser.nome.trim().toUpperCase() && x.email.trim().toUpperCase() == objUser.email.trim().toUpperCase()));
        if(usersFilter.length > 0){
            alert("Usuário já cadastrado");
            cleanFieldsButtonClick();
        }else{
            users.push(objUser);
            localStorage.setItem("users",JSON.stringify(users));
            uptadeLastId();
        }

    };
    function removeUser(id) {
        let users = getAllUsers();
        localStorage.setItem("users",JSON.stringify(users.filter(x=>x.id.trim().toUpperCase() != id)));
    };

    function getAllUsers() {
        let users = JSON.parse(localStorage.getItem("users"));
        if(users == null || users == undefined){
            return [];
        }
        return users;

        /*
        let users = [];
        let keys = Object.keys(localStorage).filter(x => x != "lastId");
        for (let key of keys) {
            let obj = localStorage.getItem(key);
            users.push(JSON.parse(obj));
        }
        return users;*/
    };
    function removeAllUsers(){
        localStorage.clear();
    }

    //delete user button click "X"
    function removeButtonClick(element){
        let id = element.getElementsByClassName("id_information")[0].innerHTML;
        removeUser(id);
        refreshPageUsersList(getAllUsers());
    }

    function removeAllButtonClick(){
        removeAllUsers();
        refreshPageUsersList(getAllUsers());
    }

    function cleanFieldsButtonClick(){
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
    }

    function getCurrentDate(){
        let date = new Date();
        let dia = (date.getDate().toString().padStart(2,"0"));
        let mes = ((date.getMonth() + 1).toString().padStart(2,"0"));
        let ano = date.getFullYear().toString();
        return `${dia}/${mes}/${ano}`;
    }


    function addUserButtonClick() {
        //PEGA O NOME
        let inputNome = document.getElementById("nome").value;
        //PEGA O EMAIL
        let inputEmail = document.getElementById("email").value;
        if(inputNome.trim() == "" || inputEmail.trim() == ""){
            return "";
        }
        let user = {
            data: getCurrentDate(),
            id: (getLastId()+1).toString(),
            email: inputEmail,
            nome: inputNome
        };
        addUser(user);
        refreshPageUsersList(getAllUsers());
    }

    function cleanPageUsersList(){
        let lis = document.getElementsByClassName("users_list_item");
        for(let i = lis.length-1 ; i >= 0 ; i--){
            lis[i].parentNode.removeChild(lis[i]);
        }
    }


    function refreshPageUsersList(users) {
        cleanPageUsersList();
        for (let user of users) {
            let li = document.createElement("li");
            li.className = "users_list_item";

            //ID
            let spanId = document.createElement("SPAN");
            spanId.className = "id_information";
            let id = document.createTextNode(user.id);
            spanId.appendChild(id);
            li.appendChild(spanId);

            //DATA
            let spanData = document.createElement("SPAN");
            spanData.className = "list_information";
            let date = document.createTextNode(user.data);
            spanData.appendChild(date);
            li.appendChild(spanData);

            //NOME
            let spanNome = document.createElement("SPAN");
            spanNome.className = "list_information";
            let nome = document.createTextNode(user.nome);
            spanNome.appendChild(nome);
            li.appendChild(spanNome);
            //EMAIL
            let spanEmail = document.createElement("SPAN");
            spanEmail.className = "list_information";
            let email = document.createTextNode(user.email);
            spanEmail.appendChild(email);
            li.appendChild(spanEmail);

            //X
            let spanX = document.createElement("SPAN");
            spanX.className = "btn_remove_user";
            let x = document.createTextNode("\u00D7");
            spanX.appendChild(x);
            li.appendChild(spanX);

            document.getElementById("users_list").appendChild(li);
        }

        for(let i of document.querySelectorAll(".btn_remove_user")){
            i.addEventListener('click',function(){removeButtonClick(this.parentElement)});
        }

    }

})