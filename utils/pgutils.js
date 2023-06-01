const pool = require("./get-client");

function readAllResults() {
  
    return new Promise((resolve, reject) => {
    const query ='SELECT row_number() over (partition by x.ak order by sum(x.zeit)) as rn, laeuferid, name, vorname, verein, ak, MAX(CASE WHEN seqnum = 1 THEN x.zeit END) as orderdate_1, MAX(CASE WHEN seqnum = 2 THEN x.zeit END) as orderdate_2, to_char(SUM(CASE WHEN seqnum < 3 THEN x.zeit END),\'HH:MI:SS\') as gesamtzeit, MAX(CASE WHEN seqwett = 1 THEN x.zeit END) as wettbewerbdate_1, MAX(CASE WHEN seqwett = 2 THEN x.zeit END) as wettbewerbdate_2 FROM (SELECT l.laeuferid, l.name, l.vorname, l.verein, l.ak, z.zeit, ROW_NUMBER() OVER (PARTITION BY l.laeuferid ORDER BY z.zeit) as seqnum, ROW_NUMBER() OVER (PARTITION BY l.laeuferid ORDER BY z.wettbewerbid) as seqwett from laeufer l JOIN zeiten z ON z.laeuferid = l.laeuferid ) x GROUP BY laeuferid, name, vorname, verein, ak Having count(x.zeit) > 1 ORDER BY ak, sum(x.zeit)'
  //  console.log(query)  
    pool.query(query,  (error, results) => {
       if (error) {
       reject(error);
  //     console.log(error);
       } else {
       resolve(results.rows);
  //     console.log(results.rows)
       }	
     });
     });
     
   }

   module.exports = {

    getAllResults() {
        return readAllResults();  
      }

};