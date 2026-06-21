import { Line } from "react-chartjs-2";

interface Props {
  title: string;
  labels: string[];
  data: number[];
}

export default function GrowthChart({ labels, data }: Props) {
  return (
    <div className="h-60">
      <Line
        data={{
          labels,
          datasets: [
            {
              data,
              borderColor: "#6366F1",
              backgroundColor: "rgba(99,102,241,0.15)",
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7,
              pointBackgroundColor: "#6366F1",
              pointBorderWidth: 0,
              tension: 0.4,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                color: "rgba(148,163,184,.15)",
              },
            },
          },
        }}
      />
    </div>
  );
}
