import { Router } from 'express';
import { rentBook ,giveBackBook,getUserHistory} from '../controller/userBookRecController.js';
import { rentBookValidator ,giveBackBookValidator, getUserHistoryValidator} from '../middleware/userBookRecValidate.js';

export const router = Router();

router.post('/rent', rentBookValidator, rentBook);
router.post('/return', giveBackBookValidator, giveBackBook);
router.get('/:userId', getUserHistoryValidator,getUserHistory);


