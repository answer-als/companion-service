import express from 'express';
let router = express.Router();

import { putRecording } from '../viewControllers/api/putRecording.mjs';
import { putProfile } from '../viewControllers/api/putProfile.mjs';
import { getSentence } from '../viewControllers/api/getSentence.mjs';
import { getPicture } from '../viewControllers/api/getPicture.mjs';

router.put('/api/v1/recording', putRecording);
router.put('/api/v1/profile', putProfile);
router.get('/api/v1/sentence', getSentence);
router.get('/api/v1/picture', getPicture);

export default router;
