import "./styles.css";

//* Our toHtml function is a HTML management function
const toHtml = (generatedHtml, options = { render: false }) => {
  // * If array is undefined, define it.
  window.collectHtml = window.collectHtml || [];

  // * Add to the main HTML collection
  const generate = generatedHtml ? window.collectHtml.push(generatedHtml) : "";

  // * Return HTML to page
  const returnHtml = (x) => {
    document.getElementById("app").innerHTML = x.join("");
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

toHtml(`<h1>Vanilla Accordian - Day #1</h1>`);

// * Render our HTML with 3 times with the toHtml function.
times(3)(() =>
  toHtml(`
<h2>Vanilla Accordian</h2>
<section>
  <ul class="accordian">
    <li>
      <span>Accordian 1  2 3 123
      3 4</span>
      <p>This is the accordian space!</p>
    </li>
    <li>
      <span>Accordian 2</span>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae auctor justo. Donec ac urna sit amet nisl tempor dictum. Ut maximus est id ligula interdum, et posuere augue facilisis. Praesent ipsum neque, rutrum id felis ut, scelerisque gravida ante. Donec justo mi, consequat eget nibh at, ornare scelerisque justo. In ullamcorper feugiat justo, in fringilla justo tristique eget. Donec a diam accumsan, mattis tellus ac, faucibus quam. Donec a magna lacinia, facilisis leo non, commodo nulla. Sed malesuada vel lectus non elementum. Nam vel fermentum enim. Duis lobortis velit non dignissim ultrices. Pellentesque sagittis quam eget varius placerat. Quisque nec eleifend orci, a ullamcorper justo.</p>
    </li>
    <li>
      <span>Accordian 3</span>
      <div>
        <h3>Subtitle</h3>
        <p>Paragraph</p>
      </div>
    </li>
  </ul>
</section>`)
);

// Accordian JavaScript
const shortsVanillaAccordian = (params) => {
  // Define Params
  const select = params.selector;
  const clickable = select + " li *:first-child";

  // Get the notes.. or not.
  let getNodes = (select) => {
    return document.querySelectorAll(select) || [];
  };

  // Handle Add Event
  const accordianAdditionManagement = async (event) => {
    event.target.classList.add("active");
  };

  // Handle Removal Event
  const accordianRemovalManagement = async () => {
    getNodes(clickable).forEach(async (el) => {
      if (!el.classList.contains("active")) {
        return;
      }
      el.classList.remove("active");
    });
  };

  // * Event Listener Management
  const handleNodeListener = async (node, type, func) => {
    node.addEventListener(
      type,
      (event) => {
        func(event);
      },
      true
    );
  };

  // * Handle Accordian Loops
  getNodes(clickable).forEach(async (accordian) => {
    handleNodeListener(accordian, "click", accordianRemovalManagement);
    handleNodeListener(accordian, "click", accordianAdditionManagement);
  });
};

// * Initialisation (Check)
if (toHtml(false, { render: true })) {
  // * Init Accordian
  shortsVanillaAccordian({ selector: ".accordian" });
}
