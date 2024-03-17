from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, DateTime, ForeignKey
from fastapi_utils.guid_type import GUID
from datetime import datetime


Base = declarative_base()


class AuctionItem(Base):
    __tablename__ = "auction_item"

    id = Column(GUID, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    user_sell = Column(GUID, ForeignKey("user.id"))
    user = relationship("User", back_populates="auction_items")

    auction_id = Column(GUID, ForeignKey("auction.id"))
    auction = relationship("Auction", back_populates="auction_items")

    auction_user_id = Column(GUID, ForeignKey("auction_user.id"))
    auction_user = relationship("AuctionUser", back_populates="auction_items")

    item_id = Column(GUID, ForeignKey("item.id"))
    item = relationship("Item", back_populates="auction_items")

    histories = relationship(
        "History",
        back_populates="auction_item",
        foreign_keys="History.auction_item_id",
    )
