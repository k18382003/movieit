import MetricsItem from './MetricsItem';
import './Metrics.scss';

const Metrics = () => {
  const temData = [
    { number: 10, description: 'Total hosted event' },
    { number: 20, description: 'Total invitation sent' },
    { number: 30, description: 'Total people movie with' },
    { number: 50, description: 'Total invitation received' },
  ];

  return (
    <section className="metrics">
      <h2 className="metrics__title">Metrics</h2>
      <section className="metrics__container">
        {temData.map((data) => {
          return <MetricsItem metric={data} />;
        })}
      </section>
    </section>
  );
};

export default Metrics;
