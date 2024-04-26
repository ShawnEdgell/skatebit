import { error as kitError } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: submissions, error: fetchError } = await supabase
        .from('xl_edits')
        .select(`
            id,
            title,
            youtube_link,
            profile_id,
            created_at,
            profiles(username),
            xl_reactions!inner(*)
        `)
        .order('created_at', { ascending: false });

    if (fetchError) {
        console.error('Error fetching submissions:', fetchError.message);
        throw kitError(500, 'Failed to fetch submissions');
    }

    // Count reactions for each submission
    const submissionsWithReactions = submissions.map(submission => {
        const reaction_count = submission.xl_reactions ? submission.xl_reactions.length : 0;
        return { ...submission, reaction_count };
    });

    return { submissions: submissionsWithReactions };
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
            youtube_link: youtube_link
        });

        if (error) {
            console.error('Error inserting new submission:', error.message);
            throw kitError(500, 'Failed to add new submission');
        }
    },

    addReaction: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession();
        if (!session || !session.user) {
            throw kitError(401, 'Authentication required');
        }

        const formData = await request.formData();
        const submission_id = formData.get('submission_id');

        if (typeof submission_id !== 'string') {
            throw kitError(400, 'Invalid form data');
        }

        const { error } = await supabase.from('xl_reactions').upsert({
            submission_id: parseInt(submission_id),
            profile_id: session.user.id,
            type: 'fire'
        }, {
            onConflict: 'submission_id, profile_id'
        });

        if (error) {
            console.error('Error inserting reaction:', error.message);
            throw kitError(500, 'Failed to add reaction');
        }
    },
};
