const sheetsKey = "1zSdw8E6NW7kskIpfi2H0exdLNm8rXo4e8zsPu3-n85E"
const sheetsSheet = "handles"

const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetsKey}/gviz/tq?tqx=out:csv&sheet=${sheetsSheet}`

export default {
  async fetch(request, env, ctx) {
    const csvData = await fetch(csvUrl);

    const csvText = await csvData.text();
    const lines = csvText.split('\n');

    let handles = {};

    for (const line of lines) {
      let [user, did] = line.split(',')

      user = user.replaceAll('"', "");
      did = did.replaceAll('"', "");

      handles[user] = did;
    }

    const url = new URL(request.url)
    const user = url.host.split('.')[0];

    if (handles[user]) {
      return new Response(handles[user]);
    } else {
      return new Response("Not Found");
    }
  },
};
