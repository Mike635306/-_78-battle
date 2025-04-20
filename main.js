const spinBtn = document.querySelector('#spin-btn');
const wheel = document.querySelector('.wheel');
const prizesWindow = document.querySelector('.prize');
const prizeimg = document.querySelector('#prize-img');
const asideItems = document.querySelector('.aside-items');
const coin = document.querySelector('#coin');

const musicPack = {
spin:'./audio/spin.mp3'

}



let wallet = 0;
let isSpinning = false;
let prizes = [
{src:'./assets/item2.png',name:'Doomsday Device',price:200},
{src:'./assets/item3.png',name:'Chaos Bringer',price:100},
{src:'./assets/item1.png',name:'Ironclad Justice',price:580},
{src:'./assets/item4.png',name:'Thunderstrike',price:105},
{src:'./assets/item5.png',name:'Shadow Reaper',price:190},
{src:'./assets/item6.png',name:'Frostbite Fury',price:700},
{src:'./assets/item7.png',name:'Blaze Cannon',price:500},
{src:'./assets/item8.png',name:'Venomous Viper',price:300},
{src:'./assets/item5.png',name:'Wraith s Whisper',price:200}

];

let lastItems = [];

prizes.reverse();

function spin(){
if(isSpinning){
console.log('колесо крутится');
return;
}

isSpinning = true;

let audio = new Audio(musicPack.spin);
let randomAngle = Math.floor(Math.random() * 8);


audio.play();
wheel.style.transition = 'transform 9s ease-out';
wheel.style.transform = `perspective(1000px) rotateY(${1080 + randomAngle*45}deg)`;

let timeout = setTimeout(()=>{
isSpinning = false;
wheel.style.transition = '';
wheel.style.transform = '';
clearTimeout(timeout);
prizeimg.src = prizes[randomAngle].src;
wallet+=prizes[randomAngle].price;
window.localStorage.setItem('wallet',wallet);
coin.innerText = wallet + '$';
prizesWindow.style.display = 'flex';
addLastItem(randomAngle);


},9000)

}
function addLastItem(randomAngle){
    asideItems.innerHTML = '';
if(lastItems.length < 5){
    lastItems.push(prizes[randomAngle]);
}else{
    lastItems.shift();
    lastItems.push(prizes[randomAngle]);
}
lastItems.forEach((item,imdex)=>{
let div = document.createElement('div');
div.classList.add('aside-item');
let p = document.createElement('p');
p.innerText = item.name;
let img = document.createElement('img');
img.src = item.src;
div.appendChild(img);
div.append(p);
asideItems.appendChild(div);

})

}

function init(){

if(window.localStorage.length > 0){

wallet = window.localStorage.getItem('wallet');
console.log(wallet);
coin.innerText = wallet + '$';
}



}
init(); //запуск функции


localStorage.clear();









spinBtn.addEventListener('click',spin);



prizesWindow.addEventListener('click',()=>{
    prizesWindow.style.display = 'none';
})




