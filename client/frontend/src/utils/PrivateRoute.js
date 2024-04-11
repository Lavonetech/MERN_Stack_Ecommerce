import { Outlet, useNavigate } from "react-router-dom";


const PrivateRoutes = () => {
        const Navigate=useNavigate();
        const cookie = document.cookie;
        const tokenCookie = cookie.split(";").find(cookie => cookie.trim().startsWith("jwt="));
      
         // Extract the token value
      
        try {
            const tokenValue = tokenCookie.split("=")[1];
          const jwtToken = JSON.parse(atob(tokenValue.split(".")[1]));  // Decode the token
          const isAdmin = jwtToken.user.isAdmin;
          if (! isAdmin) {
            window.location.href="/login";
          } else {
            console.log("Rendering Outlet for admin");
            return <Outlet />;
          }
        } catch (error) {
          // Handle token decoding errors
          console.error("Error decoding JWT token:", error);
          return <Navigate to="/" />;
        }
   
 
};

export default PrivateRoutes;
