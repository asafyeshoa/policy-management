import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CountdownRedirect = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div>
      <h2>Access Denied</h2>
      <p>You will be redirected to the home page in {countdown} seconds.</p>
    </div>
  );
};

export default CountdownRedirect;
