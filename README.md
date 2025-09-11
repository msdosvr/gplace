# GPlace — GitHub Pages build (static frontend)

This repository contains the **frontend** of GPlace prepared for GitHub Pages.
The `index.html` is placed at the repository root so GitHub Pages will serve it at:

https://<your-username>.github.io/<repo-name>

Important notes:
- GitHub Pages only serves **static** files (HTML/CSS/JS). The original project expects a backend (WebSocket at `/ws`, endpoints like `/register`, `/login`, `/pfp/`, `/report`, `/admin/ban`), which **will not work** on GitHub Pages.
- To get full functionality you must host the backend (Express/WS/DB) on another host (e.g., Render, Railway, Fly, Heroku, VPS) and update the client to talk to that host (set absolute API/WS URLs).
- To enable Pages: go to the repository Settings → Pages and set Source to the `main` branch and folder `/ (root)` or use the `docs/` folder. If you put files in `docs/`, move index.html there.

Quick start (local preview):
- You can preview locally by opening `index.html` in a browser. For a proper server preview (so fetch/relative routes behave like on a site), run a local static server, for example:
  - `npx http-server .` or `python3 -m http.server 8000` then open http://localhost:8000

If you want, I can:
- Produce a version that replaces server calls with mocked local behavior so the site is fully usable as a static demo on GitHub Pages.
- Or produce instructions & files to deploy the backend to Render and configure the frontend to use it.
