from django.db import models

from .auction_user import AuctionUser
from .item import Item


class LoveItem(models.Model):
    auction_user = models.ForeignKey(AuctionUser, on_delete=models.CASCADE, related_name="love")
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="love")
    create_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now_add=True)