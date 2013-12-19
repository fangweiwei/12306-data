# coding: utf-8
import math
import StringIO


def color_cmp(ar, ag, ab, br, bg, bb):
    # 通过HSV比较两个子RGB的色差
    # 比较两个RGB的色差
    absR = ar - br
    absG = ag - bg
    absB = ab - bb
    if ( math.sqrt(absR * absR + absG * absG + absB * absB) < 1.5):
        return True
    return False


def color_distance(rgb1, rgb2):
    '''d = {} distance between two colors(3)'''
    rm = 0.5 * (rgb1[0] + rgb2[0])
    d = sum(( 2 + rm, 4, 3 - rm ) * (rgb1 - rgb2) ** 2) ** 0.5
    return d


def color_tol(c1, c2):
    try:
        rtol, gtol, btol = 85, 85, 85
        if abs(c1[0] - c2[0]) <= rtol and \
                        abs(c1[1] - c2[1]) <= gtol and \
                        abs(c1[2] - c2[2]) <= btol:
            return True
        else:
            return False
    except StandardError, e:
        e
        return False


def has_color(colors, color):
    b = None
    for c in colors:
        if color_tol(color, c):
            return c
    return b


white = (255, 255, 255)


def color_sep(img, count=3):
    min, max = [127, 127, 127], [128, 128, 128]
    w, h = img.size
    pix = img.load()
    for x in xrange(w):
        for y in xrange(h):
            if max[0] < pix[x, y][0]: max[0] = pix[x, y][0]
            if max[1] < pix[x, y][1]: max[1] = pix[x, y][1]
            if max[2] < pix[x, y][2]: max[2] = pix[x, y][2]

            if min[0] > pix[x, y][0]: min[0] = pix[x, y][0]
            if min[1] > pix[x, y][1]: min[1] = pix[x, y][1]
            if min[2] > pix[x, y][2]: min[2] = pix[x, y][2]
    #print min, max
    d = [(max[0] - min[0]) * 1.0 / count, (max[1] - min[1]) * 1.0 / count, (max[2] - min[2]) * 1.0 / count]
    targetD = [255.0 / (count - 1), 255.0 / (count - 1), 255.0 / (count - 1)]
    #print d, targetD
    for x in xrange(w):
        for y in xrange(h):
            new = ( int(int((pix[x, y][0] - min[0]) / d[0]) * targetD[0]), \
                    int(int((pix[x, y][1] - min[1]) / d[1]) * targetD[1]), \
                    int(int((pix[x, y][2] - min[2]) / d[2]) * targetD[2]) )
            pix[x, y] = new


def color_fil(img):
    pix = img.load()
    w, h = img.size

    for x in xrange(w):
        for y in xrange(h):
            yup = y - 1 if y >= 1 else 1
            ydn = y + 1 if y <= h - 2 else h - 2
            if ( pix[x, yup] == white and pix[x, ydn] == white  ):
                pix[x, y] = white

def get_pil_string(im):
    output = StringIO.StringIO()
    im.save(output, format="BMP")
    contents = output.getvalue()
    output.close()
    return contents