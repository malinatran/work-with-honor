require "prismic"
require 'sinatra'

class PreviewServer < Sinatra::Base
  set :port, 9000

  get '/preview' do
    system('PRISMIC_RELEASE=preview bundle exec middleman prismic; PRISMIC_RELEASE=preview bundle exec middleman build')
    api = Prismic.api('https://workwithhonor.prismic.io/api')
    preview_token = params[:token]
    link_resolver = Prismic::LinkResolver.new('preview') {|link| "#{link.type}/#{link.slug}"}
    redirect_url = api.preview_session(preview_token, link_resolver, '/')
    redirect_url.sub! 'post/', 'blog/'
    p "#{ENV['HOST']}#{redirect_url}"
    redirect "#{ENV['HOST']}/#{redirect_url}"
  end

  get '/build' do
    system('PRISMIC_RELEASE=master bundle exec middleman prismic; PRISMIC_RELEASE=master bundle exec middleman build')
    redirect "#{ENV['HOST']}"
  end

  get '*' do
    halt(404)
  end

  run! if app_file == $0
end
