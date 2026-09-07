import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ThumbPulse — YouTube Thumbnail Previewer</title>
  
  <!-- Google AdSense Script -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8942621552509637"
       crossorigin="anonymous"></script>

  <style>
    :root {
      --bg: #07090e;
      --panel: #0d121c;
      --line: #1e293b;
      --text: #f8fafc;
      --muted: #94a3b8;
      --accent: #10b981;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0; background: var(--bg); color: var(--text);
      font-family: system-ui, -apple-system, sans-serif;
    }
    .bg-grid {
      position: fixed; inset: 0; pointer-events: none; opacity: 0.12;
      background-image: linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px);
      background-size: 48px 48px;
    }
    .nav {
      height: 72px; display: flex; align-items: center; max-width: 1100px;
      margin: auto; padding: 0 24px; border-bottom: 1px solid var(--line);
    }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; color: #fff; text-decoration: none; }
    .brand-mark { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 9px; background: var(--accent); color: #022c22; font-size: 13px; font-weight: 900; }
    .container {
      max-width: 1100px; margin: 40px auto; padding: 0 24px;
      display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
    }
    @media(max-width: 768px) { .container { grid-template-columns: 1fr; } }
    .editor-panel, .preview-panel {
      background: var(--panel); border: 1px solid var(--line);
      border-radius: 16px; padding: 28px;
    }
    .editor-panel h2 { margin-top: 0; font-size: 22px; }
    .subtitle { color: var(--muted); font-size: 13px; line-height: 1.5; margin-bottom: 24px; }
    .form-group { margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px; }
    .form-group label { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
    .form-group input[type="text"], .form-group input[type="file"] {
      background: #040609; border: 1px solid var(--line); border-radius: 10px;
      padding: 12px; color: #fff; font-size: 14px; outline: none;
    }
    .form-group input[type="file"] { cursor: pointer; color: var(--muted); }
    
    .stats-box {
      background: #040609; border: 1px solid var(--line); border-radius: 10px;
      padding: 12px; font-size: 13px; color: var(--muted); display: flex; justify-content: space-between;
    }
    .stats-box span { color: var(--text); font-weight: 600; }

    .preview-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--line); padding-bottom: 14px; margin-bottom: 20px; }
    .preview-panel h3 { margin: 0; font-size: 18px; }
    
    .view-toggles { display: flex; gap: 8px; }
    .view-btn {
      background: #040609; border: 1px solid var(--line); color: var(--muted);
      padding: 6px 12px; font-size: 12px; font-weight: 600; border-radius: 6px; cursor: pointer; transition: all 0.2s;
    }
    .view-btn.active { background: var(--accent); color: #022c22; border-color: var(--accent); }

    .preview-card {
      background: #000; border-radius: 14px; overflow: hidden; border: 1px solid var(--line); max-width: 380px; margin: auto;
    }
    .preview-card.mobile-view { max-width: 240px; }
    .preview-card.mobile-view .mockup-details { gap: 8px; padding: 10px; }
    .preview-card.mobile-view .mockup-text h4 { font-size: 12px; }
    .preview-card.mobile-view .mockup-avatar { width: 28px; height: 28px; }

    .mockup-thumb-wrap { position: relative; width: 100%; aspect-ratio: 16 / 9; background: #111827; }
    .mockup-thumb-wrap img { width: 100%; height: 100%; object-fit: cover; }
    .duration-badge {
      position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.85);
      color: #fff; font-size: 11px; font-weight: 700; padding: 3px 6px; border-radius: 4px;
    }
    .mockup-details { display: flex; gap: 12px; padding: 14px; }
    .mockup-avatar { width: 36px; height: 36px; border-radius: 50%; background: #334155; flex-shrink: 0; }
    .mockup-text h4 { margin: 0 0 5px 0; font-size: 14px; line-height: 1.4; color: #fff; font-weight: 500; }
    .mockup-text p { margin: 0; font-size: 12px; color: var(--muted); }
  </style>
</head>
<body>
  <div class="bg-grid"></div>

  <header class="nav">
    <a class="brand" href="/">
      <span class="brand-mark">TP</span>
      <span>ThumbPulse</span>
    </a>
  </header>

  <main class="container">
    <section class="editor-panel">
      <h2>Thumbnail Studio</h2>
      <p class="subtitle">Test your artwork against real YouTube layouts with real-time specs.</p>

      <div class="form-group">
        <label for="imageUpload">Upload Thumbnail Image</label>
        <input type="file" id="imageUpload" accept="image/*" />
      </div>

      <div class="form-group">
        <label>Image Specs & Quality</label>
        <div class="stats-box">
          <div>Resolution: <span id="imgRes">--</span></div>
          <div>Size: <span id="imgSize">--</span></div>
        </div>
      </div>

      <div class="form-group">
        <label for="videoTitle">Video Title</label>
        <input type="text" id="videoTitle" value="I Built a Complete App in 24 Hours (Full Guide)" autocomplete="off" />
      </div>

      <div class="form-group">
        <label for="channelName">Channel Name</label>
        <input type="text" id="channelName" value="Creator Studio" autocomplete="off" />
      </div>

      <div class="form-group">
        <label for="videoViews">Views & Timestamp</label>
        <input type="text" id="videoViews" value="142K views • 1 day ago" autocomplete="off" />
      </div>
    </section>

    <section class="preview-panel">
      <div class="preview-header">
        <h3>Live Preview</h3>
        <div class="view-toggles">
          <button id="desktopBtn" class="view-btn active">Desktop</button>
          <button id="mobileBtn" class="view-btn">Mobile Feed</button>
        </div>
      </div>

      <div id="previewCard" class="preview-card">
        <div class="mockup-thumb-wrap">
          <img id="previewImg" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='180' style='background:#111827;fill:#64748b'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='13'>Upload Image to Preview</text></svg>" alt="Thumbnail Preview" />
          <span class="duration-badge">14:20</span>
        </div>
        <div class="mockup-details">
          <div class="mockup-avatar"></div>
          <div class="mockup-text">
            <h4 id="displayTitle">I Built a Complete App in 24 Hours (Full Guide)</h4>
            <p id="displayChannel">Creator Studio</p>
            <p id="displayMeta">142K views • 1 day ago</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <script>
    const imageUpload = document.getElementById("imageUpload");
    const previewImg = document.getElementById("previewImg");
    const previewCard = document.getElementById("previewCard");
    const desktopBtn = document.getElementById("desktopBtn");
    const mobileBtn = document.getElementById("mobileBtn");
    const imgRes = document.getElementById("imgRes");
    const imgSize = document.getElementById("imgSize");

    const videoTitleInput = document.getElementById("videoTitle");
    const channelNameInput = document.getElementById("channelName");
    const videoViewsInput = document.getElementById("videoViews");

    const displayTitle = document.getElementById("displayTitle");
    const displayChannel = document.getElementById("displayChannel");
    const displayMeta = document.getElementById("displayMeta");

    imageUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const sizeKB = file.size / 1024;
        const sizeText = sizeKB > 1024 ? (sizeKB / 1024).toFixed(2) + " MB" : sizeKB.toFixed(0) + " KB";
        imgSize.textContent = sizeText;

        const reader = new FileReader();
        reader.onload = function(event) {
          const img = new Image();
          img.onload = function() {
            imgRes.textContent = img.width + " × " + img.height + "px";
          };
          img.src = event.target.result;
          previewImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    desktopBtn.addEventListener("click", () => {
      desktopBtn.classList.add("active");
      mobileBtn.classList.remove("active");
      previewCard.classList.remove("mobile-view");
    });

    mobileBtn.addEventListener("click", () => {
      mobileBtn.classList.add("active");
      desktopBtn.classList.remove("active");
      previewCard.classList.add("mobile-view");
    });

    videoTitleInput.addEventListener("input", (e) => {
      displayTitle.textContent = e.target.value || "Untitled Video";
    });

    channelNameInput.addEventListener("input", (e) => {
      displayChannel.textContent = e.target.value;
    });

    videoViewsInput.addEventListener("input", (e) => {
      displayMeta.textContent = e.target.value;
    });
  </script>
</body>
</html>`);
});

app.listen(PORT, () => {
    console.log(`ThumbPulse server running on port ${PORT}`);
});
