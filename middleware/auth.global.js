import { getUserSession } from '~/server/utils/session.cjs';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('auth_token').value;

  if (!token && to.path !== '/login') {
    return navigateTo('/login');
  }

  const session = await getUserSession(token);

  if (!session && to.path !== '/login') {
    return navigateTo('/login');
  }
});
