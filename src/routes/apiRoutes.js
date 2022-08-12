const router = express.Router();
const donationController = require("../controller/donationController")
const institutionController = require("../controller/institutionController")

router.get('/',donationController.statusReturn)
router.post('/donation',donationController.donation)
router.get('/donation',donationController.getDonations)
router.post('/institution',institutionController.insitution)
router.get('/institution', institutionController.getInstitutions)

module.exports = router
