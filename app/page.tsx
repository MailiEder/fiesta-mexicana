
async function fetchErgebnisse()  {
  const ergebnisseResponse = await fetch("http://localhost:3000/api/single",{
  cache:"no-store"
  });
  // console.log("Lesen der Ergebnisse");
   
   return ergebnisseResponse.json();
  
  }

export default async function Page() {

const ergebnisse = await fetchErgebnisse();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container">
        <h1 className="text-center text-primary mt-3 mb-3">Ortenaumeisterschaft 2023</h1> 
        <div className="card">
                  <div className="card-header text-primary">Ergebnisse</div>
                      <div className="card-body">
                          <div className="table-responsive">
                   
                          <table id="runner_data" className="table table-bordered table-sm">
                              <thead>
                                  <tr>
                                      <th data-orderable="false">Platz</th>
                                      <th data-orderable="false">Name</th>
                                      <th data-orderable="false">Vorname</th>
                                      <th data-orderable="false">Verein</th>
                                      <th data-orderable="false">AK</th>
                                      <th data-orderable="false">Gesamtzeit</th>
                                      <th data-orderable="false">Großweier</th>
                                      <th data-orderable="false">Biberach</th>
                                  </tr>
                              </thead>
                              <tbody>
                              {ergebnisse && ergebnisse.map((ergebnis:any) => (
                                  <tr key={ergebnis.laeuferid}>
                                      <th scope="row">{ergebnis.rn}</th>
                                          <td>{ergebnis.name}</td>
                                          <td>{ergebnis.vorname}</td>
                                          <td>{ergebnis.verein}</td>
                                          <td>{ergebnis.ak}</td>
                                          <td>{ergebnis.gesamtzeit}</td>
                                          <td>{ ergebnis.wettbewerbdate_1 == ergebnis.orderdate_1 ? (<span style={{background: "LimeGreen"}}>{ergebnis.wettbewerbdate_1}</span>) : 
                                              (ergebnis.wettbewerbdate_1 == ergebnis.orderdate_2 ? (<span style={{background: "yellow"}}>{ergebnis.wettbewerbdate_1}</span>) :
                                              (<span>{ergebnis.wettbewerbdate_2}</span>)) }</td>
                                          <td>{ ergebnis.wettbewerbdate_2 == ergebnis.orderdate_1 ? (<span style={{background: "LimeGreen"}}>{ergebnis.wettbewerbdate_2}</span>) : 
                                              (ergebnis.wettbewerbdate_2 == ergebnis.orderdate_2 ? (<span style={{background: "yellow"}}>{ergebnis.wettbewerbdate_2}</span>) :
                                              (<span>{ergebnis.wettbewerbdate_2}</span>)) }</td>
                                  </tr>
                                  ))}
                                                     
                              </tbody>
                          </table>
                   
                      </div>
                  </div>
              </div>
  
              <div className="text-center p-3" style={{background:"Linen"}}>
                  <button type="button" style={{ background:"LimeGreen", border:"none", pointerEvents:"none" }}>Beste Zeit</button>
                  <button type="button" style={{ background:"yellow", border:"none", pointerEvents:"none"}}>Zweite Zeit</button>
              </div>

      </div>
      
    </main>
  );
}

