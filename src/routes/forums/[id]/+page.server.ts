import { error as kitError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    const { id } = params;

    const { data: thread, error: threadError } = await locals.supabase
        .from('forum_threads')
        .select(`
            id,
            title,
            description,
            created_at,
            profile_id,
            profiles(username)
        `)
        .eq('id', id)
        .single();

    if (threadError) {
        console.error('Error fetching thread:', threadError.message);
        throw kitError(500, 'Failed to fetch thread');
    }

    // Attempt to fetch comments
    const { data: comments, error: commentsError } = await locals.supabase
        .from('comments')
        .select('id, comment_text, profile(username)')
        .eq('thread_id', id);

    if (commentsError) {
        console.error('Error fetching comments:', commentsError.message);
        // Return the thread data with an empty array for comments
        return {
            thread,
            comments: [],
            session: locals.getSession ? await locals.getSession() : null // Fetch session only if necessary
        };
    }

    return {
        thread,
        comments: comments || [],
        session: locals.getSession ? await locals.getSession() : null // Fetch session only if necessary
    };
};
