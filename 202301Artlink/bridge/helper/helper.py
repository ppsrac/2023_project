import sys, os


def rotation(point, slope):
    cos, sin = 1. / (1. + slope * slope) ** 0.5, slope / (1. + slope * slope) ** 0.5
    x, y = point[0], point[1]
    n_x, n_y = cos * x + sin * y, -sin * x + cos * y
    return [n_x, n_y]


def n_slope(slope1, slope2):
    return (slope1 - slope2) / (1. + slope1 * slope2)


def line_intersection(l1, l2):
    if (l1[0] == 0 and l2[0] == 0) or (l1[1] == 0 and l2[1] == 0):
        raise ValueError("Two lines have same slope")
    if (abs((l1[0] / l1[1]) - (l2[0] / l2[1])) < 1.e-9 or abs((l1[1] / l1[0]) - (l2[1] / l2[0]))) < 1.e-9:
        raise ValueError("Two lines have same slope")
    x = (l1[2] * l2[1] - l2[2] * l1[1]) / (l1[0] * l2[1] - l2[0] * l1[1])
    y = (l1[2] * l2[0] - l2[2] * l1[0]) / (l1[1] * l2[0] - l2[1] * l1[0])
    return [x, y]


def get_coord(d1, d2, d3, coor1, coor2, coor3):
    c1 = d1 * d1 - coor1[0] * coor1[0] - coor1[1] * coor1[1]
    c2 = d2 * d2 - coor2[0] * coor2[0] - coor2[1] * coor2[1]
    c3 = d3 * d3 - coor3[0] * coor3[0] - coor3[1] * coor3[1]

    l1 = [2. * (coor1[0] - coor2[0]), 2. * (coor1[1] - coor2[1]), c2 - c1]
    l2 = [2. * (coor2[0] - coor3[0]), 2. * (coor2[1] - coor3[1]), c3 - c2]
    print('l1, l2', l1, l2)
    return line_intersection(l1, l2)


def center_rotation(point, center, slope):
    c_x, c_y = center[0], center[1]
    p_x, p_y = point[0], point[1]
    x1, y1 = p_x - c_x, p_y - c_y
    n_coor = rotation([x1, y1], slope)
    x1, y1 = n_coor[0], n_coor[1]
    x1 += c_x;
    y1 += c_y
    return [x1, y1]


def dist(point1, point2):
    return (point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2
