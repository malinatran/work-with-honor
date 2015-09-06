require 'yaml'
require 'fileutils'

module Middleman
  module Cli

    class Prismic < Thor

      check_unknown_options!

      namespace :prismic
      desc 'prismic', 'Import data from Prismic'

      def self.source_root
        ENV['MM_ROOT']
      end

      # Tell Thor to exit with a nonzero exit code on failure
      def self.exit_on_failure?
        true
      end

      def prismic
        ::Middleman::Application.server.inst
        reference = MiddlemanPrismic.options.release

        # middleman data path
        path = MiddlemanPrismic.options.path

        # create data path
        Dir.mkdir(path) unless File.exists?(path)

        # FileUtils.rm_rf(Dir.glob('data/prismic_*'))

        api = ::Prismic.api(MiddlemanPrismic.options.api_url)
        response = api.form('everything').submit(api.ref(reference))

        # get documents
        available_documents = []
        response.each {|d| available_documents << d.type}
        available_documents.uniq!

        available_documents.each do |type|

          type_plura = type.pluralize

          # remove existing data
          FileUtils.rm_rf(Dir.glob("#{path}/#{type_plura}"))
          Dir.mkdir("#{path}/#{type_plura}")

          documents = response.select{|d| d.type == type}

          # store each document
          documents.each_with_index do |document, index|
            File.open("#{path}/#{type_plura}/#{document.id}.yaml", 'w') do |f|
              f.write(document.to_yaml)
            end
          end

        end

        # store api reference
        File.open("#{path}/prismic_reference.yaml", 'w') do |f|
          f.write(api.master_ref.to_yaml)
        end

        # TODO
        # MiddlemanPrismic.options.custom_queries.each do |k, v|
        #   response = api.form('everything').query(*v).submit(api.master_ref)
        #   File.open("data/prismic_custom_#{k}", 'w') do |f|
        #     f.write(Hash[[*response.map.with_index]].invert.to_yaml)
        #   end
        # end

      end

    end
  end
end
