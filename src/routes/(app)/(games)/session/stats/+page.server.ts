import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    try {
        const { data: stats, error } = await supabase
            .from('session_stats')
            .select(`
                id, 
                title, 
                description, 
                file_url, 
                created_at, 
                updated_at,
                profiles(username)
            `)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching stats:', error.message);
            return { stats: [] };
        }
        return { stats: stats ?? [] };
    } catch (error) {
        console.error('Unexpected error:', error instanceof Error ? error.message : error);
        return { stats: [] };
    }
};


export const actions: Actions = {
    addStat: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession();
        if (!session || !session.user) {
            return fail(401, { error: 'Authentication required' });
        }
        const userId = session.user.id;
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const files = formData.getAll('file') as File[];

        const publicURLs = [];
        // Create a unique timestamp for this upload session
        const uploadTimestamp = Date.now();

        for (const file of files) {
            // Include the userId and the uploadTimestamp in the folder path
            const filePath = `${userId}/${uploadTimestamp}/${file.name}`;
            try {
                const uploadResult = await supabase.storage
                    .from('session_stat_files')
                    .upload(filePath, file);
        
                if (uploadResult.error) throw uploadResult.error;
        
                const { data } = await supabase.storage
                    .from('session_stat_files')
                    .getPublicUrl(filePath);
        
                publicURLs.push(data.publicUrl);
            } catch (error) {
                console.error('Error with file upload or retrieval:', error instanceof Error ? error.message : error);
                return fail(500, { error: 'Failed to upload file or retrieve URL' });
            }
        }

        try {
            const { error: insertError } = await supabase.from('session_stats').insert({
                profile_id: userId,
                title,
                description,
                file_url: publicURLs, // Make sure this matches the column name in your database
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
