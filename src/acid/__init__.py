"""Acid XBlock: a test XBlock for verifying XBlock runtime functionality."""

from importlib.metadata import version

from .acid import AcidBlock, AcidParentBlock, AcidAside

__version__ = version("acid-xblock")
