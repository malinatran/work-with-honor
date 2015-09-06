# custom helpers
require "lib/blog"
helpers BlogHelpers

# ignore templates
ignore "/blog_post.html"

# prismic data fetching
activate :prismic do |f|
  f.path = 'data'
  f.api_url = 'https://workwithhonor.prismic.io/api'
  f.release = 'master'
  f.link_resolver = ->(link) { binding.pry; "#{link.type.pluralize}/#{link.slug}"}
end

# generate blog posts pages
if data.has_key?('posts')
  data.posts.each do |id, post|
    proxy("/blog/#{post.slugs[0]}.html",
      '/blog_post.html',
      :locals => {
        :header_class => post_header_type(post),
        :author => post_author(post),
        :post => post
      },
      :ignore => true
    )
  end
end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
helpers do
  def pretty_date(date)
    date.strftime('%B %d, %Y')
  end
end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :partials_dir, 'partials'

activate :directory_indexes

# Build-specific configuration
configure :build do

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
