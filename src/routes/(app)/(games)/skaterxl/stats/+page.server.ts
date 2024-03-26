import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    try {
        const { data: stats, error } = await supabase
            .from('xl_stats')
            .select(`
                id, 
                title, 
                description, 
                file_url, 
                created_at, 
                profiles(username)
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching stats:', error.message);
            return { stats: [] };
        }

        console.log(stats); // Add this line to inspect the returned data structure
        return { stats: stats ?? [] };
    } catch (error) {
        console.error('Unexpected error:', error instanceof Error ? error.message : error);
        return { stats: [] };
    }
};


export const actions: Actions = {
    addStat: async ({ request, locals: { supabase, getSession } }) => { // Make sure getSession is available and used
        const session = await getSession();
        if (!session || !session.user) {
            return fail(401, { error: 'Authentication required' }); // Ensures user is logged in
        }
        const userId = session.user.id;
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const file = formData.get('file') as File;

        let publicURL = '';

        if (file) {
            const filePath = `/${Date.now()}_${file.name}`;
            try {
                const uploadResult = await supabase.storage
                    .from('xl_stat_files')
                    .upload(filePath, file);

                if (uploadResult.error) throw uploadResult.error;

                const { data } = await supabase.storage
                    .from('xl_stat_files')
                    .getPublicUrl(filePath);

                publicURL = data.publicUrl;
            } catch (error) {
                console.error('Error with file upload or retrieval:', error instanceof Error ? error.message : error);
                return fail(500, { error: 'Failed to upload file or retrieve URL' });
            }
        }

        try {
            const { error: insertError } = await supabase.from('xl_stats').insert({
                profile_id: userId,
                title,
                description,
                file_url: publicURL,
            });

            if (insertError) {
                console.error('Error inserting new stat:', insertError.message);
                return fail(500, { error: 'Failed to add new stat' });
            }
        } catch (error) {
            console.error('Unexpected error inserting new stat:', error instanceof Error ? error.message : error);
            return fail(500, { error: 'Unexpected error occurred' });
        }

        return {};
    },
};
