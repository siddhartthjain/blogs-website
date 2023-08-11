import express from 'express'
import {authMiddleware} from '../../Jwt/jwtStartegy';
import { postTags } from '../Services/tagsService';

const router = express.Router({mergeParams:true});

router.use(authMiddleware)
router.post('',postTags)

export default router