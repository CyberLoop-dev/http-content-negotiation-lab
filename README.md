<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:14b8a6&height=145&section=header&text=HTTP%20Content%20Negotiation%20Lab&fontColor=ffffff&fontSize=30" alt="Animated header"/>
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&pause=900&center=true&vCenter=true&width=620&lines=HTTP%20Content%20Negotiation%20Lab;Understand%20Accept%20and%20q%20values" alt="Typing title"/>

[![License](https://img.shields.io/github/license/CyberLoop-dev/http-content-negotiation-lab?label=MIT)](LICENSE)
![Language](https://img.shields.io/github/languages/top/CyberLoop-dev/http-content-negotiation-lab)
![Stars](https://img.shields.io/github/stars/CyberLoop-dev/http-content-negotiation-lab?style=social)
![Last commit](https://img.shields.io/github/last-commit/CyberLoop-dev/http-content-negotiation-lab)

<img src="./assets/mark.svg" width="145" alt="Custom SVG illustration"/>

**An interactive local lab for understanding HTTP Accept headers and media-type selection.**

</div>

## ✨ Overview

Explore how a server chooses among available representations using media ranges, quality values, and specificity.

## 🚀 Features

- 🧭 Parses Accept media ranges and q values.
- 🎯 Applies the most-specific matching range to each offer.
- 📊 Ranks server representations and shows the selected type.
- 🔒 Runs locally with Node.js built-ins and no external dependencies.

## 🧪 Demo

```text
Accept: application/json, text/html;q=0.8
Offers: text/html, application/json
Selected: application/json
```

## ⚡ Quick Start

```bash
git clone https://github.com/CyberLoop-dev/http-content-negotiation-lab.git
cd http-content-negotiation-lab
npm start
```

Open http://127.0.0.1:4173.

## 🧰 Tech Stack

Node.js 20+ · Built-in HTTP server · Browser JavaScript · node:test.

## 🗂️ Folder Structure

```text
http-content-negotiation-lab/
├── server.js
├── package.json
├── public/
│   ├── index.html
│   └── app.js
├── tests/server.test.js
├── .github/workflows/tests.yml
└── assets/mark.svg
```

## 🗺️ Roadmap

- [x] Quality-value and specificity matching
- [x] Local interactive UI and tests
- [ ] Language and encoding negotiation examples
- [ ] Additional Accept parameter handling

## 🤝 Contributing

Add standards-based examples and tests. Keep the local server dependency-free and avoid sending input to remote services.

## 📄 License

MIT — see [LICENSE](LICENSE).

<div align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=0:14b8a6,100:0f172a&height=100&section=footer" alt="Animated footer"/></div>
