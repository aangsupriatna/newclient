import Cookies from 'js-cookie';

export async function getAuth( authState, mutate) {
  console.log(authState)
  if (!authState) {
    const token = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    if (token && refreshToken) {
      return { token, refreshToken };
    }
    return null;
  }

  const refreshMutation = `
  mutation getRefreshTokens($token: String){
    refreshTokens(token: $token){
      accessToken
      refreshToken
    }
  }
  `
  const result = await mutate(refreshMutation, {
    token: authState.token,
  });

  console.log(result)
  // Cookies.remove('accessToken');
  // Cookies.remove('refreshToken');
  return null;
}