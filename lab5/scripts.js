'use strict';
(function () {
    let resultDiv =  document.getElementsByClassName('result')[0];
    let Model = {//вызов метода для авторизации
        login(appId, params) {
            return new Promise((resolve) => {
                VK.init({ apiId: appId });

                VK.Auth.login(response => {
                    response.session ? resolve(response) : console.error('Auth error!');//проверка на ошибку
                }, params)
            });
        },

        callApi(method, params) {//функция вызова ВКшных методов
            return new Promise((resolve, reject) => {
                VK.api(method, params, response => {
                    if (response.error) { reject(new Error(response.error)); }//проверка на ошибку
                    else { resolve(response.response);}
                });
            });
        },

        getUser() { return this.callApi('users.get', {"v":"any", 'name_case': 'gen'}, ); },//мои данные
        getFriends() { return this.callApi('friends.get', {fields: 'photo_max', "v":"any"}); },//друзья
        getNews() { return this.callApi('wall.get', {filters: 'owner', count: 100, "v":"any"}); },//посты
        getGroups() { return this.callApi('groups.get', {filters: 'owner', count: 100, "v":"any"}); },//группы
        getGroupsById(id) { return this.callApi('groups.getById', {fields: 'description', "v":"any", group_ids: id}); },
    };
    let View = {//функция вывода
        render(templateName, model) {
            templateName = templateName + 'Template';

            let templateElement = document.getElementById(templateName),
                templateSourse = templateElement.innerHTML,
                renderFn = Handlebars.compile(templateSourse);

            return renderFn(model);
        }
    };
    let Controller = {//вывод конкретных данных
        friendsRoute() {
            return Model.getFriends().then(friends=>{//друзья
                resultDiv.innerHTML = View.render('friends', {list: friends});
            });
        },
        newsRoute() {
            return Model.getNews().then(news=>{//посты
                resultDiv.innerHTML = View.render('news', {list: news});
            });
        },
        groupRoute() {//группы
            return new Promise (resolve => {
                Model.getGroups().then(groups=>{
                    let groupObjectList = '';

                    for(let i=1; i < groups.length; i++)
                        groupObjectList += groups[i] + ', ';

                    resolve(Model.getGroupsById(groupObjectList.slice(0, groupObjectList.length - 2)));
                });
            }).then(groupList => {
                resultDiv.innerHTML = View.render('group', {list: groupList});
            });
        },
    };
    let Router = {//вызывает вывод по названию данных
        handle(route){
            let routeName = route + 'Route';
            Controller[routeName]();
        }
    };
    new Promise (resolve => {//главная авторизация
        window.onload = resolve;
    }).then(() => {
        return Model.login(6939790, 2 | 2048 | 8192 | 262144 | 14);//логин
    }).then(() => {
        return Model.getUser().then(user => {//мои данные
            document.getElementById('header').innerHTML = View.render('header', user[0]);
        });
    }).catch(error => console.error(error));//проверка на ошибку
    document.getElementsByClassName('wrapper')[0].addEventListener('click', event => {
        event.target.dataset.info ? Router.handle(event.target.dataset.info): false;
    });
})();