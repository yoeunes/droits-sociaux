Jekyll::Hooks.register :site, :after_init do |site|
  css_source = File.join(site.source, 'assets', 'css', 'style.css')
  js_source = File.join(site.source, 'assets', 'js', 'main.js')
  
  if File.exist?(css_source)
    content = File.read(css_source)
    site.config['css_version'] = Digest::MD5.hexdigest(content)[0..7]
  else
    site.config['css_version'] = Time.now.to_i.to_s
  end
  
  if File.exist?(js_source)
    content = File.read(js_source)
    site.config['js_version'] = Digest::MD5.hexdigest(content)[0..7]
  else
    site.config['js_version'] = Time.now.to_i.to_s
  end
end
