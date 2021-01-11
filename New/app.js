const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calcWealthBtn = document.getElementById('calculate-wealth')


let data = [];

// fetch random user and add money


async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()

    console.log(data);

    const user = data.results[0]

    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
    
}

//Double money function
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2};
    })

    updateDom()

}

//Sort function

function sortByRichest() {
    data.sort((a,b) => b.money - a.money);
    updateDom()
}

function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDom()
}

//Add all the numbers together

function calculateWealth() {
    const wealth = data.reduce((acc,user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)} </strong> </h3?`;
    main.appendChild(wealthEl)
}




//Add the new object to the data array 

function addData (obj){
    data.push(obj)

    updateDom()
}


//update Dom
function updateDom (providedData = data){
    //clear the main div
    main.innerHTML= '<h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach(item => { const element = document.createElement('div'); element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`
    main.appendChild(element)


    })
}

//Format number as money 

function formatMoney(number) {
   return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

}
 
//add random users to list 

addUserBtn.addEventListener('click', getRandomUser )
doubleBtn.addEventListener('click', doubleMoney )
sortBtn.addEventListener('click', sortByRichest )
showMillionairesBtn.addEventListener('click', showMillionaires )
calcWealthBtn.addEventListener('click', calculateWealth )

