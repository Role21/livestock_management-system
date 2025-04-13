export const useAuth = () => {
  const session = useState('session', () => null);

  // Fetch session to check if the user is authenticated
  async function fetchSession() {
    const cookie = useCookie('auth_token');  // Fetch the auth token from cookies
    if (!cookie.value) {
      session.value = null;  // No token, set session as null
      return;
    }

    try {
      // Call /api/auth/check-session to check the session status
      const { authenticated, user } = await $fetch('/api/auth/check-session');

      // Update session based on response
      if (authenticated && user) {
        session.value = user;  // Store user data in session
      } else {
        session.value = null;  // No valid session
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
      session.value = null;  // In case of error, set session as null
    }
  }

  return {
    session,
    fetchSession,
    isAdmin: computed(() => session.value?.role === 'admin'),  // Check if user is admin
  };
};
