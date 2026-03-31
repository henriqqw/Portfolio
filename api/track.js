export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await fetch("http://74.234.32.215/api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Analytics-Key": "79cb76434616a567049793968cb1997e4d3836e61b5da748"
      },
      body: JSON.stringify(req.body)
    });

    return res.status(202).end();
  } catch {
    return res.status(202).end();
  }
}
