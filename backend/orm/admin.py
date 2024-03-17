from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, String, DateTime
from fastapi_utils.guid_type import GUID
from datetime import datetime


Base = declarative_base()


class Admin(Base):
    __tablename__ = "admin"

    id = Column(GUID, primary_key=True)
    user_name = Column(String, nullable=True)
    avatar_path = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    inspections = relationship(
        "Admin", back_populates="admin", foreign_keys="Inspection.admin_id"
    )
