$(function() {
  if($('#disqus_thread').length === 0) {
    return;
  }
  var disqus_shortname = 'workwithhonorcom';
  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
});
