"""Slice the approved imagegen illustrations, trim transparent margins, export WebP.
Usage: python scripts/prepare-illustrations.py (Pillow required).
The original PNGs are retained in output/ui-cnxh/v2/.
"""
from pathlib import Path
from PIL import Image, ImageFilter
import json

root = Path(__file__).resolve().parent.parent
source = root / 'output/ui-cnxh/v2'
out = root / 'assets/illustrations/generated'
out.mkdir(parents=True, exist_ok=True)
manifest = {}

def save(im, name, kind):
    if kind == 'cutout':
        im = im.convert('RGBA')
        bounds = im.getchannel('A').getbbox()
        if bounds:
            im = im.crop(bounds)
        # Keep original generated alpha; sharpen RGB alone to avoid edge halos.
        alpha = im.getchannel('A')
        im = im.convert('RGB').filter(ImageFilter.UnsharpMask(radius=1, percent=110, threshold=3)).convert('RGBA')
        im.putalpha(alpha)
    else:
        im = im.convert('RGB').filter(ImageFilter.UnsharpMask(radius=0.8, percent=100, threshold=3))
    im.save(out / (name+'.webp'), 'WEBP', quality=94, method=6, exact=True)
    manifest[name] = {'width':im.width, 'height':im.height, 'kind':kind}

atlas = Image.open(source / 'cutouts.png')
for i in range(8):
    col, row = i%4, i//4
    box = (round(col*atlas.width/4), round(row*atlas.height/2), round((col+1)*atlas.width/4), round((row+1)*atlas.height/2))
    save(atlas.crop(box), f'chapter-{i+1}-cutout-v2' if i<7 else 'books-cutout-v2', 'cutout')
save(Image.open(source / 'hero.png'), 'hero-cutout-v2', 'cutout')

atlas = Image.open(source / 'scenes.png')
assert 0.6 < atlas.width/atlas.height < 0.75, 'Scenes must use the approved portrait 2x4 layout.'
for i in range(8):
    col, row = i%2, i//2
    box = (round(col*atlas.width/2)+2, round(row*atlas.height/4)+2, round((col+1)*atlas.width/2)-2, round((row+1)*atlas.height/4)-2)
    save(atlas.crop(box), f'scene-{i+1}-v2', 'scene')
(root / 'data/illustrations.json').write_text(json.dumps(manifest, indent=2)+'\n', encoding='utf-8')
print(f'Prepared {len(manifest)} production illustrations; alpha preserved, no synthetic upscaling.')
