from setuptools import setup

setup(
    name='my_app',
    version='1.0',
    packages=['my_app'],
    install_requires=[
        'mysql-connector-python',
        'faker'
    ],
    entry_points={
        'console_scripts': [
            'my_app=my_app.__main__:main'
        ]
    },
)
