FROM node:22-bullseye

WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive
ENV LD_LIBRARY_PATH=/usr/local/lib
ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1

# Install system dependencies for libvips and build tools
RUN apt-get update && apt-get install -y \
  python3-pip meson ninja-build build-essential nasm cmake unzip wget git pkg-config \
  libglib2.0-dev libexpat-dev libpng-dev libexif-dev liblcms2-dev liborc-dev \
  automake libgirepository1.0-dev gtk-doc-tools libfftw3-dev libgif-dev libgsf-1-dev \
  libmagickwand-dev libmatio-dev libopenexr-dev libopenslide-dev liborc-0.4-dev swig \
  libexif-dev libtiff5-dev libcfitsio-dev libpoppler-glib-dev libpango1.0-dev \
  libffi-dev libopenjp2-7-dev libimagequant-dev libarchive-dev \
  libnifti-dev librsvg2-2 librsvg2-dev librsvg2-common liblqr-1-0 liblqr-1-0-dev \
  libltdl-dev libltdl7 libjpeg-dev libjpeg62-turbo-dev libpng16-16 libtiff-dev \
  libfontconfig1-dev libfreetype6-dev libxml2-dev libde265-0 libde265-dev x265 \
  libx265-dev libtool libsdl1.2-dev libgif-dev bc curl

# Build and install libvips
ARG LIB_VIPS_VERSION=8.17.0
RUN curl -fsL https://github.com/libvips/libvips/releases/download/v${LIB_VIPS_VERSION}/vips-${LIB_VIPS_VERSION}.tar.xz -o libvips.tar.xz && \
  tar -xvf libvips.tar.xz && cd vips-${LIB_VIPS_VERSION} && \
  meson setup build --libdir=lib -Dintrospection=disabled && \
  cd build && \
  meson compile && \
  meson test && \
  meson install && \
  cd ../.. && \
  rm -rf vips-${LIB_VIPS_VERSION} libvips.tar.xz

RUN vips --version

# Enable corepack and install dotenvx
RUN corepack enable \
  && corepack prepare pnpm@latest --activate \
  && curl -sfS https://dotenvx.sh/install.sh | sh

COPY . .

RUN pnpm install --recursive --prod
RUN pnpm rebuild -r

CMD ["dotenvx", "run", "--", "pnpm", "run", "deploy", "--filter", "!@majoexe/dashboard"]