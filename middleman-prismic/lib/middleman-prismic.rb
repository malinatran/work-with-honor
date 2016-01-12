require 'prismic'
require 'middleman-prismic/version'
require 'middleman-prismic/commands/prismic'

module MiddlemanPrismic
  class << self
    attr_reader :options
  end

  class Core < Middleman::Extension

    option :path, 'data', 'Storeage path'
    option :api_url, nil, 'The prismic api url'
    option :release, 'master', 'Content release'
    option :token, '', 'Access token'
    option(
      :link_resolver,
      ->(link) {"http://www.example.com/#{link.type.pluralize}/#{link.slug}"},
      'The link resolver'
    )
    option :custom_queries, {}, 'Custom queries'

    def initialize(app, options_hash={}, &block)
      super
      MiddlemanPrismic.instance_variable_set('@options', options)
    end

    helpers do

      def reference
        ref = YAML::load(File.read('data/prismic_reference'))
        ref.class.send(
          :define_method, :link_to, MiddlemanPrismic.options.link_resolver
        )
        return ref
      end
    end

  end

end

::Middleman::Extensions.register(:prismic, MiddlemanPrismic::Core)
