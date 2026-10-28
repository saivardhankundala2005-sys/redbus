import os
import streamlit as st
import streamlit.components.v1 as components

# Configure page metadata
st.set_page_config(
    page_title="redBus — Bus Ticket Booking with Red Pass",
    page_icon="🚌",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Hide Streamlit UI chrome for a 100% full-screen immersive web application experience
st.markdown(
    """
    <style>
        #MainMenu, header, footer, [data-testid="stHeader"], [data-testid="stToolbar"] {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
        }
        .main, .block-container, [data-testid="stAppViewContainer"], [data-testid="stMainBlockContainer"] {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100vw !important;
            width: 100vw !important;
            height: 100vh !important;
            overflow: hidden !important;
        }
        div[data-testid="stVerticalBlock"], div[data-testid="stElementContainer"] {
            gap: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        iframe {
            border: none !important;
            width: 100vw !important;
            height: 100vh !important;
            min-height: 100vh !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            z-index: 999999 !important;
        }
    </style>
    """,
    unsafe_allow_html=True,
)

curr_dir = os.path.dirname(os.path.abspath(__file__))

# Primary: Self-contained single-bundle HTML (loads instantly with zero asset-path errors)
bundle_file = os.path.join(curr_dir, "dist", "bundle.html")
if not os.path.exists(bundle_file):
    bundle_file = os.path.join(curr_dir, "static", "bundle.html")

if os.path.exists(bundle_file):
    with open(bundle_file, "r", encoding="utf-8") as f:
        html_code = f.read()
    components.html(html_code, height=950, scrolling=True)
else:
    # Fallback to Streamlit static serving iframe
    components.iframe("app/static/index.html", height=950, scrolling=True)
