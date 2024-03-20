from fastapi import APIRouter

from .login import router_login
from .signup import router_sign_up


router_auth = APIRouter()
router_auth.include_router(router_login)
router_auth.include_router(router_sign_up)
