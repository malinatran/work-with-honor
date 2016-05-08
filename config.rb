# custom helpers
require "lib/blog"
helpers BlogHelpers

# ignore templates
ignore "/blog_post.html"
ignore "/writer_page.html"
ignore "/work_post.html"

# prismic data fetching
activate :prismic do |f|
  f.path = 'data'
  f.api_url = 'https://workwithhonor.prismic.io/api'
  f.release = ENV['PRISMIC_RELEASE'] || 'master'
  f.token = 'MC5WcFNheVI4QUFId05IVDM5.N--_ve-_ve-_ve-_ve-_vQh7YjXvv70teFrvv70cQO-_vXjvv73vv70qUe-_vQDvv73vv73vv70cD--_ve-_vQ'
  f.link_resolver = ->(link) { binding.pry; "#{link.type.pluralize}/#{link.slug}"}
end

activate :deploy do |deploy|
  deploy.method = :rsync
  deploy.user = 'root'
  deploy.host = '107.170.245.80'
  deploy.path = '/home/wwh/workwithhonor.com'
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

# generate blog posts pages
if data.has_key?('authors')
  data.authors.each do |id, author|
    proxy("/author/#{author.slugs[0]}.html",
      '/writer_page.html',
      :locals => {
        :author => author,
        :posts => author_posts(author)
      },
      :ignore => true
    )
  end
end

# generate blog posts pages
if data.has_key?('works')
  data.works.each do |id, post|
    proxy("/work/#{post.slugs[0]}.html",
      '/work_post.html',
      :locals => {
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

set :fonts_dir, 'stylesheets/fonts'

set :images_dir, 'images'

set :partials_dir, '_partials'

activate :directory_indexes

# Build-specific configuration
configure :build do

  # Enable cache buster
  activate :asset_hash

  activate :minify_html

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
