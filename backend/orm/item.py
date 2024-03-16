from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, NVARCHAR, String, DateTime, ForeignKey
from fastapi_utils.guid_type import GUID
from datetime import datetime


Base = declarative_base()


class Item(Base):
    __tablename__ = "item"

    id = Column(GUID, primary_key=True)
    name = Column(NVARCHAR, nullable=False)
    image_path = Column(String, nullable=False)
    description = Column(NVARCHAR, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    user_id = Column(GUID, ForeignKey("user.id"))
    user = relationship("User", back_populates="items")

    auction_items = relationship(
        "AuctionItem",
        back_populates="item",
        foreign_keys="AuctionItem.item_id",
    )
    inspections = relationship(
        "Inspection",
        back_populates="item",
        foreign_keys="Inspection.item_id",
    )
    love_items = relationship(
        "LoveItem",
        back_populates="item",
        foreign_keys="LoveItem.item_id",
    )
