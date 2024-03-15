from django.db import models

from constants import AuctionStatusType


class Auction(models.Model):
    name = models.CharField(max_length=512)
    condition_evalute = models.PositiveIntegerField(default=0)
    status = models.CharField(choices=AuctionStatusType.CHOICES, default=AuctionStatusType.Private)
    time = models.DateField(auto_now_add=True)
    time_register = models.DateField(auto_now_add=True)
    condition_coin = models.PositiveIntegerField(default=True)
    description = models.TextField(null=True, blank=True)
    create_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now_add=True)

