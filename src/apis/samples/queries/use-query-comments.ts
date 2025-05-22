import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/apis/samples/services/api-comments';

export const QUERY_KEY_COMMENTS = 'comments';

export const useQueryComments = (postId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY_COMMENTS, postId],
    queryFn: () => getComments(postId),
  });
};
