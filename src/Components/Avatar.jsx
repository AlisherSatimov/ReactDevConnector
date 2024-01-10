const Avatar = ({ letter, bg }) => {
  return <span className={`avatar text-bg-${bg}`}>{letter}</span>;
};

export default Avatar;
