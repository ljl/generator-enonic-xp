<!DOCTYPE html>
<html lang="en">
<head>
  <title>${pageTitle!"Enonic XP generator"}></title>
  <% if (webpack) { %>
  <script type="text/javascript" src="[@assetUrl path='bundle.js'/]"></script>
  <% } %>
</head>

<body>
  <main data-portal-region=${mainRegion.name}>
    <div>
      <h1>Page: <%= name %></h1>
    </div>

    [#list mainRegion.components]
      [#items as aComponent]
        [@component path=aComponent.path /]
      [/#items]
    [/#list]
  </main>
</body>
</html>
