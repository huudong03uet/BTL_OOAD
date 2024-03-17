from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, TEXT, DateTime, ForeignKey
from fastapi_utils.guid_type import GUID
from datetime import datetime


Base = declarative_base()


class History(Base):
    __tablename__ = "history"

    id = Column(GUID, primary_key=True)
    description = Column(TEXT, nullable=True)
    amount = Column(Integer, nullable=False, default=0)
    kind = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    user_id = Column(GUID, ForeignKey("user.id"))
    user = relationship("User", back_populates="histories")

    auction_item_id = Column(GUID, ForeignKey("auction_item.id"))
    auction_item = relationship("AuctionItem", back_populates="histories")
