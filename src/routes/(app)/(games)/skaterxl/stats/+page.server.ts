import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data } = await supabase.from('xl_stats').select('id, title, description, file_url, created_at, updated_at'); // Include file_url field
    return { stats: data ?? [] };
};

export const actions: Actions = {
    addStat: async ({ request, locals: { supabase } }) => { // Updated to 'addStat'
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        const { error } = await supabase.from('xl_stats').insert({ title, description });

        if (error) {
            return fail(500, { error: error.message });
        }

        return {};
    },
};