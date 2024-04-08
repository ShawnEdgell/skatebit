import { error as kitError } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: stats, error: fetchError } = await supabase
        .from('xl_stats')
        .select('id, title, description, file_url, created_at, updated_at, profiles(username)')
        .order('created_at', { ascending: true });

    if (fetchError) {
        console.error('Error fetching stats:', fetchError.message);
        throw kitError(500, 'Failed to fetch stats');
    }

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
        const file = formData.get('file');

        if (typeof title !== 'string' || typeof description !== 'string' || !(file instanceof File)) {
            throw kitError(400, 'Invalid form data');
        }

        let publicURL = '';
        
        if (file) {
            const filePath = `/${Date.now()}_${file.name}`;
            const { error: uploadError } = await supabase.storage
                .from('xl_stat_files')
                .upload(filePath, file);

            if (uploadError) throw kitError(500, 'Failed to upload file');

            // Correctly handle the getPublicUrl response
            const { data: urlData } = await supabase.storage
                .from('xl_stat_files')
                .getPublicUrl(filePath);

            // Assuming publicUrl is correctly included in urlData based on Supabase's response
            publicURL = urlData.publicUrl;
        }

        const { error: insertError } = await supabase.from('xl_stats').insert({
            profile_id: session.user.id,
            title,
            description,
            file_url: publicURL,
        });

        if (insertError) {
            console.error('Error inserting new stat:', insertError.message);
            throw kitError(500, 'Failed to add new stat');
        }

        return {};
    },
};
