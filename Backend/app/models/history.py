from django.db import models

from .auction_user import AuctionUser
from .item import Item


class History(models.Model):
    description = models.TextField(null=True, blank=True)
    auction_user = models.ManyToManyField(AuctionUser, related_name="histories")
    item = models.ManyToManyField(Item, related_name="histories")