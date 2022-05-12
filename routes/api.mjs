import express from 'express';
let router = express.Router();

import { getRecording, putRecording } from '../viewControllers/api/recording.mjs';
import { getProfile, putProfile, putProfile2 } from '../viewControllers/api/profile.mjs';
import { getSentence, getSentence2 } from '../viewControllers/api/sentence.mjs';
import { getPicture, getPicture2 } from '../viewControllers/api/picture.mjs';
import { getHealth } from '../viewControllers/api/public.mjs';
import { putRoads } from '../viewControllers/api/roads.mjs';

// RECORDING
router.get('/api/v1/recording/:hash', getRecording);
router.put('/api/v1/recording/:userid/:hash', putRecording);

// PROFILE
router.get('/api/v1/profile/:userid', getProfile);
router.put('/api/v1/profile/:userid', putProfile);
router.put('/api/v2/profile/:userid', putProfile2);

// SENTENCE
router.get('/api/v1/sentence/:userid', getSentence);
router.get('/api/v2/sentence/:userid', getSentence2);

// PICTURE
router.get('/api/v1/picture/:userid', getPicture);
router.get('/api/v2/picture/:userid', getPicture2);

// PUBLIC
router.get('/api/v1/health', getHealth);

// ROADS
router.put('/api/v1/roads', putRoads);

export default router;
