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

  def latest_posts(posts)
    posts.values.sort { |a, b| b.fragments['date'].value <=> a.fragments['date'].value }
  end

  def post_image(post)
    post.fragments['image'].nil? ? '' : post.fragments['image'].as_html(nil)
  end

  def post_author(post)
    data.authors.select {|key, item| item.id == post.fragments['author'].id}.values[0]
  end

  def post_link(post)
    url_for("/blog/#{post.slugs[0]}.html")
  end

end
