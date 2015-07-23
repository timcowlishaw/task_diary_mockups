var ActivityList = function() {
  this._template = $("#item-template").html();
};

ActivityList.prototype = {
  render: function(container) {
    this.loadLogData("data/log.json", function(items) {
      $.each(items, function(i) {
        var item = items[i];
        this.renderItem(container, item);
      }.bind(this));
    }.bind(this));
  },

  loadLogData: function(path, callback) {
    $.getJSON(path, null, function(data) {
      callback(data.log);
    });
  },

  renderItem: function(container, item) {
    var rendered = Mustache.render(this._template, this.serialize(item));
    $(container).append(rendered);
    var element = $(container).children().last();
    element.find("select").change(function() {
      selected = element.find("select option:selected");
      $(container).find(".active .task").html(selected.text());
      $(container).find(".active select").val(selected.prop("value"));
    });
    element.click(function() {
      $(container).find(".selected select").material_select("destroy");
      $(container).find(".selected .caret").remove();
      $(container).children().removeClass("active");
      $(container).children().removeClass("selected");
      element.addClass("active selected");
      element.nextAll().addClass("active");
      element.find('select').material_select();
    }.bind(this));
  },

  serialize: function(item) {
    return {
      icon: this.icon(item),
      title: this.title(item),
      metadata: this.metadata(item),
      tasks: this._tasks
    };
  },

  icon: function(item) {
    return this._iconMapping[item.type];
  },

  _iconMapping: {
    "application": "web",
    "query": "search",
    "page": "subject"
  },

  title: function(item) {
    return item[this._titleMapping[item.type]];
  },

  _titleMapping: {
    "application": "name",
    "query": "term",
    "page": "title"
  },

  metadata: function(item) {
    return item[this._metadataMapping[item.type]];
  },

  _metadataMapping: {
    "application": "file",
    "query": "provider",
    "page": "url",
  },

  _tasks: [
    { id: 0, name: "Life logger server side development" },
    { id: 1, name: "Active learning literature review" }
  ]

};

$(document).ready(function() {
  var al = new ActivityList();
  al.render(document.getElementById("activity-list"));
});

