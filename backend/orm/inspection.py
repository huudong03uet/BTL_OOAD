from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, NVARCHAR, DateTime, ForeignKey
from fastapi_utils.guid_type import GUID
from datetime import datetime


Base = declarative_base()


class Inspection(Base):
    __tablename__ = "inspection"

    id = Column(GUID, primary_key=True)
    description_admin = Column(NVARCHAR, nullable=False)
    coin = Column(Integer, nullable=False, default=0)
    kind = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    update_at = Column(DateTime, nullable=False, default=datetime.now)

    item_id = Column(GUID, ForeignKey('item.id'))
    item = relationship('Item', back_populates='inspections')

    admin_id = Column(GUID, ForeignKey('admin.id'))
    admin = relationship('Admin', back_populates='inspections')
