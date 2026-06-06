import { supabase } from '../utils/setupDatabase.mts';
import { dbResponse } from '../utils/dbResponse.mts';

export default async () => {
  const { data, error } = await supabase.from('phase_members').select('*');
  return dbResponse({ data, error });
};
