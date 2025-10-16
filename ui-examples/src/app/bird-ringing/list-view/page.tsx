import { getRingers } from "../common"

export default function ListView() {
  const ringers = getRingers()
  return (
    <>
      <h2>List view</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">License</th>
            <th scope="col">Email Status</th>
            <th scope="col">Updated</th>
          </tr>
        </thead>
        <tbody>
          {ringers.map(r => (
            <tr key={r.id}>
              <th scope="row">{r.id}</th>
              <td>{r.firstName} {r.lastName}</td>
              <td>{r.license}</td>
              <td>{r.emailStatus}</td>
              <td>{r.updated.toISOString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
