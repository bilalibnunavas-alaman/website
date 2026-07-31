(function () {
  var brandPattern = /\bAl\s+Aman\b/gi;
  var skipTags = {
    SCRIPT: true,
    STYLE: true,
    NOSCRIPT: true,
    TEXTAREA: true,
    TITLE: true,
    OPTION: true
  };

  function applyBrandFont(root) {
    if (!root) return;

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent || skipTags[parent.tagName] || parent.closest(".al-aman-brand")) {
          return NodeFilter.FILTER_REJECT;
        }

        brandPattern.lastIndex = 0;
        return brandPattern.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    var nodes = [];
    var node;
    while ((node = walker.nextNode())) {
      nodes.push(node);
    }

    nodes.forEach(function (textNode) {
      var text = textNode.nodeValue;
      var fragment = document.createDocumentFragment();
      var lastIndex = 0;
      var match;

      brandPattern.lastIndex = 0;
      while ((match = brandPattern.exec(text))) {
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }

        var span = document.createElement("span");
        span.className = "al-aman-brand";
        span.textContent = match[0];
        fragment.appendChild(span);
        lastIndex = brandPattern.lastIndex;
      }

      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      }

      textNode.parentNode.replaceChild(fragment, textNode);
    });
  }

  function init() {
    applyBrandFont(document.body);

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === Node.TEXT_NODE) {
            applyBrandFont(node.parentElement);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            applyBrandFont(node);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
