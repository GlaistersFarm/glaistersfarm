# Theme

This website is based on the Jekyll theme https://mmistakes.github.io.

# Install for the first time

This uses Jekyll which is wonderful, but unfortunately requires Ruby on a mac, which is not.

Install the xcode command line tools for your flavour of MacOS from: https://developer.apple.com/download/more/

Install rvm:

    curl -sSL https://get.rvm.io | bash -s

Install ruby:

    bash # to get your newly installed rvm
    rvm install 3.0.0

Install as per remote-theme in https://mmistakes.github.io/minimal-mistakes/

Then add a few more dependencies:

    gem install eventmachine -- --with-openssl-dir=/usr/local/opt/openssl@1.1
    bundle add webrick

# Develop

Get the site:

    git clone https://github.com/GlaistersFarm/glaistersfarm.git
    cd glaistersfarm
    bundle install

Then serve:

    bundle exec jekyll serve
