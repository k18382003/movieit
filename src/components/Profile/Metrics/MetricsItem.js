import './MetricsItem.scss'

const MetricsItem = ({ metric }) => {
  return (
    <div className="metrics-data">
      <p className="metrics-data__number">{metric.number}</p>
      <p className="metrics-data__description">{metric.description}</p>
    </div>
  );
};

export default MetricsItem;
