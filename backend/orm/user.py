from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, TEXT, DateTime, ForeignKey
from fastapi_utils.guid_type import GUID
from datetime import datetime


from .item import Item


Base = declarative_base()

class Item(Base):
    __tablename__ = "item"

    id = Column(GUID, primary_key=True)
    name = Column(TEXT, nullable=False)
    image_path = Column(String, nullable=False)
    description = Column(TEXT, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    user_id = Column(GUID, ForeignKey("user.id"))
    user = relationship("User", back_populates="items")

    # auction_items = relationship(
    #     "AuctionItem",
    #     back_populates="item",
    #     foreign_keys="AuctionItem.item_id",
    # )
    # inspections = relationship(
    #     "Inspection",
    #     back_populates="item",
    #     foreign_keys="Inspection.item_id",
    # )
    # love_items = relationship(
    #     "LoveItem",
    #     back_populates="item",
    #     foreign_keys="LoveItem.item_id",
    # )


class User(Base):
    __tablename__ = "user"

    id = Column(GUID, primary_key=True)
    user_name = Column(String, nullable=True)
    avatar_path = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    evaluate = Column(TEXT, nullable=True)
    coin = Column(Integer, nullable=False, default=0)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    items = relationship("Item", back_populates="user")
    # messages = relationship(
    #     "Message", back_populates="user", foreign_keys="Message.user_id"
    # )
    # love_items = relationship(
    #     "LoveItem", back_populates="user", foreign_keys="LoveItem.user_id"
    # )
    # created_reports = relationship(
    #     "Report", back_populates="creator", foreign_keys="Report.creator_id"
    # )
    # histories = relationship(
    #     "History", back_populates="user", foreign_keys="History.user_id"
    # )
    # auction_users = relationship(
    #     "AuctionUser",
    #     back_populates="user",
    #     foreign_keys="AuctionUser.user_id",
    # )
    # evaluated_reports = relationship(
    #     "Report",
    #     back_populates="evaluatee",
    #     foreign_keys="Report.evaluatee_id",
    # )
    # auction_items = relationship(
    #     "AuctionItem",
    #     back_populates="user",
    #     foreign_keys="AuctionItem.user_sell",
    # )
