import API_URL from '../environment.js';

const API_BASE_URL = API_URL;

export async function checkIsAdmin(username, password) {
  try {
      const response = await fetch(`${API_BASE_URL}?page=checkIsAdmin`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          credentials: 'include',
      });

      const data = await response.json();
      return data;
  } catch (error) {
      console.error(error);
      throw new Error('Er was een probleem bij het ophalen van de data.');
  }
}

export async function adminSession(){
    try {
        const response = await fetch(`${API_BASE_URL}?page=adminSession`, {
          credentials: 'include',
          method: 'GET',
        });
        const data = response.json();

        return data;
      } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de data. Probeer deze link: https://www.ksaoosterzele.be/admin');
      }
}

export async function logout(){
  try {
      const response = await fetch(`${API_BASE_URL}?page=removeSession`, {
        credentials: 'include',
        method: 'GET',
      });
      const data = response.json();
      window.location.reload();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Er was een probleem bij het ophalen van de data. Probeer deze link: https://www.ksaoosterzele.be/admin');
    }
}