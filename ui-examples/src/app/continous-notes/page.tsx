"use client"

type Entry = {
  id: string;
  label: string;
  tags: string[];
  group: string;
}

function Group({entries, title, entryTitle, contentTitle, referencesTitle}: {entries: Entry[], title: string, entryTitle: string, contentTitle: string, referencesTitle: string}) {
  return (
    <>
      <div className="block">
        <h2 className="display-6" style={{fontSize: "1.5rem", margin: "0.5rem"}}>{title}</h2>
        <table className="table" style={{height: "calc(100vh - 3rem)", width: "100vw"}}>
          <thead>
            <tr style={{fontSize: "0.5rem", margin: "0.1rem"}}>
              <th className="p-0 text-center px-1" scope="col">{entryTitle}</th>
              <th className="p-0 px-1" scope="col">{contentTitle}</th>
              <th className="p-0 px-1" scope="col">{referencesTitle}</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id}>
                <th className="p-0">
                  <div className="position-relative mx-1" style={{width: "5vh", height: "5vh"}}>
                    <div className="display-6 text-center m-2" style={{fontSize: "1.3rem"}}>{entry.label}</div>
                  </div>
                </th>
                <td width="100%" className="p-0">
                  {entry.tags.map(t => (
                    <div key={t} className="badge rounded-pill text-bg-info text-white" style={{fontSize: "0.5rem", marginRight: "0.1rem"}}>{t}</div>
                  ))}
                </td>
                <td width="100%" className="p-0" style={{borderLeftWidth: "var(--bs-border-width)", borderLeftStyle: "dashed"}}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{pageBreakAfter: "always"}} />
    </>
  )
}

function getYearRange(year: number) {
  const start = Date.UTC(year, 0, 1);
  const end = Date.UTC(year, 11, 31);
  return [start, end]
}

export default function Home() {
  const [startTime, endTime] = getYearRange(new Date().getUTCFullYear());
  const dayLength = 24 * 3600 * 1000;
  const numberOfDays = (endTime - startTime) / dayLength;
  const entries = Array.from({length: numberOfDays}).map<Entry>((_, index) => {
    const time = startTime + dayLength * index;
    const date = new Date(time);
    const id = String(time);
    return {
      id: id,
      label: date.toLocaleDateString("en", {month: "short"}),
      group: `Day ${date.getUTCDate()}`,
      tags: [
        String(date.getUTCFullYear())
      ]
    }
  });

  const groups = entries.reduce<Record<string, Entry[]>>((acc, entry) => {
    const entryList = acc[entry.group] = acc[entry.group] || [];
    entryList.push(entry)
    return acc;
  }, {});
  
  return (
    <div className="container-fluid p-0 m-0">
      {Object.entries(groups).map(([key, entries]) => {
        return (
          <Group
            key={key}
            entries={entries}
            title={entries[0].group}
            entryTitle="Day"
            contentTitle="Activity"
            referencesTitle="References"
          />
        )
      })}
    </div>
  )
}
