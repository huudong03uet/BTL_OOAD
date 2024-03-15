from django.db import models

from .auction_user import AuctionUser
from .item import Item


class Report(models.Model):
    auction_user = models.ForeignKey(AuctionUser, on_delete=models.CASCADE, related_name="reports")
    evalute_user = models.ForeignKey(AuctionUser, on_delete=models.CASCADE, related_name="reports")
    star = models.PositiveIntegerField(default=0)
