import './style.css';
let showAllButton = document.getElementById('showAll');
let showAllABCButton = document.getElementById('showAllABC');
let contactButton = document.getElementById('contact');
let weightButton = document.getElementById('weight');
let brownEyesButton = document.getElementById('brownEyes');

let osszesSuly;

function adatMegjelenites(adatlista){
    let lista = document.getElementById('persons');
    for (let p of adatlista){ 
        let li = document.createElement('li');
        li.textContent = p.firstName + " " + p.lastName;
        lista.appendChild(li);
    }
}

function contactMegjelenites(contactList){
    let contactlista = document.getElementById('contacts');
    for(let u of contactList){
        let tr = document.createElement('tr');
        let tdusername = document.createElement('td');
        let tdemail = document.createElement('td');
        let tdphone = document.createElement('td');
        
        tdusername.textContent =  u.username;
        tdemail.textContent =  u.email;
        tdphone.textContent =  u.phone;
        
        contactlista.appendChild(tr);
        contactlista.appendChild(tdusername);
        contactlista.appendChild(tdemail);
        contactlista.appendChild(tdphone);      
    }
}



document.addEventListener('DOMContentLoaded', async () => {
    showAll.addEventListener('click', async () => {
        let response = await fetch('/users.json'); //adatletöltés, awaittel várakoztat
        let eredmeny = await response.json();
        let emberek = eredmeny.users;
        adatMegjelenites(emberek);
    })

    showAllABCButton.addEventListener('click', async () => {
        let response = await fetch('/users.json'); //adatletöltés, awaittel várakoztat
        let eredmeny = await response.json();
        let emberek = eredmeny.users;
        let abcEmberek =  eredmeny.users.sort(function(a,b){
            if(a.firstName.toLowerCase() < b.firstName.toLowerCase()){
                return -1;
            }
            else if(a.firstName.toLowerCase() > b.firstName.toLowerCase()){
                return 1;
            }
            else{
                return 0;
            }
        })
        adatMegjelenites(abcEmberek);
    })

    contactButton.addEventListener('click', async () => {
        let response = await fetch('/users.json'); //adatletöltés, awaittel várakoztat
        let eredmeny = await response.json();
        let emberek = eredmeny.users;
        contactMegjelenites(emberek);
    })

    weightButton.addEventListener('click', async () => {
        let inputheight = document.getElementById('inputheight').value;
        let response = await fetch('/users.json'); //adatletöltés, awaittel várakoztat
        let eredmeny = await response.json();
        let adatok = eredmeny.users.filter(e=>e.height>inputheight);
        let suly = 0;
        for(let u of adatok){
             suly+=u.weight;
          
        }  document.getElementById('weights').textContent = suly; 
         
    })

    brownEyesButton.addEventListener('click', async () => {
        let inputheight = document.getElementById('inputheight').value;
        let response = await fetch('/users.json'); //adatletöltés, awaittel várakoztat
        let eredmeny = await response.json();
        let adatok = eredmeny.users.filter(e=>e.eyeColor=="Brown");
        let listahossz = adatok.length;
        document.getElementById('eyes').textContent = listahossz; 
         
    })

    
})