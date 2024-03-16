from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, DateTime, ForeignKey
from fastapi_utils.guid_type import GUID
from datetime import datetime


Base = declarative_base()


class LoveItem(Base):
    __tablename__ = "love_item"

    id = Column(GUID, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    user_id = Column(GUID, ForeignKey("user.id"))
    user = relationship("User", back_populates="love_items")

    item_id = Column(GUID, ForeignKey('item.id'))
    item = relationship('Item', back_populates='love_items')
