export const useAuth = () => {
    const session = useState('session', () => null);
  
    async function fetchSession() {
      const cookie = useCookie('session_id');
      if (!cookie.value) return;
      const res = await $fetch('/api/auth/session');
      session.value = res.user;
    }
  
    return {
      session,
      fetchSession,
      isAdmin: computed(() => session.value?.role === 'admin'),
    };
  };