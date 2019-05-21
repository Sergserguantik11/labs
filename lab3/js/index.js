// Задание 1.
// Функция должна создать элемент с тегом DIV, 
// поместить в него текстовый узел и вернуть получившийся элемент
 
 function getTextFromForm(){
 	var text = document.getElementById('text').value;
 	createDivWithText(text);
 }
 
function createDivWithText(text) {
	var divElement = document.createElement('div');
	var textElem = document.createTextNode(text);
	divElement.appendChild(textElem);
	document.body.appendChild(divElement);
}

// Функция должна отслеживать добавление и удаление элементов внутри элемента where. 
// Как только в where добавляются или удаляются элементы,
// необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом. 
// В качестве аргумента должен быть передан объек с двумя свойствами:
//   - type: типа события (insert или remove)
//   - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
//  Отслеживание должно работать вне зависимости от глубины 
// создаваемых/удаляемых элементов

//  Рекомендуется использовать MutationObserver
//  @param {Element} where - где отслеживать
//  @param {function(info: {type: string, nodes: Array<Element>})} 
// fn - функция, которую необходимо вызвать

//  @example
//  если в where или в одного из его детей добавляется элемент div
 // то fn должна быть вызвана с аргументов:
//  {
//   type: 'insert',
//   nodes: [div]
//  }

// если из where или из одного из его детей удаляется элемент div 
// то fn должна быть вызвана с аргументов:
// {
//   type: 'remove',
//   nodes: [div]
//  }


function subscriber(mutations) {//обработчик добавления и удаления
	var add = [], remove = [];
	mutations.forEach((mutation) => {
	  	if(mutation.addedNodes.length > 0) {
	  		mutation.addedNodes.forEach((node) => {//добавление
	  			add.push("<" + node.nodeName + ">");
	  		});
	  	}
	  	if(mutation.removedNodes.length > 0) {
	  		mutation.removedNodes.forEach((node) => {//удаление
	  			remove.push("<" + node.nodeName + ">");
	  		});
	  	}
	  });
	if(add.length > 0) console.log("Вставка\n" + add);//инфа в консоль
	if(remove.length > 0 ) console.log("Удаление\n" + remove);
}

function observeChildNodes(where, fn) {//создаёт объект и проверяет мутацию
	options = {
    'childList': true,
    'subtree': true
	}
	mo = new MutationObserver(fn),
	mo.observe(where, options);
}

var element = document.getElementById('where');//создаём элемент и вызываем функцию
observeChildNodes(element, subscriber)


function createSomeElements(n) {//вставка элементов
	var element = document.getElementById('where');
	for(var i = 0; i < n; i++){
		var newDiv = document.createElement("div");
        newDiv.innerHTML = "<h1>Salam!</h1>";
		element.appendChild(newDiv);
	}
}

function removeSomeElements(n) {//удаление элементов
	var elements = document.getElementById('where').getElementsByTagName("div");
	var matches = [];
	if(n > elements.length){
		n = elements.length;
	}
	for (var i = 0; i < n; i++){
		elements[i].remove();
	}
}

createSomeElements(3);//вызов
removeSomeElements(1);

// Задание 3
//  Функция должна добавлять обработчик fn события eventName 
// к элементу target
 // @param {string} eventName - имя события, на которое нужно добавить обработчик
 // @param {Element} target - элемент, на который нужно добавить обработчик
 // @param {function} fn - обработчик
function addListener(eventName, target, fn) {//обработчик
	target.addEventListener(eventName, fn);
	return target;
}

function display(){//вывод
	alert("TagName = " + this.nodeName + "\n Text = " + this.innerHTML);
}

function remove(){//удаление
	this.remove();
}

function addClone(){//клонирование
	var cln = this.cloneNode(true)
	document.body.appendChild(cln);
}

var element = document.getElementById('remove');//вызов функции
addListener("click", element, display);