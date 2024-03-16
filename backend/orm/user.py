from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, NVARCHAR, DateTime
from fastapi_utils.guid_type import GUID
from datetime import datetime


Base = declarative_base()


class User(Base):
    __tablename__ = "user"

    id = Column(GUID, primary_key=True)
    user_name = Column(String, nullable=True)
    avatar_path = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    evaluate = Column(NVARCHAR, nullable=True)
    coin = Column(Integer, nullable=False, default=0)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    items = relationship(
        "Item", back_populates="user", foreign_keys="Item.user_id"
    )
    messages = relationship(
        "Message", back_populates="user", foreign_keys="Message.user_id"
    )
    love_items = relationship(
        "LoveItem", back_populates="user", foreign_keys="LoveItem.user_id"
    )
    created_reports = relationship(
        "Report", back_populates="creator", foreign_keys="Report.creator_id"
    )
    histories = relationship(
        "History", back_populates="user", foreign_keys="History.user_id"
    )
    auction_users = relationship(
        "AuctionUser",
        back_populates="user",
        foreign_keys="AuctionUser.user_id",
    )
    evaluated_reports = relationship(
        "Report",
        back_populates="evaluatee",
        foreign_keys="Report.evaluatee_id",
    )
    auction_items = relationship(
        "AuctionItem",
        back_populates="user",
        foreign_keys="AuctionItem.user_sell",
    )
