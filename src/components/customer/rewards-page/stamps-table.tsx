//stamps-table.tsx
import "../../../styles/customer/rewards/stamps.css";

export default function StampsTable() {
  const activity = [
    { date: "7/14/2023", activity: "Visit Location", stamps: 1 },
    { date: "7/13/2023", activity: "Visit Location", stamps: 1 },
    { date: "7/10/2023", activity: "Visit Location", stamps: 1 },
    { date: "7/09/2023", activity: "Visit Location", stamps: 1 },
    { date: "6/30/2023", activity: "Stamp Redeemed: One Free Photo", stamps: -5 },
  ];

  return (
    <div className="stamps-table">
      <h3 className="table-title">Stamp Activity</h3>
      <div className="table-wrapper">
        <table className="activity-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity</th>
              <th>Stamps</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.activity}</td>
                <td>{entry.stamps > 0 ? `+${entry.stamps}` : entry.stamps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
