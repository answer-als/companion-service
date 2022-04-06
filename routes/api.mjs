import express from 'express';
let router = express.Router();

import { getRecording, putRecording } from '../viewControllers/api/recording.mjs';
import { getProfile, putProfile, putProfile2 } from '../viewControllers/api/profile.mjs';
import { getSentence } from '../viewControllers/api/sentence.mjs';
import { getPicture } from '../viewControllers/api/picture.mjs';
import { getHealth } from '../viewControllers/api/public.mjs';

// RECORDING
router.put('/api/v1/recording/:userid/:hash', putRecording);
router.get('/api/v1/recording/:hash', getRecording);

// PROFILE
router.get('/api/v1/profile/:userid', getProfile);
router.put('/api/v1/profile/:userid', putProfile);
router.put('/api/v2/profile/:userid', putProfile2);

// SENTENCE
router.get('/api/v1/sentence/:userid', getSentence);

// PICTURE
router.get('/api/v1/picture/:userid', getPicture);

// PUBLIC
router.get('/api/v1/health', getHealth);

export default router;
