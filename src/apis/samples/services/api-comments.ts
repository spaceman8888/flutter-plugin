import { api } from "@/apis/_common/api-client";

export const getComments = async (postId: number) =>
    api.getApi(`/posts/${postId}/comments`)