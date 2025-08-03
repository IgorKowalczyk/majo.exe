ARG APP_PKG_NAME=@majoexe/bot

FROM node:22-alpine

RUN apk add --no-cache \
    build-base \
    autoconf \
    automake \
    libtool \
    pkgconfig \
    git \
    wget \
    nasm \
    bash \
    libjpeg-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libimagequant-dev \
    tiff-dev \
    zlib-dev \
    cairo-dev \
    glib-dev \
    gobject-introspection-dev \
    libxml2-dev \
    libexif-dev \
    ffmpeg-dev \
    libde265-dev \
    x265-dev \
    libde265 \
    x265-libs \
    aom-dev \
    aom-libs \
    cmake \
    ninja \
    g++ \
    make \
    meson \
    fftw-dev \
    orc-dev \
    lcms2-dev \
    pango-dev \
    fontconfig-dev \
    openjpeg-dev \
    poppler-dev \
    librsvg-dev \
    openexr-dev \
    cfitsio-dev \
    giflib-dev \
    imagemagick-dev \
    libarchive-dev

# Build latest libheif from source
ENV LIBHEIF_VERSION=1.20.1
ENV VIPS_VERSION=8.17.1

RUN wget https://github.com/strukturag/libheif/releases/download/v${LIBHEIF_VERSION}/libheif-${LIBHEIF_VERSION}.tar.gz && \
    tar xf libheif-${LIBHEIF_VERSION}.tar.gz && \
    cd libheif-${LIBHEIF_VERSION} && \
    mkdir build && \
    cd build && \
    cmake -DENABLE_PLUGIN_LOADING=NO --preset=release .. && \
    make && \
    make install && \
    cd ../.. && \
    rm -rf libheif-${LIBHEIF_VERSION}

# Build latest libvips from source with all format support
RUN wget https://github.com/libvips/libvips/releases/download/v${VIPS_VERSION}/vips-${VIPS_VERSION}.tar.xz && \
    tar xf vips-${VIPS_VERSION}.tar.xz && \
    cd vips-${VIPS_VERSION} && \
    meson setup build \
      --buildtype=release \
      -Dintrospection=disabled \
      -Dheif=enabled \
      -Dfftw=enabled \
      -Dorc=enabled \
      -Dlcms=enabled \
      -Dfontconfig=enabled \
      -Dopenjpeg=enabled \
      -Dpoppler=enabled \
      -Drsvg=enabled \
      -Dopenexr=enabled \
      -Dcfitsio=enabled \
      -Dmagick=enabled \
      -Dexamples=false && \
    meson compile -C build && \
    meson install -C build && \
    cd .. && \
    rm -rf vips-${VIPS_VERSION}*

# Link libraries (Alpine uses /etc/ld-musl-*.path files instead of ld.so.conf)
RUN mkdir -p /etc/ld-musl-$(uname -m).path.d && \
    echo "/usr/lib" > /etc/ld-musl-$(uname -m).path.d/libvips.conf && \
    echo "/usr/lib" >> /etc/ld-musl-$(uname -m).path.d/libheif.conf && \
    echo "/usr/local/lib" >> /etc/ld-musl-$(uname -m).path.d/libvips.conf && \
    echo "/usr/local/lib" >> /etc/ld-musl-$(uname -m).path.d/libheif.conf

RUN vips --version

WORKDIR /app

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV npm_config_sharp_libvips=system

RUN corepack enable \
  && corepack prepare pnpm@latest --activate \
  && curl -sfS https://dotenvx.sh/install.sh | sh

COPY . .

RUN pnpm install --recursive --prod
RUN pnpm rebuild -r

CMD ["dotenvx", "run", "--", "pnpm", "run", "deploy", "--filter", "!@majoexe/dashboard"]