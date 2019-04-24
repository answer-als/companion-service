import express from 'express';
let router = express.Router();

import { getHome } from '../viewControllers/home/home.mjs';

router.get('/', getHome);

export default router;
