import { Router } from 'express';
import { rentBook ,giveBackBook,getUserHistory} from '../controller/userBookRecController.js';
import { rentBookValidator ,giveBackBookValidator, getUserHistoryValidator} from '../middleware/userBookRecValidate.js';
import { validateToken } from '../middleware/protect.js'; 


export const router = Router();

router.post('/rent',validateToken, rentBookValidator, rentBook);
router.post('/return', validateToken,giveBackBookValidator, giveBackBook);
router.get('/:userId', validateToken,getUserHistoryValidator,getUserHistory);


