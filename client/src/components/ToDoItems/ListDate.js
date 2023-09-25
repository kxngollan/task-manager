import './ListDate.css';

function ListDate(props) {
  const day = props.date.toLocaleString('en-US', { day: '2-digit' });
  const month = props.date.toLocaleString('en-US', { month: 'long' });
  const year = props.date.toLocaleString('en-US', { year: 'numeric' });

  return (
    <div className="list-date">
      <div className="lsit-date-day">{day}</div>
      <div className="list-date-month">{month}</div>
      <div className="list-date-year">{year}</div>
    </div>
  );
}

export default ListDate;
