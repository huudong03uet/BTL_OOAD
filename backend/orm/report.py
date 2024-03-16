from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, NVARCHAR, DateTime, ForeignKey
from fastapi_utils.guid_type import GUID
from datetime import datetime


Base = declarative_base()


class Report(Base):
    __tablename__ = "report"

    id = Column(GUID, primary_key=True)
    content = Column(NVARCHAR, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    creator_id = Column(GUID, ForeignKey('user.id'))
    creator = relationship("User", back_populates="created_reports")

    evaluatee_id = Column(GUID, ForeignKey('user.id'))
    evaluatee = relationship("User", back_populates="evaluated_reports")
