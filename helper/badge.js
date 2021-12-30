import { BadgeSharp } from '@mui/icons-material';

const Badge = ({ text, value }) => {
  const badgeBg = {
    borderRadius: '5px',
    color: '#fff',
    marginTop: '5px',
    marginLeft: '4px',
    fontSize: '12px',
  };
  const badgeValue = {
    backgroundColor: '#fff',
    color: '#000',
    padding: '0px 4px',
  };
  return (
    <>
      {/* <button type="button" disabled className="btn btn-primary">
        {text} <span className="badge badge-li">{value}</span>
      </button> */}
      <span className="bg-primary p-1" style={badgeBg}>
        {text}&nbsp;
        <span style={badgeValue}>{value}</span>
      </span>
    </>
  );
};

export default Badge;
// pa-Unnamed
