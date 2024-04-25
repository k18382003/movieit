import MetricsItem from './MetricsItem';
import './Metrics.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
const { REACT_APP_API_BASE_PATH } = process.env;

const Metrics = ({ userId }) => {
  const [metricData, setMetricData] = useState();

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const result = await axios.get(
          `${REACT_APP_API_BASE_PATH}/profile/metrics/${userId}`
        );
        setMetricData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMetrics();
  }, [userId]);

  return (
    <section className="metrics">
      <h2 className="metrics__title">Metrics</h2>
      <section className="metrics__container">
        {metricData?.map((data) => {
          return <MetricsItem metric={data} />;
        })}
      </section>
    </section>
  );
};

export default Metrics;
