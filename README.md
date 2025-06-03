<h1 align="center">🍪 Cookies-Lesson</h1>
<p align="center">Lezione interattiva e dimostrativa su sicurezza web, attacchi XSS, sniffing cookie e protezione tramite Cloudflare.</p>

<p align="center">
  <!-- Ultimo commit -->
  <img src="https://img.shields.io/github/last-commit/callmenoway/Cookies-Lesson?style=flat&logo=git&logoColor=white&color=0080ff" />

  <!-- Linguaggio principale -->
  <img src="https://img.shields.io/github/languages/top/callmenoway/Cookies-Lesson?style=flat&color=0080ff" />

  <!-- Conteggio linguaggi -->
  <img src="https://img.shields.io/github/languages/count/callmenoway/Cookies-Lesson?style=flat&color=0080ff" />

  <!-- Dimensione repo -->
  <img src="https://img.shields.io/github/repo-size/callmenoway/Cookies-Lesson?style=flat&color=0080ff&logo=database&logoColor=white" />

  <!-- Stars -->
  <img src="https://img.shields.io/github/stars/callmenoway/Cookies-Lesson?style=flat&color=0080ff&logo=github&logoColor=white" />

  <!-- Forks -->
  <img src="https://img.shields.io/github/forks/callmenoway/Cookies-Lesson?style=flat&color=0080ff&logo=code-fork&logoColor=white" />

  <!-- Issues aperti -->
  <img src="https://img.shields.io/github/issues/callmenoway/Cookies-Lesson?style=flat&color=0080ff&logo=githubissues&logoColor=white" />

  <!-- Licenza -->
  <img src="https://img.shields.io/github/license/callmenoway/Cookies-Lesson?style=flat&color=0080ff&logo=open-source-initiative&logoColor=white" />
</p>

---

## 🧰 Tecnologie utilizzate

<p align="center">
  <img src="https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff" />
  <img src="https://img.shields.io/badge/PHP-777BB4.svg?style=flat&logo=php&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB.svg?style=flat&logo=Python&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-000000.svg?style=flat&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/NextJs-000000?style=flat&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff" />
  <img src="https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/Wireshark-%231679A7.svg?style=flat&logo=npm&logoColor=white" />
</p>

---

## 🔎 Descrizione

**Cookie-Lesson** è un progetto educativo pensato per studenti del quarto e quinto anno di informatica. Il repository raccoglie esercizi pratici e dimostrazioni su vulnerabilità legate alla navigazione web, focalizzandosi su:

- Cookie di sessione
- HTTP vs HTTPS
- Sniffing del traffico di rete con Wireshark
- Attacchi XSS (Cross-Site Scripting)
- Escape Room React interattiva
- Introduzione alla protezione tramite Cloudflare

---

## 📁 Contenuto della repo

| Cartella/Script        | Descrizione |
|------------------------|-------------|
| `/react-escape-room/`  | Mini escape room fatta in React per testare attivamente la sicurezza lato frontend |
| `/php-xss-demo/`       | Esempio di vulnerabilità XSS scritto in PHP, utile per demo pratiche |
| `/python-cookie-sniffer/` | App Flask che simula un login non cifrato, con cookie in chiaro intercettabili da Wireshark |

---

## 🧪 Argomenti trattati nella lezione

### ▶️ Introduzione
- Perché è importante una navigazione sicura
- Differenze tra HTTP e HTTPS
- Cosa sono i cookie di sessione

### 🕵️‍♂️ Sniffing cookie (live demo)
- Spiegazione di cosa succede in una connessione HTTP
- Dimostrazione con Wireshark su traffico HTTP
- Attacco man-in-the-middle (con bettercap o ARP spoof)

### 💥 Attacchi XSS
- Come funzionano
- Come iniettare codice malevolo
- Dimostrazione con lo script PHP incluso

### 🧩 Gioco Escape Room
- Attività pratica dove gli studenti devono capire e sfruttare vulnerabilità
- Costruita con React + Next.js

### ☁️ Introduzione a Cloudflare
- Come protegge i siti da attacchi comuni
- CDN, rate limiting, DNS masking, SSL

---

## 🚀 Come eseguire le demo

```bash
# PHP XSS
cd php-xss-demo
php -S 0.0.0.0:80
```

```bash
# Flask sniffing cookie (HTTP)

set FLASK_APP=app.py
flask run --host=0.0.0.0 --port=5000
```

```bash
#WIRESHARK

http.cookie && ip.addr == 192.168.1.X

#oppure con filtro GET

http.request.method == "GET" && http.cookie && ip.addr == 192.168.1.X
```

```bash
# React Escape Room
cd react-escape-room
npm install
npm run build
npm start
```
