import express from 'express';
let router = express.Router();

import { getRecording, putRecording } from '../viewControllers/api/recording.mjs';
import { getProfile, putProfile } from '../viewControllers/api/profile.mjs';
import { getSentence } from '../viewControllers/api/sentence.mjs';
import { getPicture } from '../viewControllers/api/picture.mjs';

// RECORDING
router.put('/api/v1/recording/:userid/:hash', putRecording);
router.get('/api/v1/recording/:hash', getRecording);

// PROFILE
router.get('/api/v1/profile/:userid', getProfile);
router.put('/api/v1/profile/:userid', putProfile);

// SENTENCE
router.get('/api/v1/sentence/:userid', getSentence);

// PICTURE
router.get('/api/v1/picture/:userid', getPicture);

export default router;
