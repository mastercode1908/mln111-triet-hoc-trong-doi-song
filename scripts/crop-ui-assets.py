"""Crop the existing generated UI artwork without regenerating pixels.
Run: python scripts/crop-ui-assets.py
Requires Pillow. Source mockups are kept in output/ui-cnxh.
"""
from pathlib import Path
from PIL import Image
import json
root = Path(__file__).resolve().parent.parent
source = root / 'output/ui-cnxh'
out = root / 'assets/illustrations/generated'
out.mkdir(parents=True, exist_ok=True)
crops = {
 'home': [
  ('hero-society',(442,56,1024,424)),
  ('chapter-1',(209,518,346,651)), ('chapter-2',(565,511,660,651)),
  ('chapter-3',(878,510,978,651)), ('chapter-4',(233,679,346,816)),
  ('chapter-5',(562,682,660,816)), ('chapter-6',(843,682,978,816)),
  ('chapter-7',(242,834,424,967)),
  ('case-automation',(49,1062,265,1161)), ('case-participation',(288,1062,503,1161)),
  ('case-diversity',(526,1062,741,1161)), ('case-family',(765,1062,977,1161)),
 ],
 'overview': [('case-study',(273,229,400,315)),('case-development',(273,478,400,566))],
 'chapter1': [('books-learning',(744,77,925,308))],
 'chapter2': [('factory-automation',(604,374,899,604))],
}
manifest=[]
for stem, items in crops.items():
 im=Image.open(source / (stem+'.png')).convert('RGB')
 for name, box in items:
  dest=out/(name+'.webp')
  im.crop(box).save(dest,'WEBP',quality=90,method=6)
  manifest.append({'file':str(dest.relative_to(root)).replace('\\','/'),'source':stem+'.png','box':box})
(out/'crops.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Saved {len(manifest)} cropped WebP assets.')
