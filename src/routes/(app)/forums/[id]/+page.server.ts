import { error as kitError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    const { id } = params;

    try {
        console.log('Fetching thread with ID:', id); // Log thread ID
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

        console.log('Thread fetched successfully:', thread); // Log thread data

        // Fetch comments
        console.log('Fetching comments for thread:', id); // Log thread ID for comments
        const { data: comments, error: commentsError } = await locals.supabase
            .from('comments')
            .select('id, comment_text, profiles(profile_id, username)')
            .eq('thread_id', id);

        if (commentsError) {
            console.error('Error fetching comments:', commentsError.message);
            return {
                thread,
                comments: [],
                session: locals.getSession ? await locals.getSession() : null
            };
        }

        console.log('Comments fetched successfully:', comments); // Log comments data
        return {
            thread,
            comments: comments || [],
            session: locals.getSession ? await locals.getSession() : null
        };
    } catch (error) { // Explicitly type error as 'Error'
        console.error('Error in server-side load:', (error as Error).message);
        throw kitError(500, 'Internal Server Error');
    }
};

