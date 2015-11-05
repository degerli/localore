from environ import Env

import os

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(PROJECT_DIR)

# set default values and casting
env = Env(
    ALLOWED_HOSTS=(list, []),
    DEBUG=(bool, False),
    DJANGO_LOG_LEVEL=(str, 'INFO'),
    MEDIA_ROOT=(str, os.path.join(BASE_DIR, 'media')),
)
Env.read_env()

DEBUG = env('DEBUG')

SECRET_KEY = env('SECRET_KEY')

ALLOWED_HOSTS = env('ALLOWED_HOSTS')

# make Django log to stderr
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': env('DJANGO_LOG_LEVEL'),
        },
    },
}

# log e-mails to console in development
if DEBUG:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


# Application definition

INSTALLED_APPS = (
    'home',
    'search',

    'wagtail.wagtailforms',
    'wagtail.wagtailredirects',
    'wagtail.wagtailembeds',
    'wagtail.wagtailsites',
    'wagtail.wagtailusers',
    'wagtail.wagtailsnippets',
    'wagtail.wagtaildocs',
    'wagtail.wagtailimages',
    'wagtail.wagtailsearch',
    'wagtail.wagtailadmin',
    'wagtail.wagtailcore',

    'modelcluster',
    'compressor',
    'taggit',
    'overextends',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',

    'wagtail.wagtailcore.middleware.SiteMiddleware',
    'wagtail.wagtailredirects.middleware.RedirectMiddleware',
)

ROOT_URLCONF = 'localore.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(PROJECT_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
if DEBUG:
    for template_engine in TEMPLATES:
        template_engine['OPTIONS']['debug'] = True

WSGI_APPLICATION = 'localore.wsgi.application'


# Database

DATABASES = {
    'default': env.db()
}


# Internationalization

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/New_York'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)

# Fingerprint static resources (cache busting) so that we can serve them
# with far-future expires headers and not run into stale cache problems.
# This makes the static template tag insert content hashes into filenames.
STATICFILES_STORAGE = (
    'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'
)

# make Django Compressor work with `./manage.py collectstatic`
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
)

# will be using `./manage.py compress` to pre-build compress-tagged assets
COMPRESS_OFFLINE = True

# any template variables inside compress blocks have to be declared here
#COMPRESS_OFFLINE_CONTEXT = {
#}

# minify CSS
COMPRESS_CSS_FILTERS = [
    'compressor.filters.css_default.CssAbsoluteFilter',
    'compressor.filters.cssmin.CSSMinFilter',
]

# don't append query strings to url() assets in CSS
COMPRESS_CSS_HASHING_METHOD = None

# additional absolute paths the staticfiles app will traverse if the
# FileSystemFinder finder is enabled, e.g. if you use the collectstatic or
# findstatic management command or use the static file serving view
STATICFILES_DIRS = (
    os.path.join(PROJECT_DIR, 'static'),
)

# absolute path to the directory where collectstatic
# will collect static files for deployment
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# URL to use when referring to static files located in STATIC_ROOT
STATIC_URL = '/static/'

MEDIA_ROOT = env('MEDIA_ROOT')
MEDIA_URL = '/media/'


# Wagtail settings

WAGTAIL_SITE_NAME = "Localore: Finding America"
