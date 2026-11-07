from pathlib import Path
from html import unescape
import json,re
root=Path(__file__).resolve().parents[1]
urls=re.findall(r'<loc>https://floridacostiera.com/([^<]*)</loc>',(root/'sitemap.xml').read_text())
rows=[]
for path in urls:
 p=root/(path+'.html' if path else 'index.html')
 if not p.exists():continue
 s=p.read_text();title=re.search(r'<title>(.*?)</title>',s,re.S|re.I);desc=re.search(r'<meta[^>]*name="description"[^>]*content="([^"]*)"',s,re.I)
 title=unescape(title[1]).strip() if title else path
 description=unescape(desc[1]).strip() if desc else ''
 headings=' '.join(re.findall(r'<h[12][^>]*>(.*?)</h[12]>',s,re.S|re.I))
 search=re.sub('<[^>]+>',' ',title+' '+description+' '+headings+' '+path).lower()
 rows.append(dict(path=path,title=title,description=description,search=search))
(root/'functions/api/ask-tino-index.js').write_text('// Generated from public sitemap titles, descriptions and headings. Rebuild: python scripts/build-ask-tino-index.py\nexport default '+json.dumps(rows,ensure_ascii=False)+';\n')
print(len(rows),'indexed pages')
