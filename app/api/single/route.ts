import  pgutils  from '../../../utils/pgutils';

export async function GET()  {
//  console.log('GET REQUEST')  
                 
const allresults = await pgutils.getAllResults();

//console.log(allresults)

return new Response(JSON.stringify(allresults)
         ,{status: 400});

/*
return new Response(allresults
         ,{status: 400});
*/  
   
};