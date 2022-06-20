const complimentBtn = document.getElementById("complimentButton")

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)

const fortuneBtn = document.getElementById("fortuneButton")

const getFortunes = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

fortuneBtn.addEventListener('click', getFortunes)

const guardianContainer = document.getElementById("guardian-container")
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/guardian`

const guardianCallback = ({ data: guardian }) => displayGuardian(guardian)
const errCallback = err => console.log(err)


const getAllGuardians = () => axios.get(baseURL).then(guardianCallback).catch(errCallback)
const createGuardian = body => axios.post(baseURL, body).then(guardianCallback).catch(errCallback)
const deleteGuardian = id => axios.delete(`${baseURL}/${id}`).then(guardianCallback).catch(errCallback)
const updateGuardian = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(guardianCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let guardianClass = document.querySelector('#guardianClass')
    let subclass = document.querySelector('#subclass')
    let rating = document.querySelector('#rating')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        guardianClass: guardianClass.value,
        subclass: subclass.value, 
        rating: rating.value,
        imageURL: imageURL.value
    }

    createGuardian(bodyObj)

    guardianClass.value = ''
    subclass.value = ''
    rating.value = ''
    imageURL.value = ''
}

function createGuardianCard(guardian) {
    const guardianCard = document.createElement('div')
    guardianCard.classList.add('guardian-card')

    guardianCard.innerHTML = `<img alt='guardian cover image' src=${guardian.imageURL} class="guardian-cover-image"/>
    <p class="guardianClass">${guardian.guardianClass}</p>
    <p class="subclass">${guardian.subclass}</p>
    <div class="btns-container">
        <button onclick="updateGuardian(${guardian.id}, 'minus')">-</button>
        <p class="guardian-rating">${guardian.rating}</p>
        <button onclick="updateGuardian(${guardian.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGuardian(${guardian.id})">delete</button>
    `


    guardianContainer.appendChild(guardianCard)
}

function displayGuardian(arr) {
    guardianContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGuardianCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllGuardians()