import Cookies from 'js-cookie';

export const useAuth = () => {
  const api = process.env.NEXT_PUBLIC_BACKAPI_URL

  const login = async (email: string, password: string) => {

    try {
      const response = await fetch(`${api}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Importante para incluir las cookies
      });

      const data = await response.json();
      if (data.success) {
        Cookies.set('status', true.toString(), { expires: 7 });
        location.reload()
      } else {
        console.log('Autenticación fallida:', data.message);
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error);
    }
  };

  return {
    login,
  };
};
