---
title: Hack the Ship's Internet
subtitle: Adventure of hacking for Internet access on a ship.
---

*December 3, 2015*

I am spending three months to study abroad on a ship. The ship gives
limited Internet access -- we are allowed to use website such as
Wikipedia without limit, while many other websites we cannot access. So
is it possible to **legally** gain unlimited Internet access given the
above situation?

Yes, and here's how it works. On Wikipedia, you are allowed to have your
personal page (in the User namespace), within which you can create and
edit a sub-page that acts as sandboxes. So we set up a local proxy that
transfers local HTTP requests to a Wikipedia sandbox page. A third
server (which should be previously set up, and have unlimited Internet
access) monitors that sandbox page, and replace it with the response
once it finds out that there's a new request. The local proxy then fetch
the response and send back to the real application.

Here we extends WEBrick's existing HTTPProxy server:

~~~ ruby
module Proxywiki
  class HTTPProxyServer < ::WEBrick::HTTPProxyServer
  end
end
~~~

Within which we rewrite the `perform_proxy_request` function. It first
transforms the request into a JSON, and replace a sandbox page. It then
monitors the sandbox page to get the response, and then send the
response back.

~~~ ruby
def perform_proxy_request(req, res, method)
  uri = req.request_uri
  path = uri.path.dup
  path << "?" << uri.query if uri.query
  header = setup_proxy_header(req, res)
  # upstream = FakeProxyURI
  # response = nil

  request_hash = {
    type: "request",
    uri_host: uri.host,
    uri_port: uri.port,
    path: path,
    header: header,
    method: method,
    body: req.body || ""
  }

  Proxywiki::API.edit("User:Sorpaas/Sandbox", JSON.generate(request_hash))

  response = Proxywiki::API.monitor("User:Sorpaas/Sandbox", "response")

  res['proxy-connection'] = "close"
  res['connection'] = "close"

  res.status = response["status"].to_i
  choose_header(response["header"], res)
  set_cookie({'set-cookie' => response["set_cookie"]}, res)
  set_via(res)
  res.body = Base64.decode64(response["body"])

  return res
end
~~~

The server works the same way. It first monitors the sandbox page, and
replace it with the response once it finds a request.

~~~ ruby
request = Proxywiki::API.monitor("User:Sorpaas/Sandbox", "request")
response = nil

http = Net::HTTP.new(request["uri_host"], request["uri_port"], nil, nil)
http.start do
  if request["method"] == "head"
    response = http.head(reqeust["path"], request["header"])
  elsif request["method"] == "post"
    response = http.post(request["path"], request["body"], request["header"])
  else
    response = http.get(request["path"], request["header"])
  end
end

header = {}
choose_header(response, header)

response_hash = {
  type: "response",
  status: response.code.to_i,
  header: header,
  set_cookie: response['set-cookie'],
  body: Base64.encode64(response.body)
}

Proxywiki::API.edit("User:Sorpaas/Sandbox", JSON.generate(response_hash))
~~~
