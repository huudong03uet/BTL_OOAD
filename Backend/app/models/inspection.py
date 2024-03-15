from django.db import models

from .auction_admin import AuctionAdmin
from .item import Item


class Inspection(models.Model):
    admin = models.ForeignKey(AuctionAdmin, related_name='inspections', on_delete=models.CASCADE)
    item = models.ForeignKey(Item, related_name='inspections', on_delete=models.CASCADE)
    coin = models.PositiveIntegerField(default=0)
    kind = models.CharField()
    create_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now_add=True)

