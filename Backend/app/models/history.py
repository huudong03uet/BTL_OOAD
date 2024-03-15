from django.db import models

from .auction_user import AuctionUser
from .item import Item


class History(models.Model):
    description = models.TextField(null=True, blank=True)
    auction_user = models.ForeignKey(AuctionUser, on_delete=models.CASCADE, related_name="histories")
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="histories", null=True, blank=True)
    amount = models.PositiveIntegerField(default=0)