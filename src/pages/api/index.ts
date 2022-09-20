// pages/api/hello.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';

type Data = {
  name: string;
};

type ErrorRep = {
  error: string;
};
const router = createRouter<NextApiRequest, NextApiResponse<Data | ErrorRep>>();
router
  .use(expressWrapper(cors())) // express middleware are supported if you wrap it with expressWrapper
  .get((req, res) => {
    res.json({ name: 'Worst Blog APP' });
  });

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
