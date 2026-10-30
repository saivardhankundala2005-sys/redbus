# redBus × Red Pass — High-Fidelity Interactive MVP

> **Product Management Case Prototype**  
> *redBus: Art and Science of Product Management — Open Ticket Failure and Red Pass Pivot*

A high-fidelity, interactive booking and commuter pass web application designed for redBus's strategic pivot to guaranteed-seat commuter subscription passes (**Red Pass**).

---

## 🚀 Live Streamlit Cloud Deployment

This repository is pre-configured for instant one-click deployment on **Streamlit Cloud**:

1. Log in to [Streamlit Community Cloud](https://share.streamlit.io/).
2. Click **Create app** and select this repository: `saivardhankundala2005-sys/redbus`.
3. Set the **Main file path** to: `streamlit_app.py`.
4. Click **Deploy!**

The app automatically serves the complete high-fidelity React frontend with full-screen immersive styling.

---

## ✨ Core Product Features & Case Highlights

1. **Guaranteed Seat Certainty (The Core Pivot)**:
   - Replaces the failed open-ticket pass concept.
   - Every Red Pass ride reserves a named bus operator, scheduled departure, and confirmed seat.

2. **1-Hour Free Bus Change (Commuter Flexibility)**:
   - If work or travel runs late, commuters can swap departures with the same operator up to 60 minutes before scheduled departure without penalty.

3. **Rotating Conductor QR Boarding**:
   - Single-scan offline-capable rotating QR token with instant digital audit settlement for private operators.

4. **Multi-Operator Corridor Coverage**:
   - Live pilot corridor: **Warangal ⇄ Hyderabad** across 4 major operators (Neeta Tours, TSRTC Garuda Plus, Orange Tours, Morning Star).

5. **A/B Pricing Experimentation Engine**:
   - Built-in live toggle between 3 pricing arms:
     - **₹1,200 Standard** (₹400/ride, 12% discount)
     - **₹1,230 Parity** (₹410/ride, breakeven benchmark)
     - **₹1,140 Campus Student Pass** (₹380/ride, 16% discount with student ID verification modal)

6. **Native Mobile Chassis & Responsive Desktop View**:
   - Toggle seamlessly between full desktop web view and mobile phone simulator (iPhone Pro Max chassis with customizable heights).

7. **MVP Continuous Evaluation Loop (3-Ride Auto-Reset)**:
   - After using every 3 rides of the pass, the balance automatically resets to 3 rides for uninterrupted testing and continuous walkthroughs.

---

## 🛠️ Local Development & Running

### Option 1: Running with Vite (Local React Dev Server)

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit: `http://localhost:5173`

### Option 2: Running with Streamlit

```bash
# Install Python requirements
pip install -r requirements.txt

# Build production assets
npm run build

# Start Streamlit application
streamlit run streamlit_app.py
```

Visit: `http://localhost:8501`

---

## 📁 Repository Structure

```
├── streamlit_app.py           # Streamlit Cloud deployment entrypoint
├── requirements.txt           # Python dependencies (streamlit)
├── .streamlit/
│   └── config.toml            # Full-screen and static serving configuration
├── scripts/
│   └── bundle_html.py         # Self-contained bundle generator
├── dist/                      # Production distribution
│   ├── bundle.html            # Inlined single-bundle application
│   └── assets/                # Modular JS & CSS assets
├── static/                    # Streamlit static serving mirror
├── src/
│   ├── components/            # React UI components (Booking, Red Pass, Account, Bus list)
│   ├── context/               # Global state management (Bookings, Pass Wallet, A/B Arms)
│   ├── data/                  # Operator mock data & pilot routes
│   └── types/                 # TypeScript interfaces
├── tailwind.config.js         # redBus design system styling
└── package.json               # Node.js build configuration
```

---

## 📄 License

MIT License. Developed for Product Management Case Competition.
