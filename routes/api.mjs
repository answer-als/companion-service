import express from 'express';
let router = express.Router();

import { putRecording } from '../viewControllers/api/putRecording.mjs';
import { getRecording } from '../viewControllers/api/getRecording.mjs';
import { putProfile } from '../viewControllers/api/putProfile.mjs';
import { getSentence } from '../viewControllers/api/getSentence.mjs';
import { getPicture } from '../viewControllers/api/getPicture.mjs';

router.put('/api/v1/recording/:userid/:hash', putRecording);
router.get('/api/v1/recording/:hash', getRecording);
router.put('/api/v1/profile/:userid', putProfile);
router.get('/api/v1/sentence/:userid', getSentence);
router.get('/api/v1/picture/:userid', getPicture);

export default router;
