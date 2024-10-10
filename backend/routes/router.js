const express = require('express');
const router = express.Router();
const auth= require('../middleware/auth')

const userController = require('../controllers/userController');
const pharmacieController = require('../controllers/pharmacieController');
const medicamentController = require('../controllers/medicamentController');

router.get('/', (req, res) => {
    res.send('test toto 12134');
});

// User routes
router.post('/login',userController.login)


// Pharmacie routes
router.get('/pharmacies',pharmacieController.getAllPharmacie); 
//route pour obtenir les pharmacies qui possèdent un médicament en particulier
router.post('/pharmacies/search/:search',pharmacieController.getPharmacieByMedicament); 
///getbyId
router.get('/pharmacies/:id',pharmacieController.getPharmacieById); 
// le stock de la pharmacie
router.get('/pharmacies/stock/:id',pharmacieController.getStock); 

// , auth.validateToken
//autocompletion sur le nom du médicament
router.post('/medicament/search/:search',medicamentController.autocompleteMedicament); 
//updateQuantite
router.post('/medicament/quantite',medicamentController.updateQuantite); 
router.get('/medicament/get',medicamentController.getMedic); 




module.exports = router;
