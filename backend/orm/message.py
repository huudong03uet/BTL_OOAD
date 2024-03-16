from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, NVARCHAR, DateTime, ForeignKey
from fastapi_utils.guid_type import GUID
from datetime import datetime


Base = declarative_base()


class Message(Base):
    __tablename__ = "message"

    id = Column(GUID, primary_key=True)
    content = Column(NVARCHAR, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    user_id = Column(GUID, ForeignKey("user.id"))
    user = relationship("User", back_populates="messages")

    auction_user_id = Column(GUID, ForeignKey("auction_user.id"))
    auction_user = relationship("AuctionUser", back_populates="messages")
