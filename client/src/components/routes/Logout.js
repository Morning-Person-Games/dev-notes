import React, { useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout({ resetToken }) {
  const [reset, setReset] = useState(false);

  React.useEffect(() => {
    resetToken();
    setReset(true);
  }, [resetToken]);

  if (reset) {
    toast.info("Reset login token. Please Login again to create more notes.");
    return <Navigate to="/" />;
  }
}

export default Logout;

Logout.propTypes = {
  resetToken: PropTypes.func.isRequired,
};
