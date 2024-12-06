// import statusCodes along with GoogleSignin
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
  
  // Somewhere in your code

const config = async () => {
    GoogleSignin.configure({
        webClientId: '628838911488-qdgpa0sr6mgg6816ta1u052tfm249dcc.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
        scopes: ['https://www.googleapis.com/auth/drive'], // what API you want to access on behalf of the user, default is email and profile
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
         });
}


  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens().accessToken;
      if (isSuccessResponse(response)) {
        return token;
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  export default { signIn, config }