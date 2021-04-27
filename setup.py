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


def load_requirements(*requirements_paths):
    """
    Load all requirements from the specified requirements files.
    Returns a list of requirement strings.
    """
    requirements = set()
    for path in requirements_paths:
        with open(path) as reqs:
            requirements.update(
                line.split('#')[0].strip() for line in reqs
                if is_requirement(line.strip())
            )
    return list(requirements)


README = open(os.path.join(os.path.dirname(__file__), 'README.md')).read()


def is_requirement(line):
    """
    Return True if the requirement line is a package requirement;
    that is, it is not blank, a comment, a URL, or an included file.
    """
    return line and not line.startswith(('-r', '#', '-e', 'git+', '-c'))


setup(
    name='acid-xblock',
    version='0.2.1',
    description='Acid XBlock Test',
    long_description=README,
    long_description_content_type='text/markdown',
    author='edX',
    author_email='oscm@edx.org',
    url='https://github.com/edx/acid-block',
    packages=[
        'acid',
    ],
    include_package_data=True,
    install_requires=load_requirements('requirements/base.in'),
    entry_points={
        'xblock.v1': [
            'acid = acid:AcidBlock',
            'acid_parent = acid:AcidParentBlock',
        ],
        'xblock_asides.v1': [
            'acid_aside = acid:AcidAside',
        ]
    },
    package_data=package_data("acid", ["static", "public"]),
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: Apache Software License',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.8',
    ]
)
