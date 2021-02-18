/*
Grilla del abecedario => array
palabra que juega => comand promt
el muñeco que ahorca= 6 intentos => variable numerica

Acciones:

ingresar una letra,
comparar lo que ingreso con lo que está.
aparecer en pantalla si esta
y tacharla del abecedario
y quitar intentos.
fin de juego.
*/
let palabras = ["Sonrojarse" , "Llaves", "Escuadra", "Obsequio" , "Cera", "Bicicleta", 
"Resbalar", "Virus", "telescopio", "dinosaurio"];

let palabra;

let wordMagic;

let magicArray;

let tries = 6;

let abecedario = ["A","B","C","D", "E", "F", "G",
"H", "I", "J", "K","L", "M", "N", "Ñ", "O", "P", "Q", "R",
"S", "T", "U", "V","W", "X", "Y", "Z"];

let containerAbc = document.getElementById("abc");

let vidas = document.getElementById("vidas");

let texto = document.getElementById("texto");

containerAbc.addEventListener("click",botoncinio);

renderazaoABC(abecedario);

pandoraSetUp(palabras);

renderJuego();

function laComparazao(letra, wordMagic){
	let hasWord = wordMagic.some(word => word == letra);
	if(hasWord){
		for(let word in wordMagic){
			if(letra == wordMagic[word]){
				magicArray[word] = letra;
			}
		}
	}else{
		tries = tries - 1;
	};
	abecedario = abecedario.filter(caracter => caracter != letra);
};

function playground(letra){
	if(tries > 0){
		laComparazao(letra, wordMagic);
		let magic = wordMagic.join(" ");
		let word = magicArray.join(" ");
		if(magic == word){
		alert("GANASTE PUTO");
		}
	}else{
		alert("PUTO INVERBE MANCO");
	}
	
};

function renderazaoABC(abecedario){

	for(let letra of abecedario){
		let button = document.createElement("button");
		button.value = letra;
		button.textContent = letra;
		button.classList.add("btn","btn-info");
		containerAbc.appendChild(button);
	}
};

	function botoncinio(evento){

		if(evento.target.classList.contains("btn-info")){
			evento.target.disabled = true;
			playground(evento.target.value);
			renderJuego();
		};

	}

	function renderJuego(){
		vidas.textContent = tries;
		texto.textContent = magicArray.join(' ');
	};

	function pandoraSetUp(palabras){
		let random = Math.floor(Math.random()*palabras.length);
		console.log(random);
		palabra = palabras[random].toUpperCase();
		wordMagic = palabra.split("");
		magicArray = '_'.repeat(palabra.length).split('');
	};