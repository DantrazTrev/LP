// pages/api/hello.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { IComment } from '../../../../../data';
import { getCommentsbyPost } from '../../../../utils/helperdb';

type ErrorRep = {
  error: string;
};
const router = createRouter<
  NextApiRequest,
  NextApiResponse<IComment[] | ErrorRep>
>();
router.use(expressWrapper(cors())).get((req, res) => {
  const { postId } = req.query;
  const comment = getCommentsbyPost(Number(postId));
  res.json(comment);
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
