from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, DateTime, ForeignKey
from fastapi_utils.guid_type import GUID
from datetime import datetime


Base = declarative_base()


class AuctionUser(Base):
    __tablename__ = "auction_user"

    id = Column(GUID, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    user_id = Column(GUID, ForeignKey("user.id"))
    user = relationship("User", back_populates="auction_users")

    auction_id = Column(GUID, ForeignKey("auction.id"))
    auction = relationship("Auction", back_populates="auction_users")

    message = relationship(
        "Message",
        back_populates="auction_user",
        foreign_keys="Message.auction_id",
    )
