import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'utils/supabaseClient';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return supabase.auth.api.setAuthCookie(req, res);
}
