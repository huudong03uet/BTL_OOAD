from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, NVARCHAR, String, DateTime
from fastapi_utils.guid_type import GUID
from datetime import datetime


Base = declarative_base()


class Auction(Base):
    __tablename__ = "auction"

    id = Column(GUID, primary_key=True)
    name = Column(NVARCHAR, nullable=False)
    condition_evaluate = Column(Integer, nullable=True)
    status = Column(String, nullable=False)
    time_auction = Column(DateTime, nullable=False, default=datetime.now)
    description = Column(NVARCHAR, nullable=True)
    time_register = Column(DateTime, nullable=False, default=datetime.now)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    auction_users = relationship(
        "AuctionUser",
        back_populates="auction",
        foreign_keys="AuctionUser.auction_id",
    )
    auction_items = relationship(
        "AuctionItem",
        back_populates="auction",
        foreign_keys="AuctionItem.auction_id",
    )
