import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Button from "@mui/material/Button";

const GOOGLE_API =
  "https://kdt-sw-4-team14.elicecoding.com/api/auth/google/callback";

export const GoogleLoginButton = ({ googleLoginRecoil }) => {
  const googleSocialLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post(GOOGLE_API, {
          code: codeResponse.code,
        });
        googleLoginRecoil(response.data);
        // Handle the response from the backend
      } catch (error) {
        alert("로그인 실패!!!");
        // Handle the error
      }
    },
    onError: (errorResponse) => {
      alert("로그인 실패!!!");
      console.log(errorResponse);
    },
    flow: "auth-code",
  });
  return (
    <Button
      sx={{ width: "100%" }}
      type="button"
      variant="contained"
      onClick={googleSocialLogin}
    >
      구글 로그인
    </Button>
  );
};
