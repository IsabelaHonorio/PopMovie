import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ymogirjozvdkljpocegc.supabase.co';
const supabaseKey = 'sb_publishable_QmDlbaxB1IHhniTEtKUaXA_6oWiAOMt';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);