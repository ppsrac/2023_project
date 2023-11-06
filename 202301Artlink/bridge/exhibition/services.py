from exhibition.models import Exhibition

def create_by_Id(id):
    Exhibition.objects.create(exhibitionid = id)

def delete_by_Id(id):
    exhibition = Exhibition.objects.filter(exhibitionid = id).first()
    exhibition.delete()

def find_by_Id(id):
    return Exhibition.objects.filter(exhibitionid = id).first()

def get_all_exhibitions():
    exhibitions = Exhibition.objects.all()
    return [exhibition.exhibitionid for exhibition in exhibitions]