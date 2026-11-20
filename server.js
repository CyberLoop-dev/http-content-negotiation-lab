const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PUBLIC_DIR = path.join(__dirname, "public");
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml" };

function parseAccept(header) {
  if (!header || !header.trim()) return [{ type: "*", subtype: "*", q: 1, specificity: 0, order: 0 }];
  return header.split(",").map((part, order) => {
    const pieces = part.trim().split(";");
    const media = pieces.shift().trim().toLowerCase().split("/");
    if (media.length !== 2 || !media[0] || !media[1]) return null;
    let q = 1;
    for (const parameter of pieces) {
      const match = /^\s*q\s*=\s*([0-9.]+)\s*$/i.exec(parameter);
      if (match) {
        const value = Number(match[1]);
        q = Number.isFinite(value) && value >= 0 && value <= 1 ? value : 0;
      }
    }
    return { type: media[0], subtype: media[1], q, specificity: (media[0] === "*" ? 0 : 1) + (media[1] === "*" ? 0 : 1), order };
  }).filter(Boolean);
}

function qualityFor(offer, ranges) {
  const media = offer.toLowerCase().split("/");
  if (media.length !== 2) throw new Error("Each offered type must look like type/subtype");
  const matches = ranges.filter(range =>
    (range.type === "*" || range.type === media[0]) &&
    (range.subtype === "*" || range.subtype === media[1])
  ).sort((a, b) => b.specificity - a.specificity || a.order - b.order);
  return matches.length ? matches[0].q : 0;
}

function negotiate(accept, offers) {
  const ranges = parseAccept(accept);
  const ranked = offers.map((type, index) => ({ type, q: qualityFor(type, ranges), index }))
    .sort((a, b) => b.q - a.q || a.index - b.index);
  const winner = ranked.find(item => item.q > 0);
  return { selected: winner ? winner.type : null, ranked, ranges };
}

function send(res, status, type, body) {
  res.writeHead(status, { "content-type": type, "x-content-type-options": "nosniff" });
  res.end(body);
}

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (req.method !== "GET") return send(res, 405, "text/plain; charset=utf-8", "Method not allowed");
    if (url.pathname === "/api/negotiate") {
      try {
        const offers = (url.searchParams.get("offers") || "").split(",").map(x => x.trim()).filter(Boolean);
        if (!offers.length) return send(res, 400, "application/json", JSON.stringify({ error: "Provide at least one offered media type." }));
        return send(res, 200, "application/json; charset=utf-8", JSON.stringify(negotiate(url.searchParams.get("accept") || "", offers)));
      } catch (error) {
        return send(res, 400, "application/json; charset=utf-8", JSON.stringify({ error: error.message }));
      }
    }
    let decoded;
    try { decoded = decodeURIComponent(url.pathname); } catch { return send(res, 400, "text/plain; charset=utf-8", "Bad path"); }
    const relative = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
    const file = path.resolve(PUBLIC_DIR, relative);
    if (file !== PUBLIC_DIR && !file.startsWith(PUBLIC_DIR + path.sep)) return send(res, 403, "text/plain; charset=utf-8", "Forbidden");
    fs.readFile(file, (error, data) => {
      if (error) return send(res, 404, "text/plain; charset=utf-8", "Not found");
      send(res, 200, MIME[path.extname(file)] || "application/octet-stream", data);
    });
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 4173);
  createServer().listen(port, "127.0.0.1", () => console.log(`Negotiation Lab: http://127.0.0.1:${port}`));
}

module.exports = { parseAccept, qualityFor, negotiate, createServer };
