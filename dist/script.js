function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
const imgs = [
  {
    author: "The Lazy Artist Gallery",
    tag: "People",
    src: "https://www.amazon.com/clouddrive/share/bKM2ommjZlbaxf0Jw8rRRLZdnkJIcnppDC60FKQm9GL",
  },
  {
    author: "Daria Shevtsova",
    tag: "Food",
    src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/2.jpg?raw=true",
  },
  {
    author: "Kasuma",
    tag: "Animals",
    src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/3.jpg?raw=true",
  },
  {
    author: "Dominika Roseclay",
    tag: "Plants",
    src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/4.jpg?raw=true",
  },
  {
    author: "Scott Webb",
    tag: "Plants",
    src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/5.jpg?raw=true",
  },
  {
    author: "Jeffrey Czum",
    tag: "People",
    src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/6.jpg?raw=true",
  },
  {
    author: "Dominika Roseclay",
    tag: "Food",
    src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/7.jpg?raw=true",
  },
  {
    author: "Valeria Boltneva",
    tag: "Animals",
    src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/8.jpg?raw=true",
  },
];

const filters = [
  { name: "People", status: false },
  { name: "Animals", status: false },
  { name: "Plants", status: false },
  { name: "Food", status: false },
];

const Filters = ({ onClickAll, all, onClick, filters } /*#__PURE__*/) =>
  React.createElement(
    "form",
    null /*#__PURE__*/,
    React.createElement(
      "ul",
      null /*#__PURE__*/,
      React.createElement(
        "li",
        { onClick: onClickAll } /*#__PURE__*/,
        React.createElement("input", {
          type: "checkbox",
          checked: all,
        }) /*#__PURE__*/,

        React.createElement("label", { htmlFor: "all" }, "All")
      ),

      filters.map((filter, i /*#__PURE__*/) =>
        React.createElement(
          "li",
          { key: i, "data-index": i, onClick: onClick } /*#__PURE__*/,
          React.createElement("input", {
            id: filter.name,
            type: "checkbox",
            checked: filter.status,
          }) /*#__PURE__*/,

          React.createElement("label", { htmlFor: filter.name }, filter.name)
        )
      )
    )
  );

const Cards = ({ imgs } /*#__PURE__*/) =>
  React.createElement(
    "ul",
    null,
    imgs.map((img, i /*#__PURE__*/) =>
      React.createElement(
        "li",
        { key: i } /*#__PURE__*/,
        React.createElement(
          "figure",
          null /*#__PURE__*/,
          React.createElement("img", {
            src: img.src,
            alt: img.author,
          }) /*#__PURE__*/,
          React.createElement(
            "figcaption",
            null /*#__PURE__*/,
            React.createElement("div", null, img.author, " ") /*#__PURE__*/,
            React.createElement("span", null, img.tag)
          )
        )
      )
    )
  );

class App extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "state", {
      imgs,
      filters,
      all: true,
    });
    _defineProperty(
      this,
      "setFilter",

      (e) => {
        e.preventDefault();
        const { filters, all } = this.state;
        const { index } = e.currentTarget.dataset;

        filters[index].status = !filters[index].status;
        this.setState({
          filters,
        });

        this.updateFilters();
        this.updateImgs();
      }
    );
    _defineProperty(
      this,
      "setAll",

      () => {
        const { filters } = this.state;

        filters.forEach((filter) => {
          filter.status = false;
        });

        this.setState({
          all: true,
          filters,
        });
      }
    );
  }

  updateFilters() {
    const allFiltersTrue = filters.every((filter) => filter.status === true);
    const allFiltersFalse = filters.every((filter) => filter.status === false);

    if (allFiltersTrue || allFiltersFalse) {
      this.setAll();
    } else {
      this.setState({
        all: false,
      });
    }
  }

  updateImgs() {
    const { filters, all } = this.state;
    let newImgs = [];
    let a = 0;

    imgs.forEach((img, imgKey) => {
      filters.forEach((filter, filterKey) => {
        if (img.tag == filter.name && filter.status == true) {
          newImgs[a] = img;
          a++;
        }
      });
    });

    this.setState({
      imgs: newImgs,
    });
  }

  render() {
    const { filters, all } = this.state;
    return /*#__PURE__*/ React.createElement(
      "div",
      null /*#__PURE__*/,
      React.createElement(Filters, {
        onClickAll: this.setAll,
        all: all,
        onClick: this.setFilter,
        filters: filters,
      }),
      all /*#__PURE__*/
        ? React.createElement(Cards, { imgs: imgs }) /*#__PURE__*/
        : React.createElement(Cards, { imgs: this.state.imgs }) /*#__PURE__*/,

      React.createElement(
        "div",
        { className: "photo-source" },
        "All photos are from \xA0" /*#__PURE__*/,

        React.createElement(
          "a",
          { href: "https://www.pexels.com", target: "_blank" },
          "www.pexels.com"
        )
      )
    );
  }
}

ReactDOM.render(
  /*#__PURE__*/ React.createElement(App, null),
  document.getElementById("root")
);
