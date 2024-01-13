import './ListDate.css';

function ListDate(props) {
  const date = new Date(props.date);
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.toLocaleString('en-US', { year: 'numeric' });

  const taskStatus = props.taskStatus;

  return (
    <div
      className={
        taskStatus === 'Complete' ? 'list-date list-date-complete' : 'list-date'
      }
      onClick={() => console.log(taskStatus)}
    >
      <div className="list-date-day">{day}</div>
      <div className="list-date-month">{month}</div>
      <div className="list-date-year">{year}</div>
    </div>
  );
}

export default ListDate;
