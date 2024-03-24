// src/routes/skaterxl/stats/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
    const session = await getSession();

    // No need to redirect if session is null
    // Allow access to the stats page for both authenticated and unauthenticated users
    return { session };
};


export const actions = {
    // Handle file upload action
    upload: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession();

        // Check if session is null
        if (!session) {
            return { error: 'User not authenticated' };
        }

        const formData = await request.formData();

        // Extract form data
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const file = formData.get('file') as File;

        // Ensure file is present
        if (!file) {
            return { error: 'No file uploaded' };
        }

        // Upload file to Supabase storage
        const { error: uploadError } = await supabase.storage
            .from('skater_xl_zip_files')
            .upload(file.name, file);

        if (uploadError) {
            return { error: uploadError.message };
        }

        // Insert stats data into database
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

