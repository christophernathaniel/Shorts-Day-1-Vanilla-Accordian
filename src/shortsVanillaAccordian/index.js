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

export default shortsVanillaAccordian;
