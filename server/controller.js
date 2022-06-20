const guardian = require('./bd.json')
let globalId = 4

module.exports = { 
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortunes: (req, res) => {
        const fortunes = ["A beautiful, smart, and loving person will be coming into your life.", "A dubious friend may be an enemy in camouflage. shirt!", "A faithful friend is a strong defense.", "A fresh start will put you on your way.","A friend asks only for your time not your money."];
      
        // choose random compliment
        let randomIndex1 = Math.floor(Math.random() * fortunes.length);
        let randomFortunes = fortunes[randomIndex1];
      
        res.status(200).send(randomFortunes);
    },

    getGuardian: (req, res) => {res.status(200).send(guardian)},

    createGuardian: (req, res) => {
        let { guardianClass, subclass, rating, imageURL } = req.body
        let newGuardian = {
            "id": globalId,
            "guardianClass": guardianClass,
            "subclass": subclass,
            "rating": rating,
            "imageURL": imageURL
        }
        guardian.push(newGuardian)
        res.status(200).send(guardian)
        globalId++
    },
    deleteGuardian: (req, res) => {
        let index = guardian.findIndex(elem => elem.id === +req.params.id)
        guardian.splice(index, 1)
        res.status(200).send(guardian)
    },
    updateGuardian: (req, res) => {
        let { type } = req.body
        let index = guardian.findIndex(elem => elem.id === +req.params.id)

        if (type === 'minus' && guardian[index].rating >= 1) {
            guardian[index].rating -= 1;
            res.status(200).send(guardian);
        } else if(type === 'plus' && guardian[index].rating < 10) {
            guardian[index].rating += 1;
            res.status(200).send(guardian);
        } else {
            res.status(400).send('Invalid rating');
        }

    },
    

}