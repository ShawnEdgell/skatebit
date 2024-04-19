import { error as kitError } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: submissions, error: fetchError } = await supabase
        .from('xl_edits')
        .select('id, title, youtube_link, profile_id')
        .order('created_at', { ascending: true });

    if (fetchError) {
        console.error('Error fetching submissions:', fetchError.message);
        throw kitError(500, 'Failed to fetch submissions');
    }

    return { submissions: submissions ?? [] };
};

export const actions: Actions = {
    addSubmission: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession();
        if (!session || !session.user) {
            throw kitError(401, 'Authentication required');
        }

        const formData = await request.formData();
        const title = formData.get('title');
        const youtube_link = formData.get('youtube_link');

        if (typeof title !== 'string' || typeof youtube_link !== 'string') {
            throw kitError(400, 'Invalid form data');
        }

        const { error } = await supabase.from('xl_edits').insert({
            profile_id: session.user.id,
            title,
            youtube_link: youtube_link // Ensure the database field is 'youtube_link'
        });

        if (error) {
            console.error('Error inserting new submission:', error.message);
            throw kitError(500, 'Failed to add new submission');
        }
    },
};
