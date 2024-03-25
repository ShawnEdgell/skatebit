import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data } = await supabase.from('xl_stats').select('id, name');
    return { countries: data ?? [] };
};


export const actions: Actions = {
    addCountry: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const name = formData.get('name') as string;

        const { error } = await supabase.from('xl_stats').insert({ name });

        if (error) {
            return fail(500, { name });
        }

        return { name };
    },
};