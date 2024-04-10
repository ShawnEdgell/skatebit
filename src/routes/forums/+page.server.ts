import { error as kitError } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: stats, error: fetchError } = await supabase
      .from('forum_threads') // Updated table name
      .select('id, title, description, created_at, profile_id, profiles(username)')
      .order('created_at', { ascending: true });
  
    if (fetchError) {
      console.error('Error fetching stats:', fetchError.message);
      throw kitError(500, 'Failed to fetch stats');
    }
  
    // Return an empty array if no stats are found
    return { stats: stats ?? [] };
  };
  

export const actions: Actions = {
    addStat: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession();
        if (!session || !session.user) {
            throw kitError(401, 'Authentication required');
        }
        
        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');

        if (typeof title !== 'string' || typeof description !== 'string') {
            throw kitError(400, 'Invalid form data');
        }

        const { error: insertError } = await supabase.from('forum_threads').insert({
            profile_id: session.user.id,
            title,
            description,
        });

        if (insertError) {
            console.error('Error inserting new stat:', insertError.message);
            throw kitError(500, 'Failed to add new stat');
        }

        return {};
    },
};
