import "./styles.css";

//* Our toHtml function is a HTML management function
const toHtml = (generatedHtml, options = { render: false }) => {
  // * If array is undefined, define it.
  window.collectHtml = window.collectHtml || [];

  // * Add to the main HTML collection
  window.collectHtml.push(generatedHtml);

  // * Return HTML to page
  const returnHtml = (x) => {
    document.getElementById("app").innerHTML = x;
    window.collectHtml = "";
    return true;
  };

  // Return Function (true) or false if just collecting
  return options.render ? returnHtml(window.collectHtml) : false;
};

// * Our times function creates a loop that'll run x amount of times.
const times = (x) => (f) => {
  if (x > 0) {
    f();
    times(x - 1)(f);
  }
};

// * Render our HTML with 3 times with the toHtml function.
times(3)(() =>
  toHtml(`
<h1>Vanilla Accordian</h1>
<section>
  <ul class="accordian">
    <li>
      <span>Accordian 1
      3 4</span>
      <p>This is the accordian space!</p>
    </li>
    <li>
      <span>Accordian 2</span>
      <p>This is the accordian space!</p>
    </li>
    <li>
      <span>Accordian 3</span>
      <p>This is the accordian space!</p>
    </li>
  </ul>
</section>`)
);

const shortsVanillaAccordian = () => {
  let getNodes = (select) => {
    return document.querySelectorAll(select) || [];
  };

  const handleNodeListener = (node, type) => {
    node.addEventListener(type, (event) => {
      node.classList.add("classAdded");
      return node;
    });
  };

  getNodes(".accordian").forEach((accordian) => {
    handleNodeListener(accordian, "click");
  }, this);
};

// * Initialisation (Check)
if (toHtml(false, { render: true })) {
  shortsVanillaAccordian();
}
