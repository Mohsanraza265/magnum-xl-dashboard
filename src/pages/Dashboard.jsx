export default function Dashboard() {
  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1> */}
      <h2 className="text-xl font-semibold mb-2">Welcome Admin </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 text-white font-bold rounded shadow" style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}>Total Users: 1200</div>
        <div className="p-4 text-white font-bold rounded shadow" style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}>Subscription Count: 350</div>
        <div className="p-4 text-white font-bold rounded shadow" style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}>Revenue: $500</div>
      </div>
    </div>
  );
}