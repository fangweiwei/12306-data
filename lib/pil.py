from PIL import Image, ImageEnhance, ImageFilter
import sys, time
import tesseract
from libb import *
import StringIO


def guess(img_data):
  try:
    api = tesseract.TessBaseAPI()
    api.Init(".", "eng", tesseract.OEM_DEFAULT)
    api.SetVariable("tessedit_char_whitelist", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    im = Image.open( StringIO.StringIO(img_data) )
    im.load()
    if im.mode == 'RGBA': r, g, b, a = im.split() ;	im = Image.merge("RGB", (r, g, b))
    color_sep(im,3)
    color_fil(im)
    contents = get_pil_string(im)
    result = tesseract.ProcessPagesBuffer(contents, len(contents), api)
    if result == None: result = ''
    result = result.strip().replace(' ', '')
    return result
  except Exception, e:
    e