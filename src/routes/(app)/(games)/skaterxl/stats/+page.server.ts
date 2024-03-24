import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
    const session = await getSession();
    if (!session) {
        return { session };
    }

    // Fetch stats data from Supabase
    const { data: stats, error } = await supabase.from('skater_xl_stats').select('*').eq('user_id', session.user.id);

    if (error) {
        console.error('Error fetching stats data:', error.message);
        return { session };
    }

    return { session, stats };
};

export const actions = {
    upload: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession();
        if (!session) {
            return { error: 'User not authenticated' };
        }

        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const file = formData.get('file') as File;

        if (!file) {
            return { error: 'No file uploaded' };
        }

        const { error: uploadError } = await supabase.storage
            .from('skater_xl_zip_files')
            .upload(file.name, file);

        if (uploadError) {
            return { error: uploadError.message };
        }

        const { error: insertError } = await supabase.from('skater_xl_stats').insert([
            {
                user_id: session.user.id,
                title,
                description,
                zip_file_url: file.name,
            },
        ]);

        if (insertError) {
            return { error: insertError.message };
        }

        return { success: true };
    },
};
