"""Bangun deck AK3U: 4 file terpisah + 1 file gabungan. python3 build.py"""
import k1, k2, k3, k4
from deck import new_deck

for m in (k1, k2, k3, k4):
    print(m.build())

prs = new_deck()
for m in (k1, k2, k3, k4):
    m.build(None, prs)
prs.save("output/AK3U_Ajie_Semua_Kelompok_1-4.pptx")
print("output/AK3U_Ajie_Semua_Kelompok_1-4.pptx", len(prs.slides.__iter__.__self__._sldIdLst), "slide")
