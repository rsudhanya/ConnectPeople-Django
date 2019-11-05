ConnectPeople-Django

Chat application using Django

Need below python packages(Follow the version of sqlparse for djongo(mongodb connector))

aioredis
asgiref
asn1crypto
async-timeout
attrs
autobahn
Automat
blinker
certifi
cffi
channels
channels-redis
chardet
click
cloud-init
colorama
command-not-found
configobj
constantly
cryptography
daphne
dataclasses
distro-info
ubuntu0.18.04.1
Django
djongo==1.2.36
dnspython==1.16.0
#gunicorn==19.9.0
hibagent
hiredis
httplib2
hyperlink
idna
incremental
Jinja2
jsonpatch
jsonpointer
jsonschema
keyring
keyrings.alt
language-selector
MarkupSafe
msgpack
netifaces
oauthlib
PAM
pyasn1
pyasn1-modules
pycparser
pycrypto
pygobject
PyHamcrest
PyJWT
pymongo
pyOpenSSL
pyserial
python-apt
python-debian
pytz
pyxdg
PyYAML
requests
requests-unixsocket
SecretStorage
service-identity
six
sqlparse==0.2.4
ssh-import-id
systemd-python
Twisted
txaio
ufw
unattended-upgrades
urllib3
zope.interface



Make sure you have redis installed via docker, then run:

docker run -p 6379:6379 -d redis:2.8

This starts the redis server. We then use daphne to listen for both HTTP and Websocket requests on 0.0.0.0:8000.

Make sure you have nginx and correct port(8000) configuration(With security groups) at EC2 instance

daphne -p 8000 -b 0.0.0.0 ChatAplication.asgi:application

For static file and media file we have to configure nginx and settings.py

Do following:

nginx

vi /etc/nginx/sites-enabled/default

sudo systemctl reload nginx

settings.py
STATIC_URL = '{Your Website name}/static/'
MEDIA_URL = '{Your website name}/media/'
Then run daphne