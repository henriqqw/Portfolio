export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await fetch("http://74.234.32.215/api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Analytics-Key": "dcaa2ac009eb122ad6e7dd0d5e7b1b761d03abab41010c09"
      },
      body: JSON.stringify(req.body)
    });

    return res.status(202).end();
  } catch {
    return res.status(202).end();
  }
}
