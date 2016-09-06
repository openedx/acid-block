"""Set up for XBlock acid block."""

import os

from setuptools import setup

def package_data(pkg, roots):
    """Generic function to find package_data for `pkg` under `root`."""
    data = []
    for root in roots:
        for dirname, _, files in os.walk(os.path.join(pkg, root)):
            for fname in files:
                data.append(os.path.relpath(os.path.join(dirname, fname), pkg))

    return {pkg: data}

setup(
    name='acid-xblock',
    version='0.1',
    description='Acid XBlock Test',
    packages=[
        'acid',
    ],
    install_requires=[
        'XBlock',
        'Mako',
        'lazy',
    ],
    entry_points={
        'xblock.v1': [
            'acid = acid:AcidBlock',
            'acid_parent = acid:AcidParentBlock',
        ],
        'xblock_asides.v1': [

            # Asides aren't ready yet, so we'll disable
            # this for now.  When we get back to working on asides, we'll come
            # up with a more sophisticated mechanism to enable this for the
            # developers that want to see it.
            # 'acid_aside = acid:AcidAside',
        ]
    },
    package_data=package_data("acid", ["static", "public"]),
)
