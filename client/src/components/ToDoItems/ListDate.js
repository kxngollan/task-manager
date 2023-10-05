import './ListDate.css';

function ListDate(props) {
  const day = props.date.toLocaleString('en-US', { day: '2-digit' });
  const month = props.date.toLocaleString('en-US', { month: 'short' });
  const year = props.date.toLocaleString('en-US', { year: 'numeric' });

  const taskStatus = props.taskStatus;

  return (
    <div
      className={
        taskStatus === 'Complete' ? 'list-date list-date-complete' : 'list-date'
      }
    >
      <div className="list-date-day">{day}</div>
      <div className="list-date-month">{month}</div>
      <div className="list-date-year">{year}</div>
    </div>
  );
}

export default ListDate;
