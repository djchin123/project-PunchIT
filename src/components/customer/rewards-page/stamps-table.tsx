// stamps-table.tsx  – live activity feed
import "../../../styles/customer/rewards/stamps.css";

interface Row { date: string; activity: string; stamps: number; }
export default function StampsTable({ rows }: { rows: Row[] }) {
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
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.activity}</td>
                <td>{r.stamps > 0 ? `+${r.stamps}` : r.stamps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
