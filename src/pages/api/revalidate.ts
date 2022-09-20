import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';

type ErrorRep = {
  error: string;
};
type RevalidResp = {
  revalidated: boolean;
};
const router = createRouter<
  NextApiRequest,
  NextApiResponse<RevalidResp | ErrorRep>
>();
router.use(expressWrapper(cors())).post(async (req, res) => {
  const { path } = await req.body.json();

  try {
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({
      error: (err as Error).message,
    });
  }
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
