# Install for the first time

This uses Jekyll which is wonderful, but unfortunately requires Ruby on a mac, which is not.

Install the xcode command line tools for your flavour of MacOS from: https://developer.apple.com/download/more/

Install rvm:

    curl -sSL https://get.rvm.io | bash -s

Install ruby:

    bash # to get your newly installed rvm
    rvm install 3.0.0

# Create site

Install Jekyll:

  gem install bundler jekyll
  jekyll new <SITE>
  cd <SITE>

Edit the Gemfile and change:

  gem "minima"

to:

  gem "minimal-mistakes-jekyll"

Then run:

  bundle

Edit _config.yaml and change:

  theme: minima

to:

  theme: minimal-mistakes-jekyll

Then add a few more dependencies:

  gem install eventmachine -- --with-openssl-dir=/usr/local/opt/openssl@1.1
  bundle add webrick

# Develop

  bundle exec jekyll serve
