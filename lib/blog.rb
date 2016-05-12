module BlogHelpers

  def post_header_type(post)
    post.fragments['background'].nil? ? 'dark' : 'full'
  end

  def post_background(post)
    if post.fragments['background'].nil?
      return ''
    else
      return "background-image: url('#{post.fragments['background'].main.url}');"
    end
  end

  def latest_posts(count = 2)
    posts = (data.posts.values.sort { |a, b| b.fragments['date'].value <=> a.fragments['date'].value })
    if count != 0
      return posts.slice(0, count)
    end
    return posts
  end

  def post_image(post, key = 'image')
    key = 'image' if post.fragments[key].nil?
    post.fragments[key].nil? ? '' : post.fragments[key].as_html(nil)
  end

  def resource_image_url(resource, key = 'image')
    return '' if resource.fragments[key].nil?
    resource.fragments[key].main.url
  end

  def post_author(post)
    authors = data.authors.select do |key, item|
      !post.fragments['author'].nil? && item.id == post.fragments['author'].id
    end
    if authors.values.empty?
      nil
    else
      authors.values[0]
    end
  end

  def post_link(post)
    url_for("/blog/#{post.slugs[0]}")
  end

  def featured_posts(count = 2)
    featured = data.posts.values.select { |post| post.fragments['featured'].nil? ? false : post.fragments['featured'].value == 'Yes'}
    (featured.sort { |a, b| b.fragments['date'].value <=> a.fragments['date'].value }).slice(0, count)
  end

  def author_posts(author)
    data.posts.select { |id, post| !post.fragments['author'].nil? && post.fragments['author'].id == author.id }
  end

  def author_link(author)
    url_for("/author/#{author.slugs[0]}")
  end

  def work_link(work)
    url_for("/work/#{work.slugs[0]}")
  end

  def work_sorted()
    values = data.works.values
    values.sort { |a, b| b.fragments['column'].value.to_i <=> a.fragments['column'].value.to_i }
  end

  def work_color(work)
    work.fragments.has_key?('tint') ? "##{work.fragments['tint'].value}" : 'black'
  end

  def latest_works(count = 2)
    works = (data.works.values.sort { |a, b| b.fragments['date'].value <=> a.fragments['date'].value })
    if count != 0
      return works.slice(0, count)
    end
    return works
  end

  def get_page_by_name(name)
    data.pages.select { |id, page| page.fragments['page_name'].value == name }.values[0]
  end

end
