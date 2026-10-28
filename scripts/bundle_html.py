import os
import glob

def bundle():
    dist_dir = os.path.abspath('dist')
    index_path = os.path.join(dist_dir, 'index.html')
    with open(index_path, 'r', encoding='utf-8') as f:
        html = f.read()

    css_files = glob.glob(os.path.join(dist_dir, 'assets', '*.css'))
    for css_file in css_files:
        with open(css_file, 'r', encoding='utf-8') as f:
            css = f.read()
        css_tag = f'<link rel="stylesheet" crossorigin href="./assets/{os.path.basename(css_file)}">'
        html = html.replace(css_tag, f'<style>{css}</style>')

    js_files = glob.glob(os.path.join(dist_dir, 'assets', '*.js'))
    for js_file in js_files:
        with open(js_file, 'r', encoding='utf-8') as f:
            js = f.read()
        js_tag = f'<script type="module" crossorigin src="./assets/{os.path.basename(js_file)}"></script>'
        html = html.replace(js_tag, f'<script type="module">{js}</script>')

    bundle_path = os.path.join(dist_dir, 'bundle.html')
    with open(bundle_path, 'w', encoding='utf-8') as f:
        f.write(html)
    
    # Also write to static folder for static serving
    static_dir = os.path.abspath('static')
    os.makedirs(static_dir, exist_ok=True)
    with open(os.path.join(static_dir, 'bundle.html'), 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"bundle.html created: {len(html)} bytes")

if __name__ == '__main__':
    bundle()
