// pages/api/hello.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { IPost } from '../../../../data';
import { getPost } from '../../../utils/helperdb';

type ErrorRep = {
  error: string;
};
const router = createRouter<
  NextApiRequest,
  NextApiResponse<IPost | ErrorRep>
>();
router.use(expressWrapper(cors())).get((req, res) => {
  const { id } = req.query;
  const post = getPost(Number(id));
  if (post !== undefined) res.json(post);
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
