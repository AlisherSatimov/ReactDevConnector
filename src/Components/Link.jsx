import { Link as RRDLink } from "react-router-dom";

const Link = ({ children, className, ...props }) => {
  return (
    <RRDLink
      className={`text-reset text-decoration-none ${className}`}
      {...props}
    >
      {children}
    </RRDLink>
  );
};

export default Link;
