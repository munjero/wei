---
title: Pagination for Multilingual Jekyll Website
subtitle: Sometimes Pagination is Hard.
---

*October 22, 2015*

[la efku](https://efku.la) was once a multilingual website managed by
Jekyll. There was pagination pages that I wanted to create based on
different categories and different languages. So I created a small
plugin that did this for me.

~~~ ruby
if site.config["category_paginate"]
  site.config["category_paginate"].each do |pagination|
    template = pagination["template"]
    query = pagination["query"]
    paginate_count = pagination["paginate"]
    path = pagination["path"]

    all_posts = site.site_payload["site"]["posts"]
    if query and query["lang"]
      all_posts = all_posts.select { |x| x.data["lang"] == query["lang"] }
    end
    if query and query["category"]
      all_posts = all_posts.select { |x| x.categories.include? query["category"] }
    end

    if template_page(site, template)
      paginate(site, template_page(site, template), paginate_count, path, all_posts)
    else
      Jekyll.logger.warn "Category Pagination:", "Cannot find template #{template}, skipping this pagination."
    end
  end
end
~~~

It creates the pagination based on the `lang` attribute and `category`
attribute of a post. You can simply specify all pagination you want to
create in `_config.yml`. For example:

~~~ yaml
category_paginate:
  - query:
      lang:           "jbo"
      category:       "selpei"
    template:         "/selpei/index.html"
    path:             "/selpei/:num/"
    paginate:         1
  - query:
      lang:           "en"
      category:       "selpei"
    template:         "/selpei/en.html"
    path:             "/selpei/en/:num/"
    paginate:         1
  - query:
      lang:           "jbo"
      category:       "pemci"
    template:         "/pemci/index.html"
    path:             "/pemci/:num/"
    paginate:         10
  - query:
      lang:           "en"
      category:       "pemci"
    template:         "/pemci/en/index.html"
    path:             "/pemci/en/:num/"
    paginate:         10
  - query:
      lang:           "jbo"
      category:       "selkarni"
    template:         "/selkarni/index.html"
    path:             "/selkarni/:num/"
    paginate:         10
  - query:
      lang:           "en"
      category:       "selkarni"
    template:         "/selkarni/en.html"
    path:             "/selkarni/en/:num/"
    paginate:         10
~~~
