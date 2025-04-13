import { getUserSession } from '~/server/utils/session.cjs';

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Retrieve session cookie (cookie containing session ID)
  const cookie = useCookie('session_id');
  
  // If there's no session cookie, redirect to login page (assuming the profile page is being accessed)
  if (!cookie.value && to.path.startsWith('/profile')) {
    return navigateTo('/login');
  }

  // Get session based on the session ID stored in the cookie (if it exists)
  const session = cookie.value ? getUserSession(cookie.value) : null;

  // If there's no session and the user is trying to access a protected profile page, redirect to login page
  if (!session && to.path.startsWith('/profile')) {
    return navigateTo('/login');
  }

  // If the route requires admin access but the user is not an admin, redirect to the not authorized page
  if (to.meta.requiresAdmin && session?.role !== 'admin') {
    return navigateTo('/not-authorized');
  }

  // Otherwise, allow navigation
});
